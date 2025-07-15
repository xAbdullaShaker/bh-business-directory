const express = require('express')
const router = express.Router()
const Business = require('../models/business')
// everything in this file has /businesses front

// INDEX OF ALL BUSINESSES
router.get('/', async (req, res) => {
    const allBusinesses = await Business.find()
    res.render('businesses/index.ejs', { allBusinesses: allBusinesses })
})

// RENDER NEW BUSINESS FORM
router.get('/new', (req, res) => {
    res.render('businesses/new.ejs')
})

// POST FORM DATA TO DATABASE
router.post('/', async (req, res) => {
    if (req.body.isVerified === 'on') {
        req.body.isVerified = true
    } else {
        req.body.isVerified = false
    }
    console.log(req.body)
    await Business.create(req.body)
    res.redirect('/businesses/')
})

// SHOW ONE BUSINESS
router.get('/:businessId', async (req, res) => {
    const foundBusiness = await Business.findById(req.params.businessId)
    res.render('businesses/show.ejs', { foundBusiness: foundBusiness })
})

router.delete('/:businessId', async (req, res) => {
    await Business.findByIdAndDelete(req.params.businessId)
    res.redirect('/businesses')
})

// GET /businesses/:businessId/edit
router.get('/:businessId/edit', async (req, res) => {
    const foundBusiness = await Business.findById(req.params.businessId)
    res.render('businesses/edit.ejs', {foundBusiness: foundBusiness})
})
// controller function should render 'businesses/edit.ejs' <--- ejs file should have edit form

module.exports = router
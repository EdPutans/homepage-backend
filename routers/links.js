const router = require('express').Router()
let Link = require('../models/Link.model')

router.route('/').get((_req, res) => {
  Link.find()
    .then(links => res.json(links))
    .catch(err => res.status(500).json(err))
})

router.route('/add').post((req, res) =>{
  const {url, name} = req.bod
  const link = new Link({url, name})
  link.save()
    .then(r => res.json(`Added link ${name}`))
    .catch(err => res.status(500).json(err))
})

router.route('/delete/:id').delete((req, res) => {
 Link.findByIdAndDelete(req.params.id)
    .then(r => res.json('link removed'))
    .catch(err => res.status(500).json(err))
})

module.exports = router
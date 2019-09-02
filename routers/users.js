const router = require('express').Router()
let User = require('../models/user.model')

router.route('/register').post((req, res)=>{
  const {password, username} = req.body
  const newUser = new User({username})
  if(password.length >= 8){
    newUser.password = newUser.generateHash(password)
    return newUser.save()
      .then(r=> !console.log('good') && res.json('User saved'))
      .catch(err=> res.status(401).json('error' + err))
  }
    return res.status(500).json('Error creating user')
})

router.route('/login').post((req, res)=>{
  const {username, password} = req.body
  return User.findOne({username}, (err, user) => {
    if(user){
      if(!user.checkPasswordSuccess(password, user.password)){
        return res.status(401).json({error: 'Incorrect password'})
      }else{
        return res.json(user)
      }
    }
   return res.status(400).json({error: 'User not found'})
  })
  .catch(e => console.log(e))
})

router.route('/:id/addLink').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const {url, name} = req.body
      user.links.push({url, name})
      user.save()
      return res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})
router.route('/removeLink/:id/:linkId').post((req,res) => {
  User.findById(req.params.id)
    .then(user => {
      user.links  = user.links.filter(l => l.id !== req.params.linkId)
      user.save()
      return res.json(user)
    })
    .catch(err  => res.status(400).json(err))
})

module.exports = router
const router = require('express').Router()
let User = require('../models/user.model')

router.route('/register').post((req, res)=>{
  const {password, username} = req.body
  const newUser = new User({username})
  if(password.length >= 8){
    newUser.password = newUser.generateHash(password)
    console.log(password, newUser.generateHash(password))
    return newUser.save()
      .then(r=> !console.log('good') && res.json('User saved'))
      .catch(err=> res.status(401).json('error' + err))
  }
    return res.status(500).json('Error creating user - ' + err)
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
  .catch(err => console.log(err))
})

module.exports = router
const express = require('express');
const app     = express();
const bodyParser    = require('body-parser');
const router    =   express.Router();
const mongoose = require('mongoose');
const shortid   =   require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const Appointment   = require('../models/request');
const Event   = require('../models/events');

const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require("../models/user");

getToken = function (headers) {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

//creating a request
router.route('/')

    .post(function(req,res){
        //let testTime = new Date(req.body.startingTime);
       // let testTime = new Date();
        //console.log(testTime.toLocaleTimeString());
        
        let a =new Date(req.body.startTime);
       
        
        //console.log(testTime)
        let b = new Date(req.body.endTime);
        console.log(req.body.startTime)
        console.log(  new Date( a.getTime() + Math.abs(a.getTimezoneOffset()*60000) )  );
    let appoint= new Appointment();    
    appoint.name = req.body.name;
    
    appoint.email = req.body.email;
    appoint.requestId = 'TNL-'+String(new Date().getFullYear()).substr(2,2)+'-'+shortid.generate(),
    appoint.studio = req.body.studio;
    appoint.description = req.body.description;
    appoint.startTime =  new Date( a.getTime() + Math.abs(a.getTimezoneOffset()*60000) );
    appoint.endTime =  new Date( b.getTime() + Math.abs(b.getTimezoneOffset()*60000) ) 
    appoint.timeStamp = Date.now(),
    appoint.isDeleted = false,
    appoint.requestStatus = 'Pending',
    appoint.manager = req.body.manager;
    appoint.team = req.body.team;
    appoint.shootType= req.body.shootType;
    appoint.crew = req.body.crew;
    appoint.assets = req.body.assets;
    
    console.log(appoint);
  
    
        appoint.save(function (err){
            console.log('Trying...')
            if(err){
                res.json(err)
            }
            else{
            res.json({message:'Request Submitted'})
            }
        });
        console.log('Chal!')
       })
    //listing all requested events   
    .get(passport.authenticate('jwt', { session: false}),function(req,res){
        let token = getToken(req.headers);
        if (token){ 
            console.log(req.body)
        Appointment.find({isDeleted: false}, function(err, appoint5){
            if(err){
                res.send(err);
            }
            else {
                res.json(appoint5);
                console.log(appoint5);
            }
            
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

    });

    
router.route('/requestId')
    //deleting a request
    .delete(function(req,res){
        Appointment.find({requestId:req.query.requestId, isDeleted :false},  function(err,appoint2){
        
        appoint2[0].isDeleted= true;
        
        appoint2[0].save(function(err){
        if(err){
            res.json(err)
        }
        else{
            res.json({message:'Request Deleted'})
        }
    })
    });
    })
    //checking status of a request
    .get(function(req,res){
        
        Appointment.find({requestId:req.query.requestId}, function(err, appoint3){
           
            if(err){
                res.send(err)
            }
            
            else if (appoint3[0].isDeleted===false){
                res.json({message:'Your request is:'+ appoint3[0].requestStatus})
               
            }
            else if (appoint3[0].isDeleted === true){
                res.json({message:'Your Request is deleted'})
                
            }
            else{
                res.json({message: 'Your request does not exist'})
            }
         
        })

    })
//listing all the pending requests
router.route('/listing')
    .get(passport.authenticate('jwt', { session: false}),function(req,res){
        let token = getToken(req.headers);
        ////
        if(token){
        Appointment.find({requestStatus : 'Pending', isDeleted : false},'requestId startTime endTime', function(err, appoint5){
            //let requestList = [];
            if(err){
               res.json(err)
           }
            
           else {
                /*appoint5.forEach(function(entry){
                    if(entry.startTime >= Date.now()){
                        requestList.append(entry);
                    }
                })*/ 
            res.json(appoint5);       
           }
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    })
// details of a partiular request for admin page
router.route('/details')
    .get(passport.authenticate('jwt', { session: false}),function(req,res){
        let token = getToken(req.headers);
        if(token){
        Appointment.find({requestId: req.query.requestId}, function(err, details){
            console.log(details);
            res.json(details[0]);
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    })

    
// accept-decline applications
router.route('/confirmation')
    .get(passport.authenticate('jwt', { session: false}),function(req,res){
        let token = getToken(req.headers);
        if(token){
        let action = req.query.action;
        let event = new Event();
        console.log(req.query.requestId);
        console.log(action);
        Appointment.find({requestId: req.query.requestId, requestStatus : 'Pending'}, function(err, details){
            console.log(details);
            if(err){
                res.json(err);
            }
           else if(action === "Accept"){
               event.name= details[0].name;
               event.email = details[0].email;
               event.studio = details[0].studio;
               event.description = details[0].description;
               event.startTime = details[0].startTime;
               event.endTime = details[0].endTime;
               event.timeStamp= details[0].timeStamp;
               event.isDeleted = details[0].isDeleted;
               event.requestId = details[0].requestId;
               event.requestStatus = "Accepted";
               event.manager = details[0].manager;
               event.crew = details[0].crew;
               event.assets = details[0].assets;
               event.shootType = details[0].shootType;
               event.team = details[0].team;


               console.log(event);
            
               event.save(function(err){
                   if(err){
                       res.json(err)
                   }
                   else{
                       res.json({message : 'Your request is approved'})
                   }
               })
               details[0].requestStatus = "Accepted"
               details[0].save(function(err){
                   if(err){
                       res.json(err)
                   }
                   else{
                       console.log('Updated!')
                   }
               });
               
               
            }

            else if ( action === "Decline")
            {
                details[0].requestStatus = "Declined";
                console.log(details);
                details[0].save(function(err){
                    if(err){
                        res.json(err);
                    }
                    else{
                        res.json({message: 'request declined'})
                    }
                })

            }
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }  
    })

//listing all aproved events 
router.route('/approved')
    .get(passport.authenticate('jwt', { session: false}),function(req,res){
        let token = getToken(req.headers);
        if(token){
        Event.find({}, function(err, app_events){
            if(err){
                res.json(err)
            }
            else{
                res.json(app_events);
            }
        })
    }
    else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    })

router.route('/signup')
    .post(function(req,res){
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass email and password.'});
          } else {
            let newUser = new User({
              email: req.body.email,
              password: req.body.password
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'Email already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
          }
    });

router.route('/login')
    .post(function(req,res){
        User.findOne({
            email: req.body.email
          }, function(err, user) {
            if (err) throw err;
        
            if (!user) {
              res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              // check if password matches
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  // if user is found and password is right create a token
                  let token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3000000// 1 week
                  });
                  // return the information including token as JSON
                  res.json({success: true, token: 'JWT ' + token});
                } else {
                  res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              });
            }
          });
    })

router.route('/logout')
    .get( function(req, res) {       
        req.logout();
        res.json({message: 'Logged out'});
    });

    router.route('/app_user')
    .get(function(req,res){
       
        
        Event.find({}, function(err, app_events){
            if(err){
                res.json(err)
            }
            else{
                res.json(app_events);
            }
        })
    
    })
    module.exports = router;
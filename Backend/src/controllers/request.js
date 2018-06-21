const express = require('express');
const app     = express();
const bodyParser    = require('body-parser');
const router    =   express.Router();
const mongoose = require('mongoose');
const shortid   =   require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const Appointment   = require('../models/request');
const Event   = require('../models/events');


//creating a request
router.route('/')

    .post(function(req,res){
        
    let appoint= new Appointment();    
    appoint.name = req.body.name;
    
    appoint.email = req.body.email;
    appoint.requestId = 'TNL-'+String(new Date().getFullYear()).substr(2,2)+'-'+shortid.generate(),
    appoint.studio = req.body.studio;
    appoint.description = req.body.description;
    appoint.startTime = req.body.startTime,
    appoint.endTime = req.body.endTime,
    appoint.timeStamp = Date.now(),
    appoint.isDeleted = false,
    appoint.requestStatus = 'Pending'
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
    .get(function(req,res){
        
        Appointment.find({isDeleted: false}, function(err, appoint5){
            if(err){
                res.send(err);
            }
            else {
                res.json(appoint5);
                console.log(appoint5);
            }
        })

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
    .get(function(req,res){
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
    })
// details of a partiular request for admin page
router.route('/details')
    .get(function(req,res){
        Appointment.find({requestId: req.query.requestId}, function(err, details){
            console.log(details);
            res.json(details[0]);
        })

    })

    
// accept-decline applications
router.route('/confirmation')
    .get(function(req,res){
        let action = req.query.action;
        let event = new Event();
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
               event.requestStatus = "Accepted"
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
        
    })

//listing all aproved events 
router.route('/approved')
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
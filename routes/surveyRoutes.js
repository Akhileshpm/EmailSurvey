import _ from "lodash";
import {URL} from "url";
import {Path} from "path-parser";
import requireLogin from "../middlewares/requireLogin.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";
import express from "express";
import mongoose from "mongoose";
import Mailer from "../services/Mailer.js";
import EventEmitter from "events";
import axios from "axios";
const router = express.Router();
const Survey = mongoose.model('Surveys');

const eventEmitter = new EventEmitter();
// eventEmitter.on('userResponded',async (surveyId, choice)=>{
//     console.log(`User responded to the survey: ${surveyId} with choice of: ${choice}`);
//     // const values = {surveyId,choice};
//     // const res = await axios.post('/survey/endpoint',values);
// })

router.get('/response/:surveyId/:choice', (req, res)=>{
    res.send("thanks for the response");
})

router.get('/surveyCollections', async ( req, res ) => {
 try{   const surveys = await Survey.find({ _user: req.user.id })
        .select({
            recipients: false,
            _user: false,
            __v: false
        })
        res.send(surveys);
    }
    catch(error){
        console.log(error.message)
    }
  
})

router.post("/surveys", async (req, res) => {
    try{
        const { title, subject, recipients, body } =  req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSend: new Date()
        });
        
        const mailer =  new Mailer(survey, surveyTemplate(survey));

        try  {
            await mailer.send();
            await survey.save();
            const user = await req.user.save();
            res.send(user);
        } catch (err)
        {
            console.log(err.message)
            res.status(422).send(err);
        }
}
catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR")
}
})

router.post("/surveys/webhooks", (req,res)=>{
    const p = new Path('/response/:surveyId/:choice');
    const events = _.map(req.body, ({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if(match) {
            console.log({ email, surveyId: match.surveyId, choice: match.choice })
            return { email, surveyId: match.surveyId, choice: match.choice }
        }
    })
        const compactEvents = _.compact(events);
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        const uniqueEvents = _.uniqWith(compactEvents, _.isEqual);
        uniqueEvents.map(({ surveyId, email, choice }) => {
    
            Survey.updateOne(
            {
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false } 
                }
            },
            {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true},
                lastResponded: new Date()
            }
            ).exec()

        })

        //eventEmitter
            eventEmitter.emit('userResponded');

        res.send({"status":"200"});
})

const useServerSentEventsMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    // only if you want anyone to access this endpoint
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    const sendEventStreamData = (data) => {
        const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
        res.write(sseFormattedResponse);
    }

    // we are attaching sendEventStreamData to res, so we can use it later
    Object.assign(res, {
        sendEventStreamData
    });

    next();
}

const streamRandomNumbers = (req, res) => {
    // We are sending anyone who connects to /stream-random-numbers
    // a random number that's encapsulated in an object
    let interval = setInterval(function generateAndSendRandomNumber(){
        const data = {
            value: Math.random(),
        };
        res.sendEventStreamData(data);
    }, 5000);

    //
    eventEmitter.on('userResponded',()=>{
        const data = {
            userResponded: true
        };
        res.sendEventStreamData(data);
    })
    // close
    res.on('close', () => {
        clearInterval(interval);
        console.log("closed")
        res.end();
    });
}

router.get('/endpoint', useServerSentEventsMiddleware, streamRandomNumbers)



export default router;

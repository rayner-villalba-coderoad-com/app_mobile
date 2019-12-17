import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import * as nodemailer from "nodemailer";

const firebase = admin.initializeApp(functions.config().firebase);

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.newEventNotification = functions.firestore
  .document('events/{eventId}')
  .onCreate(async(snap, context) => {
    const eventId = context.params.eventId;
    const data = snap.data() || {};
    const topic = 'ekklesia';
    const eventTitle = data.title;
    const shortDescription = data.description || 'Nuevo Ekklenews';
    const type = data.type;
    const link = data.link;
    const banner = data.banner;
  
    const notification = {
      title: eventTitle,
      body: shortDescription,
      sound:'default'
    }

    const data_parameters = {
      section: 'events',
      section_id: eventId,
      section_type: type,
      section_link: link,
      image: banner
    };

    // Notification content
    const payload = {
      notification: notification,
      data: data_parameters
    }

    // ref to the device collection for the user
    // const db = admin.firestore()
    // const devicesRef = db.collection('devices')

    // get the user's tokens and send notifications
    //const devices = await devicesRef.get()
    
    // const tokens: any = []
    // send a notification to each device token
    // devices.forEach(result => {
    //   const token = result.data().token;
    //   tokens.push( token );
    // })

    //return admin.messaging().sendToDevice(tokens, payload)
    return admin.messaging().sendToTopic(topic, payload);
  });

exports.newTeachingNotification = functions.firestore
  .document('teachings/{teachingId}')
  .onCreate(async(snap, context) => {
    const teachingId = context.params.teachingId;
    const data = snap.data() || {};
    const topic = 'ekklesia';
    const teachingTitle = data.title;
    const description = data.description || 'Nueva prédica disponible';
    const type = data.type;
    const link = data.link;
    const banner = data.banner;
    
    const notification = {
      title: teachingTitle,
      body: description,
      sound:'default'
    }

    const data_parameters = {
      section: 'preachings',
      section_id: teachingId,
      section_type: type,
      section_link: link,
      image: banner
    };

    // Notification content
    const payload = {
      notification: notification,
      data: data_parameters
    }
  
    return admin.messaging().sendToTopic(topic, payload);
  });

exports.deletePhotosEkklenews = functions.firestore
  .document('events/{eventId}')
  .onDelete((snap, context) => {
    const data = snap.data() || {};
    const url = data.banner;
    const bucket = firebase.storage().bucket();

    return bucket.deleteFiles({
      prefix: url
    });
  });

exports.sendPrayingMail = functions.firestore
  .document('prayings/{prayingId}')
  .onCreate(async (snap, context) => {
    const data = snap.data() || {};
    const name = data.name;
    const prayFor = data.prayFor;
    const phone = data.phone;
    const dest = 'plosantos@ekklesia.net'
   
    const body = `<div><em>Hola, mi nombre es:&nbsp;</em> <b>${name}</b></div><br/>
      <div>Tengo la siguiente necesidad de oración:</div><br/>
      <div><i>${prayFor}</i></div><br/>
      <div>Así mismo pueden contactarme al: ${phone}</div><br/>
      <div>Gracias por su atención, </div>
      <div>Dios los bendiga.</div>`;

    const mailOptions = {
      from: '"Ekklesia Bolivia" <noreply@firebase.com>',
      to: dest,
      subject: 'Oramos Por Ti', 
      html: body // html body
    };

    return mailTransport.sendMail(mailOptions).then(() => console.log('email sent!')).catch((error: any) => console.log(error))
  });

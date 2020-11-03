const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const { body, check, validationResult } = require('express-validator');

require('dotenv').config();

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 5288;


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
   res.sendFile('index');
});

app.get('/contacts', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/contacts.html`);
 });


 app.get('/soundkits', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/soundkits.html`);
 });


 app.get('/login', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/login.html`);
 });

 app.get('/signup', (req,res)=>{
  res.send('Sign up page yet to be created')
});

 

 app.post('/client/message/route',(req,res) => {
   

  const firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        subject = req.body.subject,
        message = req.body.message;

    if(checkFirstNameFunctionality() 
    && checkLastNameFunctionality() 
   && checkEmailFunctionality() 
    && checkSubjectFunctionality() 
    && checkMessageFunctionality()){
      let temp = `
      <h3>${req.body.firstName}</h3>
      <h4>${req.body.lastName}</h4>
      <h4>${req.body.email}</h4>
      <h4>${req.body.subject}</h4>
      <p>${req.body.message}</p>
   `;
      
   console.log({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

    main(temp).catch(console.error);
    }
 


      function checkFirstNameFunctionality() {
          if(inputTextisEmpty(firstName, 'firstname')) return;
          if(!justLetters(firstName, 'firstname')) return;
          return true;
      }

      function checkLastNameFunctionality(){
        if(inputTextisEmpty(lastName, 'lastname')) return;
        if(!justLetters(lastName, 'lastname')) return;
        return true;
    }


    function checkEmailFunctionality(){
      if(inputTextisEmpty(email, 'email')) return;
      if(!emailExactPattern(email, 'email')) return;
      return true;
}


    function checkSubjectFunctionality(){
     if(inputTextisEmpty(subject, 'subject')) return;
     if(!justLetters(subject, 'subject')) return;
     return true;
 }


      function checkMessageFunctionality(){
          if(inputTextisEmpty(message, 'message')) return;
          return true;
      }



      function inputTextisEmpty(element, identity){
           if(empty(element)){
              inValid(element, `Please fill your ${identity}`);
              return true;
           }
           else{
             valid(element);
             return false;
           };
      }

      function justLetters(element, identity) {
          var regex = /^[a-zA-Z ]+$/;
          if(regex.test(element.value)){
            valid(element) 
            return true;
          }
          else inValid(element,`${identity} must have only letters.`);
      }

  function emailExactPattern(element, identity){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(regex.test(element)){
       valid(element);
       return true;
     }
     else inValid(element,`Must match ${identity} exact pattern`);
}

      function empty(value) {
          if (value === '') return true;
          return false;
        }

        function inValid(element, message) {
            console.log(message);
            return;
        }

        function valid(element) {
              //return `${element} success`;
        }

        console.log(firstName.parent);
}); 


async function main(temp) {

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, 
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: process.env.HOST, // list of receivers
    subject: "Message from my Portfolio Website", // Subject line
    text: "not text yet", // plain text body
    html: temp, // html body
  });

//  console.log("Message sent: %s", info.messageId);
  console.log('Message sent');
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}





app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request')
// const fetch = require('node-fetch');

const app = express();

// // Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// // Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Signup Route
app.post("/signup",(req,res)=>{
    const {firstName , lastName, email}=req.body;
    

    //Make fields are filled
    if(!firstName || !lastName || !email){
        res.redirect("/fail.html")
        return;
    }

    //construct req data
    const data={
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
                
            }
        ]
    }

const postData = JSON.stringify(data)


    const options = {
        url:'https://us21.api.mailchimp.com/3.0/lists/2c7393af64',
        method:'POST',
        headers:{
            Authorization:'auth c1532ed8f57c6d5c46d6ed649adc0e60-us21'
        },
        body: postData

    }
    request(options, (err,response,body)=>{
        if(err){
            res.redirect('/fail.html');

        }
        else{
            if(response.statusCode===200){
                res.redirect('/success.html')
            }
            else{
                res.redirect('/fail.html')
            }
        }
    })
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
const nodemailer = require('nodemailer');

module.exports = async(email,subject,msg)=>{
    try{
        var mailTransporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER_EMAIL,
                pass:process.env.USER_PASS
            }
        })

        var message = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            text: msg,
     
          };

          mailTransporter.sendMail(message,(err)=>{
            if(err){
                console.log(err);
            }
          })

    }
    catch(e){
        console.log(e);
    }
}
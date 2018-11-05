const nodemailer = require('nodemailer')

const mailInit = (cb) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: String(process.env.EMAIL_ACC),
    pass: String(process.env.EMAIL_PASS)
    }
  })
  cb(transporter)
}


module.exports = {

  sendVerification (targetEmail, username, VerifyToken) {
    mailInit(transporter => {
      const message = {
        from: String(process.env.EMAIL_ACC),
        to: targetEmail,
        subject: "Verify your account of My Todo App",
        text: `Hey ${username}, let's verify your email to use our app`,
        // html: `<p><a href=http://api-todo.agungatidhira.tech/verify.html?${VerifyToken}> Verify your email </a></p>`
        html: `<p><a href=http://localhost:8080/verify.html?${VerifyToken}> Verify your email </a></p>`
      }
    
      transporter.sendMail(message, function (err, info) {
        if(err) {
          console.log(err)
        } else {
          // console.log(info)
        }
      })
    })
  },
  sendWellcomeEmail (targetEmail, username) {
    mailInit(transporter => {
      const message = {
        from: String(process.env.EMAIL_ACC),
        to: targetEmail,
        subject: "Welcome to My Todo App",
        text: `Thank's ${username} for trusting us to manage your activity ;)`
      }
    
      transporter.sendMail(message, function (err, info) {
        if(err) {
        console.log(err)
        } else {
        // console.log(info)
        }
      })
    })
  }
}


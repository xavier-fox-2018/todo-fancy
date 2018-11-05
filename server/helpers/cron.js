const CronJob = require('cron').CronJob;
const User = require('../models/users')
const Todo = require('../models/todos')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

module.exports = { 
    reportDaily: function() {
        // console.log('masuk report daily'); 
        let now = new Date().toISOString()
        Todo.find({
            status: false,
            isGroup: false,
            dueDate: new Date(now.slice(0,10))
        })
        .populate('owner').exec()
        .then((result) => {
            // console.log(result);
            new CronJob('0 7 * * *', function() {
                result.forEach(data => {
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: data.owner.email,
                        from: 'dwiw1909@gmail.com',
                        subject: 'Todo Fancy By Dwi Wicaksono',
                        text: `Good Morning Your Task Today: ${data.title}, keep productive, Have a nice day :)`,
                        html: `<p>Good Morning Your Task Today: ${data.title}, keep productive, Have a nice day :)</p>`,
                        };
                    sgMail.send(msg);
                    console.log('cron daily report active');
                })
                .catch((err) => {
                    console.log(err);
                });
            }, null, true, 'Asia/Jakarta');
        })
    }

}


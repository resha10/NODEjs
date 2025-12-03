const nodemailer = require('nodemailer');


exports.sendEmail = async (msg) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 588,
        secure: false,
        auth: {
            user: "reshanakrani@gmail.com",
             pass: "vkfyicshlazzdpbf",
        },
    })

    const info = await transporter.sendMail(msg)
    console.log("Message sent:", info.messageId);
    return info;
}
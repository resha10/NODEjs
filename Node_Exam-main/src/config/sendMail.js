    const nodemailer = require("nodemailer");

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "reshanakrani@gmail.com",
             pass: "vkfyicshlazzdpbf",             
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendMail = async (to, subject, html) => {
      try {
        await transporter.sendMail({
          from: '"Admin Team" <reshanakrani@gmail.com>',
          to:'reshanakrani@gmail.com', 
          subject,   
          html,      
        });
        console.log(` Email sent to: ${to}`);
      } catch (error) {
        console.error("Error sending email:", error.message);
      }
    };

    module.exports = sendMail;

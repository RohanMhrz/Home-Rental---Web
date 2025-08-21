// import nodemailer from 'nodemailer';

// const sendMail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Home Rentals App" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendMail;

import nodemailer from 'nodemailer';

const sendMail = async (to, subject, html, qrCodeDataURL) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Home Rentals App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'booking-qr-code.png',
        content: qrCodeDataURL.split('base64,')[1], // Extract base64 part only
        encoding: 'base64',
        cid: 'qrCode@booking.com', // Use CID to reference in HTML for inline display
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;

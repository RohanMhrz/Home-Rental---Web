// import nodemailer from 'nodemailer';

// // Function to send OTP
// const sendOTP = async (email, otp) => {
//   try {
//     // Create a transporter using Gmail
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // You can use 'hotmail', 'yahoo', etc.
//       auth: {
//         user: process.env.EMAIL_USER, // Email address from .env
//         pass: process.env.EMAIL_PASS, // App-specific password or email password from .env
//       },
//     });

//     // Email message configuration
//     const mailOptions = {
//       from: `"Home Rentals App" <${process.env.EMAIL_USER}>`, // Sender's email
//       to: email, // Recipient's email
//       subject: 'Your OTP Code', // Subject of the email
//       html: ` 
//         <h3>Hello 👋,</h3>
//         <p>Your OTP code for verification is:</p>
//         <h2 style="color:#4CAF50;">${otp}</h2>
//         <p>This code will expire in 10 minutes.</p>
        
//         <!-- QR Code Image Here -->
//         <div style="margin: 20px 0;">
//           <p>Or scan this QR code:</p>
//           <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${otp}" alt="QR Code" style="width: 150px; height: 150px;" />
//         </div>
        
//         <br/>
//         <small>If you didn't request this, please ignore this email.</small>
//       `, // HTML content of the email (formatted OTP with QR code)
//     };

//     // Send OTP email
//     await transporter.sendMail(mailOptions);
//     console.log('OTP email sent successfully.');
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//     throw new Error('Failed to send OTP');
//   }
// };

// export default sendOTP;


import nodemailer from 'nodemailer';

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${otp}`;

    const mailOptions = {
      from: `"Home Rentals App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP QR Code',
      html: `
        <h3>Hello 👋,</h3>
        <p>Your OTP code is:</p>
        <h2 style="color:#4CAF50;">${otp}</h2>
        <p>Or scan the QR code below to verify your identity:</p>
        <img src="${qrImageUrl}" alt="OTP QR Code" style="width:150px;height:150px;" />
        <br/><br/>
        <small>If you didn't request this, please ignore this email.</small>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email with QR image URL sent successfully.');
  } catch (error) {
    console.error('Error sending QR email:', error.message);
    throw new Error('Failed to send QR code email');
  }
};

export default sendOTP;

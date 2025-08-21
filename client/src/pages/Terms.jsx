import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Terms = () => {
    return (
        <>
        <Navbar />
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Terms and Conditions</h1>
            <p>
                Welcome to HomeRental. By using our services, you agree to the following terms and conditions.
            </p>
            <h2>1. User Agreement</h2>
            <p>
                Users must be at least 18 years old to use our platform. By creating an account, you agree to provide accurate and up-to-date information.
            </p>
            <h2>2. Booking Policies</h2>
            <p>
                All bookings are subject to availability. We reserve the right to cancel a booking if necessary.
            </p>
            <h2>3. Liability</h2>
            <p>
                HomeRental is not responsible for any damages or losses incurred during your stay at any property listed on our platform.
            </p>
            <p>
                For more detailed information, please read our full terms and conditions or contact our support team.
            </p>
        </div>
        <Footer />
        </>
    )
}

export default Terms
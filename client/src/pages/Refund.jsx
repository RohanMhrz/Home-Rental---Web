import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Refund = () => {
    return (
        <>
        <Navbar />
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Refund Policy</h1>
            <p>
                At HomeRental, we strive to provide a satisfactory experience. If you need to cancel your booking, please refer to our refund policy below.
            </p>
            <h2>1. Cancellation Policy</h2>
            <p>
                - Cancellations made at least 30 days before your check-in date will receive a full refund.
                - Cancellations made between 15 to 29 days before check-in will incur a 50% cancellation fee.
                - Cancellations made within 14 days of check-in are non-refundable.
            </p>
            <h2>2. Refund Process</h2>
            <p>
                Refunds will be processed within 7-10 business days after the cancellation is confirmed.
            </p>
            <h2>3. Contact Us</h2>
            <p>
                If you have any questions regarding our refund policy, please contact our support team for assistance.
            </p>
        </div>
        <Footer />
        </>
    )
}

export default Refund
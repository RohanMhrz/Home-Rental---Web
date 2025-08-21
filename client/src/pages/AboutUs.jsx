import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutUs = () => {
    return (
        <>
        <Navbar />
        {/* <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>About Us</h1>
            <p>
                Welcome to MeroNibash, your trusted partner in finding the perfect vacation rental. Our mission is to provide a seamless experience for travelers and property owners alike.
            </p>
            <p>
                At MeroNibash, we believe in the value of community, comfort, and convenience. We offer a wide range of properties, from cozy cabins to luxurious villas, ensuring you find a place that feels like home.
            </p>
            <p>
                Our dedicated team is here to assist you every step of the way, from booking to check-out. Thank you for choosing us!
            </p>
        </div> */}
     <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>About Us</h1>
      <p>
        Welcome to HomeRental, your trusted partner in finding the perfect vacation rental. Our journey began with a simple idea: to create a platform where travelers could discover unique homes and experiences, while property owners could share their beloved spaces with the world. 
      </p>
      <p>
        Imagine stepping into a cozy cabin nestled in the woods, the scent of pine filling the air, or a beachfront villa where the sound of waves lulls you to sleep. At HomeRental, we believe that every stay should be more than just a place to rest— it should be a gateway to unforgettable memories.
      </p>
      <p>
        Our mission is to provide a seamless experience for both travelers and property owners. We carefully curate each listing, ensuring that every property meets our high standards for quality and comfort. Our dedicated team works tirelessly to connect guests with their ideal accommodations, whether it’s a romantic getaway, a family vacation, or a solo adventure.
      </p>
      <p>
        But we’re more than just a booking platform. We’re a community of like-minded individuals who share a passion for exploration and connection. We believe in the power of travel to enrich lives, foster understanding, and create lasting bonds. That’s why we’re committed to providing personalized support every step of the way—from your first inquiry to your check-out.
      </p>
      <p>
        At HomeRental, we invite you to embark on your next adventure with us. Discover a place that feels like home, no matter where your journey takes you. Thank you for choosing HomeRental as your partner in creating unforgettable memories, one stay at a time.
      </p>
      <blockquote style={{
        fontStyle: 'italic',
        color: '#555',
        borderLeft: '4px solid #ccc',
        paddingLeft: '16px',
        margin: '20px 0',
        fontSize: '1.2em',
      }}>
        "Creating unforgettable memories, one stay at a time."
      </blockquote>
    </div>
        <Footer />
        </>
    )
}

export default AboutUs
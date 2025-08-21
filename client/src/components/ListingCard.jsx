import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths = [],
  city = "",
  province = "",
  country = "",
  category = "",
  type = "",
  price = 0,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const creatorId = creator?._id;

  const wishList = user?.wishList || [];
  const isLiked = wishList?.some((item) => item?._id === listingId);

  const handleWishList = async () => {
    if (!userId || !listingId) return;

    if (userId === creatorId) {
      setPopupMessage("You cannot add your own listing to wishlist.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${userId}/${listingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setWishList(data.wishList));
      } else {
        console.error("Wishlist update error:", data.message);
        setPopupMessage("Failed to update wishlist.");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      setPopupMessage("Something went wrong.");
    }
  };

  const handleBooking = async () => {
    if (!user) {
      setPopupMessage("Please log in to book a property.");
      return;
    }

    const bookingData = {
      customerId: userId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    };

    try {
      const availability = await fetch("http://localhost:3001/bookings/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!availability.ok) {
        const error = await availability.json();
        setPopupMessage(error.message || "Booking not available.");
        return;
      }

      const bookingRes = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (bookingRes.ok) {
        setPopupMessage("Booking successful!");
        navigate(`/${userId}/trips`);
      } else {
        setPopupMessage("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setPopupMessage("An error occurred. Please try again later.");
    }
  };

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
  };

  return (
    <div className="listing-card">
      <div className="slider-container" onClick={() => navigate(`/properties/${listingId}`)}>
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths.length > 0 ? (
            listingPhotoPaths.map((photo, index) => (
              <div key={index} className="slide">
                <img
                  src={`http://localhost:3001/${photo  ?.replace("public", "")}`}
                  alt={`photo ${index + 1}`}
                />
                <div className="prev-button" onClick={goToPrevSlide}>
                  <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                </div>
                <div className="next-button" onClick={goToNextSlide}>
                  <ArrowForwardIos sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))
          ) : (
            <div className="slide">
              <img src="/placeholder.jpg" alt="No images available" />
            </div>
          )}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>Rs{price}</span> per night
          </p>
          <button onClick={handleBooking} className="book-button">
            Book Now
          </button>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>Rs{totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          handleWishList();
        }}
        disabled={!user || userId === creatorId}
        title={!user ? "Login to add to wishlist" : userId === creatorId ? "You can't favorite your own listing" : ""}
      >
        <Favorite sx={{ color: isLiked ? "red" : "white" }} />
      </button>

      {popupMessage && (
        <div className="popup-message">
          <span>{popupMessage}</span>
          <button onClick={() => setPopupMessage("")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ListingCard;

//attempted to create a page that displays the user's reservation list
import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id);
  const reservationList = useSelector((state) => state.user?.reservationList || []);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    if (!userId) {
      console.error("User is not logged in.");
      setLoading(false);
      return; // Prevent API call if userId is missing
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/reservations`, {
        method: "GET",
      });

      const data = await response.json();
      
      if (Array.isArray(data)) {
        dispatch(setReservationList(data));
      } else {
        console.error("Invalid reservation list data:", data);
        dispatch(setReservationList([])); // Prevent breaking UI
      }

    } catch (err) {
      console.error("Fetch Reservation List failed!", err.message);
    } finally {
      setLoading(false); // Ensure loading state updates
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList.length > 0 ? (
          reservationList.map((trip) => {
            if (!trip?.listingId || !trip?.hostId) {
              console.error("Invalid reservation data:", trip);
              return null; // Skip invalid entries
            }

            return (
              <ListingCard
                key={trip.listingId._id} // Ensure unique key
                listingId={trip.listingId._id}
                creator={trip.hostId?._id || ""}
                listingPhotoPaths={trip.listingId.listingPhotoPaths || []}
                city={trip.listingId.city || "Unknown"}
                province={trip.listingId.province || ""}
                country={trip.listingId.country || ""}
                category={trip.listingId.category || ""}
                startDate={trip.startDate}
                endDate={trip.endDate}
                totalPrice={trip.totalPrice}
                booking={trip.booking ?? true}
              />
            );
          })
        ) : (
          <p className="no-data">No reservations found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;


// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ReservationList;
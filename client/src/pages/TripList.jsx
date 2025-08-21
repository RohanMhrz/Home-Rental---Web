
// //try code
// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     if (!userId) {
//       console.error("User is not logged in.");
//       setLoading(false);
//       return; // Early return if userId is not valid
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/trips`,
//         { method: "GET" }
//       );

//       const data = await response.json();
//       if (Array.isArray(data)) {
//         dispatch(setTripList(data));
//       } else {
//         console.error("Invalid trip list data received.");
//       }
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   // Function to delete a booking
//   const deleteBooking = async (bookingId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/bookings/${bookingId}`,
//         { method: "DELETE" }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message);

//         // Update Redux state to remove deleted booking
//         dispatch(setTripList(tripList.filter((trip) => trip._id !== bookingId)));
//       } else {
//         console.error("Failed to delete booking");
//       }
//     } catch (err) {
//       console.log("Delete booking failed!", err.message);
//     }
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList?.map((trip) => {
//           const { _id, listingId, hostId, startDate, endDate, totalPrice, booking = true } = trip;

//           // Check for null or undefined before accessing properties
//           if (!listingId || !hostId) {
//             console.error("Invalid trip data: ", trip);
//             return null; // Skip rendering for this trip
//           }

//           return (
//             <div key={_id} className="trip-card">
//               <ListingCard
//                 listingId={listingId._id}
//                 creator={hostId._id}
//                 listingPhotoPaths={listingId.listingPhotoPaths}
//                 city={listingId.city}
//                 province={listingId.province}
//                 country={listingId.country}
//                 category={listingId.category}
//                 startDate={startDate}
//                 endDate={endDate}
//                 totalPrice={totalPrice}
//                 booking={booking}
//               />
//               <button className="delete-btn" onClick={() => deleteBooking(_id)}>
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;



// // import { useEffect, useState } from "react";
// // import "../styles/List.scss";
// // import Loader from "../components/Loader";
// // import Navbar from "../components/Navbar";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setTripList } from "../redux/state";
// // import ListingCard from "../components/ListingCard";
// // import Footer from "../components/Footer";

// // const TripList = () => {
// //   const [loading, setLoading] = useState(true);
// //   const userId = useSelector((state) => state.user._id);
// //   const tripList = useSelector((state) => state.user.tripList);

// //   const dispatch = useDispatch();

// //   const getTripList = async () => {
// //     if (!userId) {
// //       console.error("User is not logged in.");
// //       setLoading(false);
// //       return; // Early return if userId is not valid
// //     }

// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/users/${userId}/trips`,
// //         {
// //           method: "GET",
// //         }
// //       );

// //       const data = await response.json();
// //       if (Array.isArray(data)) {
// //         dispatch(setTripList(data));
// //       } else {
// //         console.error("Invalid trip list data received.");
// //       }
// //       setLoading(false);
// //     } catch (err) {
// //       console.log("Fetch Trip List failed!", err.message);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     getTripList();
// //   }, []);

// //   return loading ? (
// //     <Loader />
// //   ) : (
// //     <>
// //       <Navbar />
// //       <h1 className="title-list">Your Trip List</h1>
// //       <div className="list">
// //         {tripList?.map((trip) => {
// //           const { listingId, hostId, startDate, endDate, totalPrice, booking = true } = trip;

// //           // Check for null or undefined before accessing properties
// //           if (!listingId || !hostId) {
// //             console.error("Invalid trip data: ", trip);
// //             return null; // Skip rendering for this trip
// //           }

// //           return (
// //             <ListingCard
// //               key={listingId._id} // Ensure listingId._id exists
// //               listingId={listingId._id}
// //               creator={hostId._id}
// //               listingPhotoPaths={listingId.listingPhotoPaths}
// //               city={listingId.city}
// //               province={listingId.province}
// //               country={listingId.country}
// //               category={listingId.category}
// //               startDate={startDate}
// //               endDate={endDate}
// //               totalPrice={totalPrice}
// //               booking={booking}
// //             />
// //           );
// //         })}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default TripList;

// // // import { useEffect, useState } from "react";
// // // import "../styles/List.scss";
// // // import Loader from "../components/Loader";
// // // import Navbar from "../components/Navbar";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setTripList } from "../redux/state";
// // // import ListingCard from "../components/ListingCard";
// // // import Footer from "../components/Footer";

// // // const TripList = () => {
// // //   const [loading, setLoading] = useState(true);
// // //   const userId = useSelector((state) => state.user._id);
// // //   const tripList = useSelector((state) => state.user.tripList);

// // //   const dispatch = useDispatch();

// // //   const getTripList = async () => {
// // //     if (!userId) {
// // //       console.error("User is not logged in.");
// // //       setLoading(false);
// // //       return; // Early return if userId is not valid
// // //     }

// // //     try {
// // //       const response = await fetch(
// // //         `http://localhost:3001/users/${userId}/trips`,
// // //         {
// // //           method: "GET",
// // //         }
// // //       );

// // //       const data = await response.json();
// // //       if (Array.isArray(data)) {
// // //         dispatch(setTripList(data));
// // //       } else {
// // //         console.error("Invalid trip list data received.");
// // //       }
// // //       setLoading(false);
// // //     } catch (err) {
// // //       console.log("Fetch Trip List failed!", err.message);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getTripList();
// // //   }, []);

// // //   return loading ? (
// // //     <Loader />
// // //   ) : (
// // //     <>
// // //       <Navbar />
// // //       <h1 className="title-list">Your Trip List</h1>
// // //       <div className="list">
// // //          {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
// // //           <ListingCard
// // //             listingId={listingId._id}
// // //             creator={hostId._id}
// // //             listingPhotoPaths={listingId.listingPhotoPaths}
// // //             city={listingId.city}
// // //             province={listingId.province}
// // //             country={listingId.country}
// // //             category={listingId.category}
// // //             startDate={startDate}
// // //             endDate={endDate}
// // //             totalPrice={totalPrice}
// // //             booking={booking}
// // //           />
// // //         ))} 
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // };

// // // export default TripList;



// // import { useEffect, useState } from "react";
// // import "../styles/List.scss";
// // import Loader from "../components/Loader";
// // import Navbar from "../components/Navbar";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setTripList } from "../redux/state";
// // import ListingCard from "../components/ListingCard";
// // import Footer from "../components/Footer";

// // const TripList = () => {
// //   const [loading, setLoading] = useState(true);
// //   const userId = useSelector((state) => state.user._id);
// //   const tripList = useSelector((state) => state.user.tripList);

// //   const dispatch = useDispatch();

// //   const getTripList = async () => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:3001/users/${userId}/trips`,
// //         {
// //           method: "GET",
// //         }
// //       );

// //       const data = await response.json();
// //       dispatch(setTripList(data));
// //       setLoading(false);
// //     } catch (err) {
// //       console.log("Fetch Trip List failed!", err.message);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       getTripList();
// //     }
// //   }, [userId]);

// //   return loading ? (
// //     <Loader />
// //   ) : (
// //     <>
// //       <Navbar />
// //       <h1 className="title-list">Your Trip List</h1>
// //       <div className="list">
// //         {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
// //           listingId && hostId ? (
// //             <ListingCard
// //               key={listingId._id} // Add key for each card
// //               listingId={listingId._id}
// //               creator={hostId._id}
// //               listingPhotoPaths={listingId.listingPhotoPaths}
// //               city={listingId.city}
// //               province={listingId.province}
// //               country={listingId.country}
// //               category={listingId.category}
// //               startDate={startDate}
// //               endDate={endDate}
// //               totalPrice={totalPrice}
// //               booking={booking}
// //             />
// //           ) : null
// //         ))}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default TripList;




import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    if (!userId) {
      console.error("User is not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
        method: "GET",
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        dispatch(setTripList(data));
      } else {
        console.error("Invalid trip list data received:", data);
      }
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        dispatch(setTripList(tripList.filter((trip) => trip._id !== bookingId)));
      } else {
        console.error("Failed to delete booking");
      }
    } catch (err) {
      console.log("Delete booking failed!", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map((trip) => {
          const {
            _id,
            listingId,
            startDate,
            endDate,
            totalPrice,
          } = trip;

          if (!listingId || !listingId._id || !listingId.creator) {
            console.error("Invalid trip data: ", trip);
            return null;
          }

          return (
            <div key={_id} className="trip-card">
              <ListingCard
                listingId={listingId._id}
                creator={listingId.creator}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={true}
              />
              <button className="delete-btn" onClick={() => deleteBooking(_id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default TripList;

//update version
import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
  const user = useSelector((state) => state.user) || {}; // Ensure user is always an object
  const wishList = user.wishList || []; // Prevents null reference errors

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>

      {wishList.length === 0 ? (
        <p className="empty-wishlist">Your wishlist is empty.</p> // Show message when wishlist is empty
      ) : (
        <div className="list">
          {wishList.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id} // Fix: Added unique key to prevent React warnings
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default WishList;


// import "../styles/List.scss";
// import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const WishList = () => {
//   const wishList = useSelector((state) => state.user.wishList);

//   return (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Wish List</h1>
//       <div className="list">
//         {wishList?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             province,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//               province={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default WishList;
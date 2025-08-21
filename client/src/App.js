import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import VerifyOtpPage from './pages/VerifyOtpPage';

//Admin 
import AdminDashboard from "./components/AdminDashboard"; 
import UserManagement from "./components/UserManagement";
import PropertyApproval from "./components/PropertyApproval";
import BookingManagement from "./components/BookingManagement";
import Analytics from "./components/Analytics";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/login" element={<AdminLoginpage/>} /> */}
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/register/verify-otp" element={<VerifyOtpPage />} />
          {/* Admin routes */}
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/properties" element={<PropertyApproval />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


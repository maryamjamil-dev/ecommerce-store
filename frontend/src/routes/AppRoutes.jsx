import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Categories from "../pages/Categories";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import CategoryProducts from "../pages/CategoryProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Addresses from "../pages/Addresses";
import ForgotPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/Resetpassword ";
import FAQ from "../pages/FAQ";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import SearchResults from "../pages/SearchResults";
import VerifyOTP from "../pages/VerifyOTP";
import NotFound from "../pages/NotFound";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminReviews from "../pages/admin/AdminReviews";
import AdminCoupons from "../pages/admin/AdminCoupons";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminProfile from "../pages/admin/AdminProfile"
import Profile from "../pages/Profile";
import OrderSuccess from "../pages/OrderSuccess";
export default function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/categories" element={<Categories />}/>
    <Route path="/categories/:category" element={<CategoryProducts />}/>
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/product/:id" element={<ProductDetails />}/>
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/wishList" element={<Wishlist />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/verify-otp" element={<VerifyOTP />}/>
    <Route path="/forgotpassword" element={<ForgotPassword />}/>
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/account" element={<Account />}/>
    <Route path="/orders" element={<Orders />}/>
    <Route path="/order-details/:id" element={<OrderDetails />}/>
    <Route path="/addresses" element={<Addresses />}/>
    <Route path="/faq" element={<FAQ />}/>
    <Route path="/shipping-policy" element={<ShippingPolicy />}/>
    <Route path="/return-policy" element={<ReturnPolicy />}/>
    <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
    <Route path="/terms" element={<TermsOfService />}/>
    <Route path="/search" element={<SearchResults />}/>
    <Route path="/profile" element={<Profile/>} />
    <Route path="/order-success" element={<OrderSuccess />} />
    <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />}/>
    <Route path="products" element={<AdminProducts />}/>
    <Route path="categories" element={<AdminCategories />}/>
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers/>}/>
    <Route path="reviews" element={<AdminReviews/>} />
    <Route path="coupons" element={<AdminCoupons/>} />
    <Route path="settings" element={<AdminSettings/>} />
    <Route path="profile" element={<AdminProfile/>} />
    </Route>
    <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

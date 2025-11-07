// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Category from "./Pages/Category";
// import Product from "./Pages/Product";
// import ProductDetails from "./Pages/ProductDetails";
// import Login from "./Components/Login";
// import Register from "./Pages/Register";
// import Homedash from "./Admin/Homedash";
// import Dashboard from "./Admin/Dashboard";
// import Whishlist from "./Pages/Whishlist";
// import Shoppingcart from "./Pages/Shoppingcart";
// import Checkout from "./Pages/Checkout";
// import Myaccount from "./Pages/Myaccount";
// import AccountDetails from "./Pages/AccountDetails";
// import { UserProvider } from './context/UserContext';
// import { WishlistProvider } from '../src/Components/WishlistContext'; 
// import Order from './Pages/Order';
// import OrderDetails from './Pages/OrderDetails';
// import OrderList from './Pages/OrderList';
// import SuperCoins from './Pages/SuperCoins';
// import UpteamistAuth from './Admin/UpteamistAuth';

// function App() {
//   return (
//     <BrowserRouter>
//       <UserProvider>
//         <WishlistProvider>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/category" element={<Category />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/category/:name" element={<Category />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/wishlist" element={<Whishlist />} />
//             <Route path="/cart" element={<Shoppingcart />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/order_details/:orderId" element={<OrderDetails />} />
//             <Route path="/account" element={<Myaccount />} />
//             <Route path="/orders" element={<Order />} />
//             <Route path="/orderslist" element={<OrderList />} />
//             <Route path="/account-details" element={<AccountDetails />} />
//             <Route path="/admin/homedash" element={<Homedash />} />
//             <Route path="/admin/dashboard" element={<Dashboard />} />
//             <Route path="/supercoinzone" element={<SuperCoins />} />
//             <Route path="/admin/login" element={<UpteamistAuth />} />
//             <Route
//   path="/admin/homedash"
//   element={
//     <ProtectedAdminRoute>
//       <Homedash />
//     </ProtectedAdminRoute>
//   }
// />

//           </Routes>
//         </WishlistProvider>
//       </UserProvider>
//     </BrowserRouter>
//   );
// }

// export default App;









import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Components/Login";
import Register from "./Pages/Register";
import Homedash from "./Admin/Homedash";
import Dashboard from "./Admin/Dashboard";
import Whishlist from "./Pages/Whishlist";
import Shoppingcart from "./Pages/Shoppingcart";
import Checkout from "./Pages/Checkout";
import Myaccount from "./Pages/Myaccount";
import AccountDetails from "./Pages/AccountDetails";
import { UserProvider } from './context/UserContext';
import { WishlistProvider } from '../src/Components/WishlistContext';
import Order from './Pages/Order';
import OrderDetails from './Pages/OrderDetails';
import OrderList from './Pages/OrderList';
import SuperCoins from './Pages/SuperCoins';
import UpteamistAuth from './Admin/UpteamistAuth';
import AdminProduct from './Admin/Payment';
import AdminOrder from './Admin/OrderManagementTable';
import TermConditions from './Pages/TermConditions';
import CancellationReturn from './Pages/Cancellation & Return Policy';
import PrivacyPolicy from './Pages/Privacy Policy';
import Shipping from './Pages/Shipping';
import Contact from './Pages/Contact';
import About from './Pages/About';

const ProtectedAdminRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("adminToken");
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <WishlistProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Whishlist />} />
            <Route path="/cart" element={<Shoppingcart />} />
            <Route path="/register" element={<Register />} />
             <Route path="/product-details/:id" element={<ProductDetails />} />
             <Route path="/product/:id" element={<ProductDetails />} />
             <Route path="/product/:id" element={<ProductDetails />} />
             <Route path="admin/product" element={<AdminProduct/>} />
             <Route path="/admin/order" element={<AdminOrder/>} />
            <Route path="/order_details/:orderId" element={<OrderDetails />} />
            <Route path="/account" element={<Myaccount />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/orderslist" element={<OrderList />} />
            <Route path="/account-details" element={<AccountDetails />} />
            <Route path="/supercoinzone" element={<SuperCoins />} />
            <Route path="/term-conditions" element={<TermConditions/>} />
            <Route path="/cancellation-return" element={<CancellationReturn/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/shipping" element={<Shipping/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<UpteamistAuth />} />
            <Route
              path="/admin/homedash"
              element={
                <ProtectedAdminRoute>
                  <Homedash />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <Dashboard />
                </ProtectedAdminRoute>
              }
            />

            {/* Fallback for unmatched routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WishlistProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

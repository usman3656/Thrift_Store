import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ShopPage from "./Pages/shop_page";
import LoginPage from "./Pages/login_page";
import Register from "./Pages/register_page";
import ForgotPassword from "./Pages/forgot_page";
import VerifyPassword from "./Pages/verify_page";
import LandingPage from "./Pages/LandingPage";
import Layout from "./Componenst/shopping/layout";
import AdminLayout  from "./Componenst/admin/AdminLayout";
import Product from "./Pages/Product";
import SellersPage from "./Pages/SellersPage";
import SellerProducts from "./Pages/SellerProducts";
import UpdateProduct from "./Pages/UpdateProduct";
import Cart from "./Componenst/Cart";
import Profile from "./Pages/Profile";
import AddressPage from "./Pages/CheckoutPage";
import OrdersPage from "./Pages/OrdersPage";
import Admin from "./Pages/Admin";
import AdminProducts from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import AdminUsers from "./Pages/AdminUsers";
import AdminShippers from "./Pages/AdminShippers";
import { useState } from "react";

function App() {
  const[search,setSearch]=useState(null);
  const handleSearch = (query) => {
    setSearch(query);
  };
  // console.log(search);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout setSearch={setSearch}/>}>
            <Route index element={<LandingPage search={search}/>}/>
            <Route path='product/:id' element={<Product/>}/>    
            <Route path='cart' element={<Cart/>}/>
            <Route path='checkout' element={<AddressPage/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='order' element={<OrdersPage/>}/>
            <Route path='seller' element={localStorage.getItem('userID')?<SellerProducts/>:<div>Login required</div>}/>
            <Route path='seller/add-product' element={localStorage.getItem('userID')?<SellersPage/>:<div>Login required</div>}/>
            <Route path='seller/update-product/:id' element={<UpdateProduct/>}/>
          </Route>
          <Route path="/admin/" element={localStorage.getItem('role')==='Admin'?<AdminLayout/>:<div className='text-center my-5 fw-bold fs-1'>Unauthorized</div> }>
            <Route index element={<Admin/>}/>
            <Route path='products' element={<AdminProducts/>}/>
            <Route path='orders' element={<AdminOrders/>}/>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='shippers' element={<AdminShippers/>}/>
          </Route>
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/forgot/verify" element={<VerifyPassword />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" exact element={"ERROR 404 not found"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

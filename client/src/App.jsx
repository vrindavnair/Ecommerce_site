import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./user/Dashboard";
import Private from "./Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Profile from "./user/Profile";
import Order from "./user/Order";
import Products from "../components/layout/Products";
import Updateproduct from "./pages/Admin/Updateproduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import AllCategories from "./pages/AllCategories";
import CategoryProducts from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";






function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/privacy" element={<Pagenotfound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          
        
            <Route path="/dashbord" element={< Private/>}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile/>}/>
            <Route path="user/order" element={<Order/>}/>
           
            </Route>

            <Route path="/dashbord" element={<AdminRoute/>}>
              <Route path="admin" element={<AdminDashbord/>}/>
              <Route path="admin/create-category" element={<CreateCategory/>}/>

              <Route path="admin/create-product" element={<CreateProduct/>}/>

              <Route path="admin/products" element={<Products/>}/>
              <Route path="admin/product/:slug" element={<Updateproduct/>}/>
          


              <Route path="admin/users" element={<User/>}/>

            </Route>

            <Route path="/forgotpassword" element={< ForgotPassword/>} />
            <Route path="/search" element={<Search/>}/>
            <Route path="/productDetails/:slug" element={<ProductDetails/>}/>
            <Route path="/allcategories" element={<AllCategories/>}/>
            <Route path="/categories/:slug" element={<CategoryProducts/>}/>

            <Route path="/cart" element={<CartPage/>}/>


            


           
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

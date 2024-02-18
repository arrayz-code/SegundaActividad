import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProtectedRouter from "./components/ProtectedRouter";
import Users from "./pages/Users";


function App() {
   const { user } = useContext(UserContext)
   return (
      <>
         <BrowserRouter>
            <Navbar/>
            <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route element={<ProtectedRouter isAllowed={!!user}/>}>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/product/:productID" element={<Product/>}/>
                  <Route path="/favorites" element={<Favorites/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/users" element={<Users/>}/>
               </Route>
               <Route path="/blog" element={<Blog/>}/>
               <Route path="*" element={<h1>404 Not Found</h1>}/>
            </Routes>
            <Footer/>
         </BrowserRouter>
      </>
   )
}

export default App
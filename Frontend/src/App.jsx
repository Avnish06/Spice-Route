import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { useDetails } from "./context/UserContext.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import Loader from "./components/Loader.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import Search from "./Search.jsx";
import Phonepe from "./phonepe/Phonepe.jsx";

const TrackingProduct = lazy(()=> import("./Pages/TrackingProduct.jsx"))
export const serverUrl = "http://localhost:8000";

// Lazy load all pages
const Home = lazy(() => import("./Pages/Home.jsx"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const EditProfile = lazy(() => import("./Pages/EditProfile.jsx"));
const CreateProduct = lazy(() => import("./Pages/Admin/CreateProduct.jsx"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard.jsx"));
const EditProduct = lazy(() => import("./Pages/Admin/EditProduct.jsx"));
const Products = lazy(() => import("./Pages/Admin/Products.jsx"));
const MappedProduct = lazy(() => import("./MappedProduct.jsx"));
const Profile = lazy(() => import("./Pages/ProfilePage.jsx"));
const ProductCard = lazy(() => import("./Pages/ProductCard.jsx"));
const Cart = lazy(() => import("./Pages/Cart.jsx"));
const CheckoutForm = lazy(() => import("./Pages/Address.jsx"));
const PurchaseSuccess = lazy(() => import("./Pages/PaymentStatus.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const PurchasedProduct = lazy(() => import("./Pages/PurchasedProduct.jsx"));

function App() {
  const { user } = useDetails();




  return (
    <>
      <ToastContainer />
      <Header />

      {/* Suspense Loader for lazy loading */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/editprofile" element={user ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/editproduct/:productId" element={user ? <EditProduct /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/createproduct" element={user.role == "seller" ? <CreateProduct /> : <Navigate to="/" />} />
          <Route path="/products" element={user.role == "seller" ? <Products /> : <Navigate to="/login" />} />
          <Route path="/mappedproduct" element={<MappedProduct />} />
          <Route path="/individualproduct/:productId" element={<ProductCard />} />
          <Route path="/cart/:productId" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/address" element={<CheckoutForm />} />
          <Route path="/paymentsuccess" element={<PurchaseSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/purchasedproduct" element={<PurchasedProduct />} />
          <Route path="/trackingproduct/:orderid" element={<TrackingProduct />} />
           <Route path="/forgetpassword" element={<ForgetPassword />} />
           <Route path="/phonepe" element= {<Phonepe />} />
           <Route path="/search" element={<Search /> }/>
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;

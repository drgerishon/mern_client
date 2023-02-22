import './App.css'
import React, {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import AuthLayout from "./hoc/AuthLayout";
import {useSelector} from "react-redux";
import AuthVerify from "./common/AuthVerify";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import History from "./pages/user/History";

import GeneralPageLayout from "./hoc/GeneralPageLayout";
import Orders from "./pages/user/order/Orders";
import Order from "./pages/user/order/Order";

const CategoryHome = lazy(() => import( "./pages/category/CategoryHome"));
const SubHome = lazy(() => import( "./pages/sub/SubHome"));
const Layout = lazy(() => import("./hoc/Layout"));
const ErrorPage = lazy(() => import("./pages/errorPage/404"));
const ErrorLayout = lazy(() => import("./hoc/ErrorLayout"));
const RegisterComplete = lazy(() => import( './pages/auth/RegisterComplete'));
const Login = lazy(() => import( "./pages/auth/Login"));
const ForgotPassword = lazy(() => import( "./pages/auth/ForgotPassword"));
const PasswordReset = lazy(() => import( "./pages/auth/PasswordReset"));
const Home = lazy(() => import( "./pages/Home"));
const Register = lazy(() => import( "./pages/auth/Register"));
const UserRoute = lazy(() => import( "./components/routes/UserRoute"));
const AdminRoute = lazy(() => import( "./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import( "./pages/admin/AdminDashboard"));
const WishList = lazy(() => import( "./pages/user/WishList"));
const CategoryCreate = lazy(() => import( "./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import( "./pages/admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import( "./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import( "./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import( "./pages/admin/product/ProductCreate"));
const UserProductCreate = lazy(() => import( "./pages/user/product/UserProductCreate"));
const ProductUpdate = lazy(() => import( "./pages/admin/product/ProductUpdate"));
const AllProducts = lazy(() => import( "./pages/admin/product/AllProducts"));
const Market = lazy(() => import( "./pages/Market"));
const Product = lazy(() => import( "./pages/Product"));
const Cart = lazy(() => import( "./pages/Cart"));
const Checkout = lazy(() => import( "./pages/Checkout"));
const CreateCouponPage = lazy(() => import( "./pages/admin/coupon/CreateCouponPage"));
const CouponUpdate = lazy(() => import( "./pages/admin/coupon/CouponUpdate"));
const Payment = lazy(() => import( "./pages/Payment"));
const Success = lazy(() => import( "./pages/user/Success"));
const Error = lazy(() => import( "./pages/user/Error"));
const App = () => {
    const {user: currentUser, isLoggedIn} = useSelector((state) => state.auth);


    return (
        <Suspense fallback={
            <div className='text-center p-5'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Layout/>}>

                    <Route path="user/history" element={
                        <UserRoute>
                            <History/>
                        </UserRoute>
                    }/>

                    <Route path="user/product" element={
                        <UserRoute>
                            <UserProductCreate/>
                        </UserRoute>
                    }/>

                    <Route path="user/wishlist" element={
                        <UserRoute>
                            <WishList/>
                        </UserRoute>
                    }/>
                    <Route path="user/orders" element={
                        <UserRoute>
                            <Orders/>
                        </UserRoute>
                    }/>
                    <Route path="user/order/:id" element={
                        <UserRoute>
                            <Order/>
                        </UserRoute>
                    }/>

                    <Route path="admin/dashboard" element={
                        <AdminRoute>
                            <AdminDashboard/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/category" element={
                        <AdminRoute>
                            <CategoryCreate/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/category/:slug" element={
                        <AdminRoute>
                            <CategoryUpdate/>
                        </AdminRoute>
                    }/> <Route path="admin/coupon/:id" element={
                    <AdminRoute>
                        <CouponUpdate/>
                    </AdminRoute>
                }/>
                    <Route path="admin/sub" element={
                        <AdminRoute>
                            <SubCreate/>
                        </AdminRoute>
                    }/> <Route path="admin/coupon" element={
                    <AdminRoute>
                        <CreateCouponPage/>
                    </AdminRoute>
                }/>
                    <Route path="admin/sub/:slug" element={
                        <AdminRoute>
                            <SubUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/product" element={
                        <AdminRoute>
                            <ProductCreate/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/products" element={
                        <AdminRoute>
                            <AllProducts/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/product/:slug" element={
                        <AdminRoute>
                            <ProductUpdate/>
                        </AdminRoute>
                    }/>

                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="auth/login" element={<Login/>}/>
                    <Route path="auth/register" element={<Register/>}/>
                    <Route path="auth/complete/:slug" element={<RegisterComplete/>}/>
                    <Route path="auth/password/forgot" element={<ForgotPassword/>}/>
                    <Route path="auth/password/reset/:token" element={<PasswordReset/>}/>
                </Route>
                <Route element={<GeneralPageLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/market" element={
                        <Market/>
                    }/>
                    <Route path="/product/:slug" element={
                        <Product/>
                    }/>
                    <Route path="category/:slug" element={
                        <CategoryHome/>
                    }/>
                    <Route path="sub/:slug" element={
                        <SubHome/>
                    }/>
                    <Route path="/cart" element={
                        <Cart/>
                    }/>
                    <Route path="/checkout" element={
                        <Checkout/>
                    }/>

                    <Route path="/payment" element={
                        <UserRoute>
                            <Payment/>
                        </UserRoute>
                    }/>
                    <Route path="user/success/:id" element={
                        <UserRoute>
                            <Success/>
                        </UserRoute>
                    }/>
                    <Route path="user/error" element={
                        <UserRoute>
                            <Error/>
                        </UserRoute>
                    }/>


                    {/* <Route path="/checkout" element={*/}
                    {/*    <UserRoute>*/}
                    {/*         <Checkout/>*/}
                    {/*    </UserRoute>*/}
                    {/*}/>*/}
                </Route>


                <Route element={<ErrorLayout/>}>
                    <Route path='*' element={<ErrorPage noSideBar/>}/>
                </Route>

            </Routes>
            {currentUser !== null && <AuthVerify/>}
        </Suspense>

    );
};

export default App;

// import React from 'react';
// import Mega from "./components/nav/mega/Mega";
//
// const App = () => {
//             return (
//                 <>
//                         <Mega/>
//
//
//                 </>
//             );
//     }
// ;
//
// export default App;
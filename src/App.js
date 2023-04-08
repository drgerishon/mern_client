import './App.css'
import React, {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';

import UserCreate from "./pages/admin/userManagement/UserCreate";

const AuthLayout = lazy(() => import("./hoc/AuthLayout"));
const BuyerDashboard = lazy(() => import("./pages/user/Dashboard"));
const GeneralPageLayout = lazy(() => import("./hoc/GeneralPageLayout"));
const LoadedRoutes = lazy(() => import( "./pages/admin/route/RoutesPage"));
const Orders = lazy(() => import( "./pages/user/order/Orders"));
const Order = lazy(() => import( "./pages/user/order/Order"));
const PermissionPage = lazy(() => import( "./pages/admin/role/PermissionPage"));
const Roles = lazy(() => import( "./pages/admin/role/RolesPage"));
const UserEdit = lazy(() => import( "./pages/admin/userManagement/UserEdit"));
const UserManagement = lazy(() => import( "./pages/admin/userManagement"));
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
const Permissions = lazy(() => import( "./pages/admin/permission/Permissions"));
const App = () => {
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

                    <Route path="user/dashboard" element={
                        <UserRoute>
                            <BuyerDashboard/>
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

                    <Route path="admin/user-management"
                           element={
                               <AdminRoute>
                                   <UserManagement/>
                               </AdminRoute>
                           }
                    />


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
                    }/>
                    <Route path="admin/coupon" element={
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
                    <Route path="admin/user-management/edit/:userId" element={
                        <AdminRoute>
                            <UserEdit/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/roles" element={
                        <AdminRoute>
                            <Roles/>
                        </AdminRoute>
                    }/>
                    <Route path="admin/permissions" element={
                        <AdminRoute>
                            <Permissions/>
                        </AdminRoute>
                    }/>

                    <Route path="/roles/:roleId/permissions"
                           element={
                               <AdminRoute>
                                   <PermissionPage/>
                               </AdminRoute>
                           }

                    />

                    <Route path="user-management/create-user" element={
                        <AdminRoute>
                            <UserCreate/>
                        </AdminRoute>
                    }/>


                    <Route path="admin/custom-routes" element={
                        <AdminRoute>
                            <LoadedRoutes/>
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
        </Suspense>

    );
};

export default App;


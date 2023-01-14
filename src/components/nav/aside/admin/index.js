import React from 'react';

import classes from '../aside.module.css'
import {useSelector} from "react-redux";
import SideLink from "../link/SideLink";


const AdminContent = () => {
    const {user: currentUser} = useSelector((state) => state.auth);


    return (
        <>
            {currentUser && <li className={classes.NavHeading}>{`${currentUser.name}`} </li>}

            <SideLink href='/admin/product' icon='eos-icons:product-classes-outlined' title='Product'/>
            <SideLink href='/admin/products' icon='eos-icons:products-outlined' title='Products'/>
            <SideLink href='/admin/category' icon='icon-park-outline:difference-set' title='Category'/>
            <SideLink href='/admin/sub' icon='icon-park-outline:add-subset' title='Sub category'/>
            <SideLink href='/admin/coupon' icon='icon-park-outline:coupon' title='Coupon'/>
            <SideLink href='/account' icon='fluent-mdl2:account-management' title='Account'/>
        </>
    );
};

export default AdminContent;
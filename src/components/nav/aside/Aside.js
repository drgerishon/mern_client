import React, {useEffect} from 'react';
import classes from './aside.module.css'
import {useSelector} from "react-redux";
import AdminContent from "./admin";
import {useCurrentPath} from "../../../hooks/useCurrentPath";
import {useLocation, useParams} from 'react-router-dom';

const Aside = ({open, handleScroll, scrolled, general}) => {
    const location = useLocation();
    const params = useParams();
    const path = useCurrentPath(location, params);


    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    let attachedClasses = [classes.Sidebar, classes.Top100];

    if (scrolled) {
        attachedClasses = [classes.Sidebar, classes.Top60]
    }

    const userBlogList = [
        {title: 'Write a blog', to: 'crud/blog'},
        {title: 'Update/delete a blog', to: 'crud/blogs'},
    ]

    const excludedRoutes = ['/', '/shop', '/cart', '/market', '/product/:slug', '/checkout', '/payment']

    let toggleClasses = []

    if (open) {
        toggleClasses = [classes.Close]
    }
    if (!open) {
        toggleClasses = [classes.CloseMobile]
    }
    if (general && open) {
        toggleClasses = []
    }
    if (general && !open) {
        toggleClasses = [classes.Close, classes.CloseMobile]
    }


    return (
        <aside className={`${attachedClasses.join(' ')} ${toggleClasses.join(' ')}`}>
            <ul className={classes.SidebarList}>
                {!excludedRoutes.includes(path) && currentUser && <>
                    {currentUser.role === 'admin' && <AdminContent/>}
                </>
                }
            </ul>

        </aside>
    );
};

export default Aside;
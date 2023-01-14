import React, {useEffect} from 'react';
import classes from './aside.module.css'
import {useSelector} from "react-redux";
import Accordion2 from "../../accordion/Accordion";
import AdminContent from "./admin";
import {useCurrentPath} from "../../../hooks/useCurrentPath";
import {useLocation, useParams} from 'react-router-dom';

const Aside = ({open, handleScroll, scrolled}) => {
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

    let avoidAdminLinkPaths = ['/', '/shop', '/cart']


    return (
        <aside className={`${attachedClasses.join(' ')} ${!open ? classes.CloseMobile : classes.Close}`}>
            <ul className={classes.SidebarList}>
                {/*<li className={classes.NavHeading}>Search and Filter</li>*/}
                {/*<Accordion2 title='Categories' accList={userBlogList} eventKey={'0'}/>*/}
                {!avoidAdminLinkPaths.includes(path) && currentUser && <>
                    {currentUser.role === 'admin' && <AdminContent/>}
                </>
                }

            </ul>

        </aside>
    );
};

export default Aside;
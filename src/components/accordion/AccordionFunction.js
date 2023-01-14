import classes from './accordion2.module.css'
import {Link} from "react-router-dom";
import { Icon } from '@iconify/react';

export const accordionFunction = (accList) => {
    return accList.map((acc, i) => {
        return <li className={`${classes.SidebarListItem}  nav-item`} key={i}>
            <Link href={'/'} className={`nav-link ${classes.NavLink} ${classes.NavContent}`}>
                <Icon icon="material-symbols:circle-outline"  className={classes.NavContentIcon} />
                <span>{acc.title}</span>
            </Link>
        </li>
    })
}

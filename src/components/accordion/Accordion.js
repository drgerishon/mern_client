import Accordion from 'react-bootstrap/Accordion'
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import classes from "./accordion2.module.css";
import React from "react";
import useToggle from "../../hooks/useToggle";

import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";

function Accordion2({title, eventKey, icon, accList}) {

    const [showChevron, toggleChevron] = useToggle()
    let chevronClass = [classes.ChevronDown, classes.NavLinkIcon, ' ms-auto']
    if (showChevron) {
        chevronClass.push(classes.Rotate)
    }

    function CustomToggle({children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            toggleChevron(),
        );

        return (
            <div className={`nav-link ${classes.NavLink}`} onClick={decoratedOnClick}>
                {children}
            </div>
        );
    }

    return (
        <Accordion as='li'
                   className={`${classes.SidebarListItem} nav-item`}
                   defaultActiveKey={['0', '1', '2', '3']}
                   alwaysOpen>
            <CustomToggle eventKey={eventKey}>
                <Icon icon="dashicons:category" className={classes.NavLinkIcon}/> <span>{title}</span>
                <Icon icon="bx:chevron-down" className={chevronClass.join(' ')}/>
            </CustomToggle>

            <Accordion.Collapse eventKey={eventKey} as='ul' className={classes.NavContent}>
                <>
                    {accList.map((acc, i) => {
                        return <li className={`${classes.SidebarListItem}  nav-item`} key={i}>
                            <Link href={'/'} className={`${classes.NavContentLink}`}>
                                <Icon icon="material-symbols:circle-outline" className={classes.NavContentIcon}/>
                                <span>{acc.title}</span>
                            </Link>
                        </li>
                    })}
                </>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default Accordion2
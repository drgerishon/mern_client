import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from '@iconify/react';

const NavItem = ({
                     to,
                     iconName,
                     label,
                     cartLength,
                     isSearchBarToggle,
                     hasBadge,
                     onClick,
                 }) => (
    <li className={`nav-item ${isSearchBarToggle ? 'd-block d-lg-none' : ''}`}>
        {isSearchBarToggle ? (
            <div className="nav-link nav-icon" onClick={onClick}>
                <Icon icon="bi:search"/>
            </div>
        ) : (
            <Link to={to} className="nav-link nav-icon" onClick={onClick}>
                <div className="d-flex align-items-center">
                    <div className={` ${hasBadge ? 'badge-class d-flex align-items-center' : ''}`}>
                        <Icon icon={iconName}/>
                        {hasBadge && (
                            <span className="badge bg-primary badge-number">{cartLength}</span>
                        )}
                    </div>
                    <div className="label ps-2 d-none d-md-block ">{label}</div>
                </div>
            </Link>
        )}
    </li>
);

export default NavItem;

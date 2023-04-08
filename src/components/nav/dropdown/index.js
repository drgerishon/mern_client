import React from 'react';
import {Icon} from '@iconify/react';
import './dropdown.css';
import useToggle from '../../../hooks/useToggle';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Dropdown = ({menuItems, icon, title,logOut}) => {
    const [open, toggleClosed] = useToggle();
    const {user: currentUser} = useSelector((state) => state.auth);

    return (
        <li className="nav-item dropdown" onClick={toggleClosed}>
            <div className="nav-link nav-profile d-flex align-items-center pe-0">
                <Icon icon={icon}/>
                <span className="d-none d-md-block dropdown-toggle ps-2">{title}</span>
            </div>
            <ul
                className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${
                    open ? 'dropdown-active' : ''
                }`}
            >
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {(item.condition === undefined ||
                            item.condition === !!currentUser) && (
                            <>
                                <li>
                                    {item.action ? (
                                        <div
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={item.action}
                                        >
                                            <Icon icon={item.icon} className="icon"/>
                                            <span>{item.label}</span>
                                        </div>
                                    ) : (
                                        <Link
                                            className="dropdown-item d-flex align-items-center"
                                            to={item.link}
                                        >
                                            <Icon icon={item.icon} className="icon"/>
                                            <span>{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                                {index !== menuItems.length - 1 && (
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}

            </ul>
        </li>
    );
};

export default Dropdown;

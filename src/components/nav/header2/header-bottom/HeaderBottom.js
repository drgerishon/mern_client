import React from 'react';

const HeaderBottom = () => {
    const menuItems = [{
        imgSrc: '#',
        title: 'Laptops & Mac',
        subMenu: [{
            title: 'Laptop And Mac', items: [{title: 'Networking & Internet Devices'},],
        },
            {
                title: 'Audio & Video',
                items: [
                    {title: 'Headphones & Speakers'},
                    {title: 'Software'},
                ],
            },
            {
                title: 'Banners',
                items: [
                    {
                        title: 'Headphones',
                        imgSrc: '#',
                    },
                    {
                        title: 'TV & Audio',
                        imgSrc: '#',
                    },
                    {
                        title: 'Computers',
                        imgSrc: '#',
                    },
                ],
            },
        ],
    },
        {
            imgSrc: '#',
            title: 'Mobile & Tablet',
            subMenu: [
                {
                    title: 'Laptop And Computer',
                    items: [
                        {title: 'Networking & Internet Devices'},
                        {title: 'Laptops, Desktops & Monitors'},
                        {title: 'Hard Drives & Memory Cards'},
                        {title: 'Printers & Ink'},
                        {title: 'Networking & Internet Devices'},
                        {title: 'Computer Accessories'},
                        {title: 'Software'},
                    ],
                },
                {
                    title: 'Audio & Video',
                    items: [
                        {title: 'Headphones & Speakers'},
                        {title: 'Home Entertainment Systems'},
                        {title: 'MP3 & Media Players'},
                    ],
                },
                {
                    title: 'Banners',
                    items: [
                        {
                            title: 'Headphones',
                            imgSrc: '#',
                        },
                        {
                            title: 'TV & Audio',
                            imgSrc: '#',
                        },
                        {
                            title: 'Computers',
                            imgSrc: '#',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="header-bottom">
            <div className="container">
                <div id="mega-menu">
                    <div className="btn-mega">
                        <span>ALL CATEGORIES</span>
                    </div>
                    <ul className="menu">
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.title}>
                                <a href="#" title="" className="dropdown">
                  <span className="menu-img">
                    <img src={menuItem.imgSrc} alt=""/>
                  </span>
                                    <span className="menu-title">{menuItem.title}</span>
                                </a>
                                <div className="drop-menu">
                                    {menuItem.subMenu.map((subMenu) => (
                                        <div key={subMenu.title} className="one-third">
                                            <div className="cat-title">{subMenu.title}</div>
                                            <ul>
                                                {subMenu.items.map((item) => (
                                                    <li key={item.title}>
                                                        <a href="#" title="">
                                                            {item.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="show">
                                                <a href="#" title="">
                                                    Shop All
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HeaderBottom;

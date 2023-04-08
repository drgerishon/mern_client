import React, {useCallback, useEffect, useState} from 'react';
import './HeroSection.css'
import {getFeaturedProducts} from "../../services/product.service";
import Slider from 'react-slick';
import defaultImage from "../../images/default.jpg";


const menuData = [
    {
        title: 'Supermarket',
        subMenu: [
            {
                title: 'Food Cupboard',
                items: [
                    {title: 'Cooking Ingredients', link: 'https://www.jumia.co.ke/cooking-ingredients/'},
                ],
            },
        ],
    },
    {
        title: 'Home & Office',
        subMenu: [
            {
                title: 'Home Kitchen',
                items: [
                    {title: 'Home Decor', link: 'https://www.jumia.co.ke/home-decor/'},
                    {title: 'Bedding', link: 'https://www.jumia.co.ke/bedding/'},
                    {title: 'Wall Art', link: 'https://www.jumia.co.ke/wall-art/'},
                    {title: 'Bath', link: 'https://www.jumia.co.ke/bath/'},
                    {title: 'Lighting', link: 'https://www.jumia.co.ke/home-lighting/'},
                    {
                        title: 'Storage & Organization',
                        link: 'https://www.jumia.co.ke/home-kitchen-storage-organization/'
                    },
                    {title: 'Kitchen Dining', link: 'https://www.jumia.co.ke/home-kitchen-dining/'},
                    {title: 'Furniture', link: 'https://www.jumia.co.ke/home-kitchen-furniture/'},
                ],
            },
            {
                title: 'OFFICE PRODUCTS',
                items: [
                    {title: 'Office & School Supplies', link: 'https://www.jumia.co.ke/office-school-supplies/'},
                    {title: 'Office Electronics', link: 'https://www.jumia.co.ke/office-electronics/'},
                    {title: 'Office Furniture & Lighting', link: 'https://www.jumia.co.ke/office-furniture-lighting/'},
                    {title: 'Stationery', link: 'https://www.jumia.co.ke/school-supplies-stationery/'},
                ],
            },
        ],
    },
];

const Hero = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const loadFeatured = useCallback(() => {
        getFeaturedProducts()
            .then((r) => {
                setFeaturedProducts(r.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        loadFeatured();
    }, [loadFeatured]);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
    };

    console.log(featuredProducts)

    return (
        <div className='container'>
            <div id="jm">
                <div className="row -pvm">
                    <div className="col16 -df -j-bet -pbs">
                        <div className="flyout-w -fsh0 ">
                            <div className="flyout" role="menu">
                                {menuData.map((menu, index) => (
                                    <React.Fragment key={index}>
                                        <a href="#" className="itm" role="menuitem">
                                            <span className="text">{menu.title}</span>
                                        </a>
                                        <div className="sub" role="menu">
                                            <div className="sub-w">
                                                {menu.subMenu.map((subMenu, idx) => (
                                                    <div className="co" key={idx}>
                                                        <div className="cat">
                                                            <a href="#" className="tit" role="menuitem">
                                                                {subMenu.title}
                                                            </a>
                                                            {subMenu.items.map((item, i) => (
                                                                <a href={item.link} className="s-itm" role="menuitem"
                                                                   key={i}>
                                                                    {item.title}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div id="sl-topblock" className="sldr _img _main -rad4 -oh -fsh0 -mhm">
                            <div className="card -df -fw-w -c-spar -fg1 -phm -h-50p_-m" style={{ backgroundColor: 'blue', height: '300px' }}>
                                <Slider {...settings}>
                                    {featuredProducts && featuredProducts.map((product, index) => (
                                        <div key={index} className="featured-product">
                                            <img
                                                src={product.images && product.images.length ? product.images[0].url : defaultImage}
                                                alt={product.name}/>
                                            <h3>{product.title}</h3>
                                            <p>{`${product.description && product.description.substring(0, 60)}...`}</p>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="-df -c-bet -fw-w -fg1 -m-dn -h-flyout -oh ">
                            <div className="card -df -fw-w -c-spar -fg1 -phm -h-50p_-m"></div>
                            <div className="-fw">
                                <div className="card ar _109-92 -oh  -h-50p_-m"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hero;

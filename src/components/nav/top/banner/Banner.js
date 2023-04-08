import React from 'react';
import Slider from "react-slick";

import './banner.css';

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        swipeToSlide: true
    };

    return (
        <div className="banner">
            <Slider {...settings}>
                <div className="slide">
                    <span>Get 20% off on your first order! Use code: WELCOME20</span>
                </div>
                <div className="slide">
                    <span>Discover our new range of organic seeds!</span>
                </div>
                <div className="slide">
                    <span>Join our community and learn about sustainable farming!</span>
                </div>
                <div className="slide">
                    <span>Join our newsletter for the latest agricultural news and tips!</span>
                </div>
                <div className="slide">
                    <span>Discover our organic products and support local farmers!</span>
                </div>
            </Slider>
        </div>
    );
};

export default Banner;

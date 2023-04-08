import React from 'react';
import Slider from 'react-slick';
import './top.css';

const Top = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        adaptiveHeight: true,
        className: 'slider',
    };
    const slidesData = [
        {text: 'Agricultural Marketplace - Fresh Produce Delivered Daily!'},
        {text: 'Sign up now and get 10% off your first order!'},
        {text: 'Discover local farmers and support sustainable agriculture!'},
        {text: 'Find high-quality organic products at competitive prices!'},
        {text: 'Easy and secure online shopping with fast delivery!'},
        {text: 'Join our community and learn about the latest farming trends and innovations!'},
    ];

    return (
        <section className="topbar">
            <div className="container">
                <Slider {...settings}>
                    {slidesData.map((slide, index) => (
                        <div key={index} className="slide d-flex justify-content-between align-items-center">
                            <div className="text-banner">
                                <p>{slide.text}</p>
                            </div>
                            <button className="cta-button">Learn More</button>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Top;
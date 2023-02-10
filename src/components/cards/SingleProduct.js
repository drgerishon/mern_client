import React, {useState} from 'react';
import {Icon} from "@iconify/react";
import {Link, useNavigate} from "react-router-dom";
import defaultImage from "../../images/default.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import ProductListItems from "./ProductListItems";
import {Rating} from 'react-simple-star-rating'
import RatingModal from "../modal/RatingModal";
import './Single.css'
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {addToCart} from "../../redux/slices/cart";
import Tooltip from "../Tooltip/Tooltip";
import {setVisible} from "../../redux/slices/drawer";
import {addToWishlist} from '../../redux/services/user.service'
import {toast} from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../redux/slices/coupon";


const SingleProduct = ({
                           product,
                           rating,
                           onstarClick,
                           onPointerMove,
                           show,
                           user,
                           handleStarSubmit,
                           handleShow,
                           handleClose
                       }) => {
    const {title, description, _id, images} = product
    const navigate = useNavigate()

    const [tooltip, seTooltip] = useState('Click to add')
    const [showTooltip, setShowTooltip] = useState(false)
    const dispatch = useDispatch()
    const {cart, auth} = useSelector((state) => ({...state}))


    function handleClick() {
        navigate('/cart')

    }

    const Msg = () => (
        <div className='msg'>
            <span>Added to cart </span>
            <button
                onClick={handleClick}
                className='btn btn-outline-light'>Open cart
            </button>
        </div>
    )

    function handleCart() {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            // Check if product is already in the cart
            const productIndex = cart.findIndex(item => item._id === product._id);

            if (productIndex === -1) {
                // Product not found, add it with count 1
                cart.push({...product, count: 1});
            } else {
                // Product found, increment count
                cart[productIndex].count++;
            }

            dispatch(setTotalAfterDiscount(0));
            dispatch(couponApplied(false));
            localStorage.setItem('cart', JSON.stringify(cart));
            seTooltip('Added');
            dispatch(addToCart(cart));
            dispatch(setVisible(true));
            toast(<Msg/>, {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-message',
                hideProgressBar: true,
                closeButton: false
            });
        }


    }

    const handleTooltipShow = () => {
        setTimeout(() => {
            setShowTooltip(true)
        }, 10);
    }
    const handleHideTooltip = () => {
        setShowTooltip(false)
    }

    const handleAddToWishlist = e => {
        e.preventDefault()
        addToWishlist(auth.user.token, product._id).then(r => {
            console.log(r)
            toast.success('Added to wishlist')
            navigate('/user/wishlist')
        }).catch(e => {
            console.log(e)
        })

    };

    return (
        <>
            <div className="col-md-7">
                <div className="card">
                    <div className="slider-container">
                        {images && images.length ?
                            <Carousel showArrows autoPlay infiniteLoop className="carousel-style">
                                {images && images.map(image => {
                                    return <div className="slider-item-div" key={image.public_id}>
                                        <img src={image.url} alt={title} className='img-fluid'/>
                                    </div>
                                })}
                            </Carousel> :

                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src={defaultImage}
                                     className="img-fluid"
                                     alt={title}/>

                            </div>
                        }
                    </div>

                    {/*<ul className="nav nav-tabs">*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link active" aria-current="page" href="#">{description && description}</a>*/}
                    {/*    </li>*/}

                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link disabled">Disabled</a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            </div>
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h5>{title}</h5>
                    </div>

                    <div className="card-body">

                        <ProductListItems product={product}/>
                    </div>

                    <div className="card-footer ">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <Tooltip show={showTooltip} text={tooltip}>
                                    <button disabled={product.quantity < 1}
                                            className='btn btn-secondary btn-sm'
                                            onClick={handleCart}
                                            onMouseEnter={handleTooltipShow}
                                            onMouseLeave={handleHideTooltip}>
                                        <Icon
                                            icon="ant-design:shopping-cart-outlined"
                                            className='text-danger'
                                            fontSize={25}
                                            cursor='pointer'
                                        />
                                        <span className='mx-1'>
                                     {product.quantity <= 0 ? 'Out of stock' : 'Add to cart'}
                                </span>
                                    </button>
                                </Tooltip>
                            </div>

                            <div>
                                <button className='btn btn-dark btn-sm' onClick={handleAddToWishlist}>
                                    <Icon
                                        icon="ant-design:heart-outlined"
                                        className=' card-link'
                                        fontSize={20}
                                        cursor='pointer'
                                    />
                                    <span className='mx-1'>
                                Add to wishlist
                                </span>
                                </button>
                            </div>


                            <div>

                                <RatingModal
                                    handleStarSubmit={handleStarSubmit}
                                    user={user}
                                    modalTitle={`Rate ${title}`}
                                    handleShow={handleShow}
                                    show={show}
                                    handleClose={handleClose}>

                                    <Rating
                                        initialValue={rating}
                                        showTooltip
                                        tooltipArray={[
                                            'Terrible',
                                            'Bad',
                                            'Average',
                                            'Great',
                                            'Prefect'
                                        ]}
                                        transition
                                        fillColorArray={[
                                            '#f14f45',
                                            '#f16c45',
                                            '#f18845',
                                            '#f1b345',
                                            '#f1d045'
                                        ]}


                                        onClick={onstarClick}

                                    />

                                    {/*<StarRatings*/}
                                    {/*    rating={rating}*/}
                                    {/*    starRatedColor="blue"*/}
                                    {/*    changeRating={onstarClick}*/}
                                    {/*    numberOfStars={5}*/}
                                    {/*    name={_id}*/}
                                    {/*/>*/}
                                </RatingModal>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default SingleProduct;
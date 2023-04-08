import React, {useState} from 'react';
import defaultImage from '../../images/default.jpg'
import './ProductCard.css'
import {showAverageRating} from "../../common/rating/rating";
import {Link, useNavigate} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import Tooltip from "../Tooltip/Tooltip";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/slices/cart";
import {setVisible} from "../../redux/slices/drawer";
import {toast} from "react-toastify";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../redux/slices/coupon";
import {getCartFromLocalStorage} from "../../common/cart/getCartFronLocalStorage";
import PropTypes from 'prop-types';

import {Icon} from '@iconify/react';


const ProductCard = ({
                         product,
                         singleBtn,
                         btn1Clicked,
                         btn2Clicked,
                         btnCaption1,
                         btnCaption2,
                     }) => {


    const {description, images, slug, price, title, category, rating, quantity} = product;

    const [tooltip, seTooltip] = useState('Click to add')
    const [showTooltip, setShowTooltip] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleTooltipShow = () => {
        setTimeout(() => {
            setShowTooltip(true)
        }, 10);
    }
    const handleHideTooltip = () => {
        setShowTooltip(false)
    }

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
        let cart = getCartFromLocalStorage();
        console.log('clicked')
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

    const CardImage = ({product}) => (
        <img
            className='img-fluid'
            src={product.images && product.images.length ? product.images[0].url : defaultImage}
            alt={product.title}
        />
    );

    const CardCategory = ({category}) => (
        <span className="product-catagory">{category ? category.name : 'Uncategorized'}</span>
    );

    const CardTitle = ({title}) => (
        <span><a href="">{title}</a></span>
    );
    const Rating = ({product}) => (
        <span className='product-rating'> {showAverageRating(product)}</span>
    );

    const CardDescription = ({description}) => (
        <p>{`${description && description.substring(0, 60)}...`}</p>
    );

    const CardPrice = ({price}) => (
        <div className="product-price"><small>$96.00</small>${price}</div>
    );

    function handleHeartClick() {

    }

    const CardLinks = () => (
        <div className="product-links">
            <span onClick={handleHeartClick} className="icon-link">
                <Icon icon="mdi:cards-heart-outline"/>
            </span>
            <span onClick={handleCart} className="icon-link">
                <Icon icon="ic:round-add-shopping-cart"/>
            </span>
        </div>
    );


    return (

        <div className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
                <Link to={`/product/${slug}`}>
                    <CardImage product={product}/>
                </Link>
            </div>
            <div className="product-details">
                <Link to={`/category/${category.slug}`}>
                    <CardCategory category={product.category}/>
                </Link>
                <Link to={`/product/${slug}`}>
                    <div className='d-flex align-items-center justify-content-between title '>
                        <CardTitle title={product.title}/>
                        <Rating product={product}/>
                    </div>
                    <CardDescription description={product.description}/>

                </Link>
                <div className="product-bottom-details">
                    <CardPrice price={product.price}/>
                    <CardLinks/>
                </div>
            </div>
        </div>


    );
};
ProductCard.propTypes = {
    product: PropTypes.shape({
        description: PropTypes.string,
        images: PropTypes.array,
        slug: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string,
        }),
        rating: PropTypes.array,
        quantity: PropTypes.number,
    }).isRequired,
    singleBtn: PropTypes.bool,
    btn1Clicked: PropTypes.func,
    btn2Clicked: PropTypes.func,
    btnCaption1: PropTypes.string,
    btnCaption2: PropTypes.string,
};
ProductCard.defaultProps = {
    singleBtn: false,
    btn1Clicked: () => {
    },
    btn2Clicked: () => {
    },
    btnCaption1: '',
    btnCaption2: '',
};

export default ProductCard;
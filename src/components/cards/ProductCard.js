import React, {useState} from 'react';
import defaultImage from '../../images/default.jpg'
import './ProductCard.css'
import {showAverageRating} from "../../common/rating/rating";
import {Link, useNavigate} from "react-router-dom";
import {MDBBtn} from "mdb-react-ui-kit";
import _ from 'lodash'
import Tooltip from "../Tooltip/Tooltip";
import {useSelector, useDispatch} from "react-redux";
import {addToCart} from "../../redux/slices/cart";
import {setVisible} from "../../redux/slices/drawer";
import {toast} from "react-toastify";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../redux/slices/coupon";

const ProductCard = ({
                         product,
                         market,
                         variant1,
                         btn1Clicked,
                         btn2Clicked,
                         variant2,
                         btnCaption1,
                         btnCaption2,
                     }) => {

    const {description, images, slug, price, title} = product
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

    function showCard() {
        return <div className="card product-card p-2">
            <Link to={`/product/${slug}`}>
                <div className="img-wrap">
                    <img
                        className='img-fluid'
                        src={product.images && product.images.length ? product.images[0].url : defaultImage}
                        alt={product.title}/>
                </div>

                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='d-flex flex-column'>
                            <span className="title">{product.title} </span>
                            <span className="rated">{product.category ? product.category.name : 'Uncategorized'} </span>
                        </div>
                        <div>
                            <div className="d-flex flex-column align-items-end">
                                {showAverageRating(product)}
                                <span className="rated">Rated {product.rating.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-wrap-payment">
                    <div className="info-wrap">
                        <p className="card-text">{`${description && description.substring(0, 60)}...`}</p>
                        <span className="title "><strong>KSh {product.price}</strong></span>
                    </div>
                </div>
            </Link>
            <div className="card-footer pb-0">
                <div className="d-flex justify-content-between">
                    {!market && btnCaption1 &&
                    <MDBBtn className={`btn btn-${variant1} `} onClick={btn1Clicked}>{btnCaption1}</MDBBtn>
                    }
                    {!market && btnCaption2 &&
                    <MDBBtn
                        className={`btn btn-${variant2}`}
                        onClick={btn2Clicked}> {btnCaption2}
                    </MDBBtn>
                    }

                    {market &&
                    <Tooltip show={showTooltip} text={tooltip}>
                        <button
                            onMouseEnter={handleTooltipShow}
                            onMouseLeave={handleHideTooltip}
                            disabled={product.quantity < 1}
                            className={product.quantity <= 0 ? 'btn btn-block btn-secondary  disabledBtn  ' : 'btn btn-primary btn-block'}
                            onClick={handleCart}> {product.quantity <= 0 ? 'Out of stock' : 'Add to cart'}
                        </button>
                    </Tooltip>
                    }
                </div>
            </div>

        </div>


    }

    return (

        <>
            {showCard()}

        </>


    );
};

export default ProductCard;
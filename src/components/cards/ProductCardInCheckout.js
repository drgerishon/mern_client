import React from 'react';
import ModalImage from "react-modal-image";
import defaultImage from '../../images/default.jpg'
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../redux/slices/cart";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import './ProductcardInCheckout.css'
import {emptyUserCart} from "../../services/user.service";
import {useNavigate} from "react-router-dom";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../redux/slices/coupon";

const ProductCardInCheckout = ({product}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => ({...state}));
    const navigate = useNavigate()

    function handleSelect(e) {

        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((p, index) => {
                if (p._id === product._id) {
                    cart[index].color = e.target.value
                }
            })
            dispatch(setTotalAfterDiscount(0))
            dispatch(couponApplied(false))
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(addToCart(cart))
        }

    }

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value
        if (count > product.quantity) {
            toast.error(`You can not buy more than available quantity. ${product.quantity} remaining`)
            return
        }

        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((p, index) => {
                if (p._id === product._id) {
                    cart[index].count = count
                }
            })
            dispatch(setTotalAfterDiscount(0))
            dispatch(couponApplied(false))
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(addToCart(cart))
        }

    };


    function handleClick() {
        navigate('/cart')


    }


    function handleRemove() {
        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((p, index) => {
                if (p._id === product._id) {
                    cart.splice(index, 1)
                }
            })
            dispatch(setTotalAfterDiscount(0))
            dispatch(couponApplied(false))
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch(addToCart(cart))
            emptyUserCart(auth.user.token).then(r => {
                toast.success('Cart emptied',
                    {position: toast.POSITION.BOTTOM_CENTER,})

            })
        }

    }

    return (
        <tr className='items '>
            <td className='text-center'>
                <div style={{width: '80px', height: 'auto'}}>
                    {product && product.images && product.images.length ? <ModalImage
                        small={product.images[0].url}
                        large={product.images[0].url}
                        alt={product.name}
                    /> : <ModalImage
                        small={defaultImage}
                        large={defaultImage}
                        alt={product.name}
                    />}
                </div>
            </td>
            <td>{product.title}</td>
            <td>{product.price}</td>

            <td className=''>
                <input
                    type="number"
                    className="px-2"
                    value={product.count}
                    onChange={handleQuantityChange}/>

            </td>
            <td className='text-center'>
                {product.shipping === 'Yes' ?
                    <Icon icon="ic:baseline-check-circle-outline" className='text-success ' fontSize={20}/> :
                    <Icon icon="eva:close-circle-outline" className='text-danger' fontSize={20}/>}</td>
            <td className='text-center'>

                <Icon
                    icon="tabler:trash-x"
                    className='text-danger pointer'
                    onClick={handleRemove} fontSize={20}/>
            </td>

        </tr>
    );
};

export default ProductCardInCheckout;
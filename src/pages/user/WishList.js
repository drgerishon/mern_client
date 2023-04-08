import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {getWishList, removeWishList} from "../../services/user.service";
import {Icon} from '@iconify/react';

const WishList = () => {
    const {token} = useSelector(state => (state.auth.user))
    const [wishlist, setWishlist] = useState([])


    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () => {
        getWishList(token).then(r => {
            setWishlist(r.data.wishlist);
            console.log(r.data)
        }).catch(e => {
            console.log(e)
        })


    }
    const handleRemove = (productId) => {
        removeWishList(productId, token).then(r => {

            toast.success('Removed')
            loadWishlist()

        }).catch(e => {
            console.log(e)
        })


    }


    return (
        <div className={'container-fluid'}>
            <div className="row">

                <div className="col-md-10">
                    <h4>Wishlist</h4>
                    {wishlist.map(p => (
                        <div key={p._id} className='alert alert-secondary'>
                            <Link to={`/product/${p.slug}`}>
                                {p.title}
                            </Link>
                            <span className='btn btn-sm float-end'
                                  onClick={() => handleRemove(p._id)}><Icon icon="ant-design:delete-outlined"/></span>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default WishList;
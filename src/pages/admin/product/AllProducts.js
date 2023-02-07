import React, {useEffect, useState} from 'react';
import {getProductsByCount, removeProduct} from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => state.auth);


    useEffect(() => {
        loadAllProductsByCount()

    }, [])


    function loadAllProductsByCount() {
        setLoading(true)
        getProductsByCount(100)
            .then(r => {
                setProducts(r.data)
                setLoading(false)
                console.log(r)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
    }

    function handleRemove(slug) {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setLoading(true)
            removeProduct(slug, user.token)
                .then(r => {
                    setLoading(false)
                    loadAllProductsByCount()
                    toast.success(`${r.data.title} is deleted`)

                })
                .catch(e => {
                    if (e.response.status === 400) {
                        toast.error(e.response.data)
                    }
                    setLoading(false)
                })

        }

    }


    return (
        <div className={'container-fluid'}>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>

                <div className="col-md-10">
                    <div className="row">
                        {loading ? <p>loading...</p> : <h2>Products</h2>}
                        {products.map(product => <div
                                className='col-lg-4 col-md-6 mb-3'
                                key={product._id}>
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemove}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllProducts;
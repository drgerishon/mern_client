import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';

import ProductCard from "../cards/ProductCard";
import {toast} from "react-toastify";
import {getProducts, getProductsCount} from "../../redux/services/product.service";

const Pagination = lazy(() => import("antd").then(module => ({default: module.Pagination})));

const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [productsCount, setProductsCount] = useState(0)

    const loadAllProducts = useCallback(() => {
            setLoading(true)
            getProducts('createdAt', 'desc', page)
                .then(r => {
                    setProducts(r.data)
                    setLoading(false)

                })
                .catch(e => {
                    setLoading(false)
                    console.log(e)
                })
        },
        [page]
    )


    useEffect(() => {
        loadAllProducts()
    }, [loadAllProducts, page])

    useEffect(() => {
        getProductsCount().then(r => {
            setProductsCount(r.data)
        }).catch(e => {
            console.log(e.response)
            toast.error(e.response.data.error)
            setLoading(false)
        })

    }, [])


    return (
        <div className={'container'}>
            <div className="row">
                {products.map(product => <div
                        className='col-lg-4 col-md-6 mb-3'
                        key={product._id}>
                        <ProductCard
                            product={product}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
            <div className="text-center mt-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Pagination
                        current={page}
                        total={(Math.ceil(productsCount / 3) * 10)}
                        onChange={(value) => {
                            setPage(value)
                        }}/>
                </Suspense>

            </div>


        </div>
    );
};

export default NewArrivals;
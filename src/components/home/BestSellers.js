import React, {lazy, useCallback, useEffect, useState} from 'react';

import ProductCard from "../cards/ProductCard";
import {toast} from "react-toastify";
import {getProducts, getProductsCount} from "../../redux/services/product.service";
import * as PropTypes from "prop-types";

const Pagination = lazy(() => import("antd").then(module => ({default: module.Pagination})));

function Suspense(props) {
    return null;
}

Suspense.propTypes = {
    fallback: PropTypes.element,
    children: PropTypes.node
};
const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [productsCount, setProductsCount] = useState(0)
    const loadAllProducts = useCallback(() => {
        setLoading(true)
        getProducts('sold', 'desc', page)
            .then(r => {
                setProducts(r.data)
                setLoading(false)

            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
    }, [page])

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
            <div className="row">
                <div className="  text-center pt-2 p-2">
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


        </div>
    );
};

export default BestSellers;
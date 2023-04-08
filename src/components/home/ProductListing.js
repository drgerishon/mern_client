import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import ProductCard from "../cards/ProductCard";
import {toast} from "react-toastify";
import {getProducts, getProductsCount} from "../../services/product.service";
import Jumbotron from "../cards/Jumbotron";

const Pagination = lazy(() => import("antd").then(module => ({default: module.Pagination})));

const ProductListing = ({sectionClass = '', sortField, jumbotronTexts}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);

    const loadAllProducts = useCallback(() => {
        setLoading(true);
        getProducts(sortField, 'desc', page)
            .then(r => {
                setProducts(r.data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
            });
    }, [page, sortField]);

    useEffect(() => {
        loadAllProducts();
    }, [loadAllProducts, page]);

    useEffect(() => {
        getProductsCount().then(r => {
            setProductsCount(r.data);
        }).catch(e => {
            console.log(e.response);
            toast.error(e.response.data.error);
            setLoading(false);
        });
    }, []);

    return (
        <section className={sectionClass}>
            <div className={'container'}>
                <div className="card agri-card">
                    <div className="card-header">
                        <div className='h5'>
                            <Jumbotron text={jumbotronTexts}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row  ">
                            {products.map(product => (
                                <div className='col-lg-3 col-md-6  mb-3' key={product._id}>
                                    <ProductCard product={product} loading={loading} singleBtn/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-center ">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Pagination
                                    current={page}
                                    total={Math.ceil(productsCount / 4) * 10}
                                    onChange={(value) => {
                                        setPage(value);
                                    }}/>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ProductListing.propTypes = {
    sectionClass: PropTypes.string,
    sortField: PropTypes.string.isRequired,
    jumbotronTexts: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProductListing

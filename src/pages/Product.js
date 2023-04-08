import React, {useEffect, useState} from 'react';
import {getProduct, listRelated, productStar} from "../services/product.service";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const Product = () => {
    const [product, setProduct] = useState([])
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(false)
    const [star, setStar] = useState(0)
    const [show, setShow] = useState(false);
    const {user} = useSelector((state) => state.auth);
    let {slug} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadSingleProduct()

    }, [slug])

    useEffect(() => {
        checkExistingRating()
    }, [product.rating])

    function checkExistingRating() {
        if (user) {
            if (product && product.rating && product.rating.length > 0 && user) {
                let existingRatingObject = product.rating.find(ele => (ele.postedBy.toString() === user._id.toString()))

                if (existingRatingObject !== undefined) {
                    setStar(existingRatingObject.star)
                }

            }
        }

    }

    const onPointerMove = (value, index) => alert(value, index)
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')


    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (user && user.token) {
            setShow(true)
        } else {
            navigate('/login', {state: {from: `/product/${slug}`}});
        }
    }

    const loadSingleProduct = () => {
        setLoading(true)
        getProduct(slug).then(response => {
            setProduct(response.data)
            //load related
            listRelated(response.data._id).then(r => setRelated(r.data))
            setLoading(false)

        }).catch(e => {
            console.log(e.response)
            toast.error('Error')
            setLoading(false)
        })

    }

    function handleStarSubmit() {
        productStar(product._id, star, user.token).then(r => {
            console.log(r.data.rating)
            loadSingleProduct()

        }).catch(err => {
            console.log(err)
        })

        toast.success(`Thank you for rating our product`)
        setShow(false)


    }

    function onStarClick(val) {
        setStar(val)


    }

    return (
        <div className='container'>
            <div className="row pt-4 border mb-3">
                <SingleProduct
                    product={product}
                    rating={star}
                    onstarClick={onStarClick}
                    handleStarSubmit={handleStarSubmit}
                    handleClose={handleClose}
                    show={show}
                    onPointerMove={onPointerMove}
                    handleShow={handleShow}
                    user={user}/>
            </div>

            <div className="row border mb-3">
                <Tabs
                    defaultActiveKey="description"
                    id="justify-tab-example"
                    className="mb-3"

                >
                    <Tab eventKey="description" title="Product description">
                        <div className="card py-4">
                            <div className="card-body">
                                <div className="card-text">
                                    {product.description}
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="related" title="Related products">
                        <div className="card py-4">
                            <div className="card-body">
                                <div className="card-title">
                                    <h2>Related products</h2>
                                </div>

                                <div className="row">
                                    {related.map(p => {
                                        return <div key={p._id} className='col-lg-4 col-md-6 mb-3'>
                                            <ProductCard
                                                product={p}
                                                loading={loading}
                                            />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>

                    </Tab>
                    <Tab eventKey="shipping" title="Shipping information">

                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    <h4>Shipping information</h4>
                                </div>
                            </div>
                        </div>

                    </Tab>

                </Tabs>

            </div>

            <div className="row border mb-3">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <h4>Customer feedback and ratings</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row border mb-3">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <h4>Wishlist if authenticated</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row border">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            <h4>Recently viewed</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Product;
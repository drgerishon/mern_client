import React from 'react';
import defaultImage from '../../../images/default.jpg'
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";

import './Admin.css'
import {showAverageRating} from "../../../common/rating/rating";

const AdminProductCard = ({product, handleRemove}) => {
    console.log(product)


    function showCard() {
        return <figure className="card card-product-grid card-lg">
            <a href="#" className="img-wrap">
                <img
                    className='img-fluid'
                    src={product.images && product.images.length ? product.images[0].url : defaultImage}
                    alt={product.title}/>
            </a>

            <figcaption className="info-wrap">
                <div className="d-flex justify-content-between align-items-center">
                    <div className='d-flex flex-column'>
                        <span className="title">{product.title} </span>
                        <span className="rated">{product.category.name} </span></div>
                    <div>
                        <div className="d-flex flex-column align-items-end">
                            {showAverageRating(product)}
                            <span className="rated">Rated {product.rating.length}</span>
                        </div>
                    </div>
                </div>
            </figcaption>
            <div className="bottom-wrap-payment">
                <figcaption className="info-wrap">
                    <span className="title "><strong>KSh {product.price}</strong></span>
                </figcaption>
            </div>
            <div className="bottom-wrap d-flex justify-content-between">
                <a href="#" className="btn btn-primary ">Edit </a>
                <div className="price-wrap">
                    <a href="#" className="btn btn-warning "> Delete </a>
                </div>
            </div>
        </figure>


    }

    return (

        <>
            {showCard()}
            {/*<div className="card card-product-grid card-lg">*/}
            {/*    <div className="img-wrap">*/}
            {/*        <img*/}
            {/*            src={product.images && product.images.length ? product.images[0].url : defaultImage}*/}
            {/*            className="img-fluid"*/}
            {/*            alt={product.title}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="card-body">*/}
            {/*        <h5 className="card-title">{product.title}</h5>*/}
            {/*        <p className="card-text">{`${product.description && product.description.substring(0, 40)}...`}</p>*/}
            {/*        <div className='bottom-wrap'/>*/}
            {/*        <div className='d-flex justify-content-between'>*/}

            {/*            <Link to={`/admin/product/${product.slug}`}>*/}
            {/*                <Icon*/}
            {/*                    icon="ant-design:edit-outlined"*/}
            {/*                    className='text-warning'*/}
            {/*                    cursor='pointer'*/}
            {/*                    fontSize={25}/>*/}
            {/*            </Link>*/}

            {/*            <Icon*/}
            {/*                icon="ant-design:delete-outlined"*/}
            {/*                className='text-danger'*/}
            {/*                fontSize={25}*/}
            {/*                cursor='pointer'*/}
            {/*                onClick={() => handleRemove(product.slug)}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>


    );
};

export default AdminProductCard;
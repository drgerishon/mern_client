import React from 'react';
import {Link} from "react-router-dom";
import {showAverageRating} from "../../common/rating/rating";

const ProductListItems = ({product}) => {
    const {price, sold, quantity, shipping, subs, category} = product

    return (
        <>
            <ul className='list-group list-group-light card-text'>
                  <li className="list-group-item d-flex justify-content-between align-items-start  ">
                    <div className=" me-auto ">
                        <span> Rating</span>
                    </div>
                    <div className="">
                        {showAverageRating(product)}
                    </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto ">
                        <span> Price</span>
                    </div>
                    <span>KES {price}</span>
                </li>
                {category &&
                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto">
                        <span> Category</span>
                    </div>
                    <Link to={`/category/${category.slug}`}><span>{category.name}</span></Link>
                </li>
                }
                {subs && subs.length > 0 &&
                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto">
                        <span>Sub categories</span>
                    </div>
                    {subs.map(s => (
                        <span key={s._id}><Link to={`/sub/${s.slug}`}> <span>{s.name}</span></Link></span>
                    ))}
                </li>
                }

                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto">
                        <span>Shipping</span>
                    </div>
                    <span>{shipping}</span>
                </li>


                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto">
                        <span> Available</span>
                    </div>
                    <span>{quantity}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start ">
                    <div className=" me-auto">
                        <span> Sold</span>
                    </div>
                    <span>{sold}</span>
                </li>


            </ul>
        </>
    );
};

export default ProductListItems;
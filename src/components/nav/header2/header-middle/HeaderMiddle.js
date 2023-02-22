import React from 'react';

const HeaderMiddle = () => {
    return (
        <div className="header-middle">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div id="logo" className="logo">
                            <a href="#" title="">
                                <h3>LOGO HERE</h3>
                            </a>
                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="top-search">
                            <form action="#" method="get" className="form-search"
                                  accept-charset="utf-8">
                                <div className="cat-wrap">
                                    <select name="category">
                                        <option hidden value="">All Category</option>
                                        <option hidden value="">Cameras</option>
                                        <option hidden value="">Computer</option>
                                        <option hidden value="">Laptops</option>
                                    </select>
                                    <span><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                                    <div className="all-categories">
                                        <div className="cat-list-search">
                                            <div className="title">
                                                Electronics
                                            </div>
                                            <ul>
                                                <li>Components</li>
                                                <li>Laptop</li>
                                                <li>Monitor</li>
                                                <li>Mp3 player</li>
                                                <li>Scanners</li>
                                            </ul>
                                        </div>

                                        <div className="cat-list-search">
                                            <div className="title">
                                                Furniture
                                            </div>
                                            <ul>
                                                <li>Bookcases</li>
                                                <li>Barstools</li>
                                                <li>TV stands</li>
                                                <li>Desks</li>
                                                <li>Accent chairs</li>
                                            </ul>
                                        </div>

                                        <div className="cat-list-search">
                                            <div className="title">
                                                Accessories
                                            </div>
                                            <ul>
                                                <li>Software</li>
                                                <li>Mobile</li>
                                                <li>TV stands</li>
                                                <li>Printers</li>
                                                <li>Media</li>
                                            </ul>
                                        </div>

                                    </div>

                                    <span><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                                </div>

                                <div className="box-search">
                                    <input type="text" name="search"
                                           placeholder="Search what you looking for ?"/>
                                    <span className="btn-search">
    <button type="submit" className="waves-effect"><i className="fa fa-search"></i></button>
</span>

                                </div>

                            </form>

                        </div>

                    </div>

                    <div className="col-md-3">
                        <div className="box-cart">
                            <div className="inner-box">
                                <ul className="menu-compare-wishlist">
                                    <li className="compare">
                                        <a href="#" title="">
                                            <i className="fa fa-superpowers"></i>
                                        </a>
                                    </li>
                                    <li className="wishlist">
                                        <a href="#" title="">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>

                            </div>

                            <div className="inner-box">
                                <a href="#" title="">
                                    <div className="icon-cart">
                                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <span>4</span>
                                    </div>
                                    <div className="price">
                                        $0.00
                                    </div>
                                </a>
                                <div className="dropdown-box">
                                    <ul>
                                        <li>
                                            <div className="img-product">
                                                <img
                                                    src="https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a33-5g.jpg"
                                                    alt=""/>
                                            </div>
                                            <div className="info-product">
                                                <div className="name">
                                                    Samsung - Galaxy S6 4G LTE <br/>with 32GB Memory
                                                    Cell Phone
                                                </div>
                                                <div className="price">
                                                    <span>1 x</span>
                                                    <span>$250.00</span>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <span className="delete">x</span>
                                        </li>
                                        <li>
                                            <div className="img-product">
                                                <img
                                                    src="https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a33-5g.jpg"
                                                    alt=""/>
                                            </div>
                                            <div className="info-product">
                                                <div className="name">
                                                    Samsung - Galaxy S6 4G LTE <br/>with 32GB Memory
                                                    Cell Phone
                                                </div>
                                                <div className="price">
                                                    <span>1 x</span>
                                                    <span>$250.00</span>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <span className="delete">x</span>
                                        </li>
                                    </ul>
                                    <div className="total">
                                        <span>Subtotal:</span>
                                        <span className="price">$1,999.00</span>
                                    </div>
                                    <div className="btn-cart">
                                        <a href="#" className="view-cart" title="">View Cart</a>
                                        <a href="#" className="check-out" title="">Checkout</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default HeaderMiddle;
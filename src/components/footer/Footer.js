import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer-content position-relative">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-4 col-md-6">
                            <div className="footer-info">
                                <h3>Myfarm</h3>
                                <p>
                                    A108 Adam Street <br/>
                                    NY 535022, USA<br/><br/>
                                    <strong>Phone:</strong> +1 5589 55488 55<br/>
                                    <strong>Email:</strong> info@example.com<br/>
                                </p>
                                <div className="social-links d-flex mt-3">
                                    <a href="#" className="d-flex align-items-center justify-content-center"><i
                                        className="bi bi-twitter"></i></a>
                                    <a href="#" className="d-flex align-items-center justify-content-center"><i
                                        className="bi bi-facebook"></i></a>
                                    <a href="#" className="d-flex align-items-center justify-content-center"><i
                                        className="bi bi-instagram"></i></a>
                                    <a href="#" className="d-flex align-items-center justify-content-center"><i
                                        className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Terms of service</a></li>
                                <li><a href="#">Privacy policy</a></li>
                            </ul>
                        </div>


                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><a href="#">Web Design</a></li>
                                <li><a href="#">Web Development</a></li>
                                <li><a href="#">Product Management</a></li>
                                <li><a href="#">Marketing</a></li>
                                <li><a href="#">Graphic Design</a></li>
                            </ul>
                        </div>


                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Hic solutasetp</h4>
                            <ul>
                                <li><a href="#">Molestiae accusamus iure</a></li>
                                <li><a href="#">Excepturi dignissimos</a></li>
                                <li><a href="#">Suscipit distinctio</a></li>
                                <li><a href="#">Dilecta</a></li>
                                <li><a href="#">Sit quas consectetur</a></li>
                            </ul>
                        </div>


                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Nobis illum</h4>
                            <ul>
                                <li><a href="#">Ipsam</a></li>
                                <li><a href="#">Laudantium dolorum</a></li>
                                <li><a href="#">Dinera</a></li>
                                <li><a href="#">Trodelas</a></li>
                                <li><a href="#">Flexo</a></li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

            <div className="footer-legal text-center position-relative">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>UpConstruction</span></strong>. All Rights Reserved
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
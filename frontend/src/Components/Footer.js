import React from 'react';
import Logo from '../Image/logo.png';
import '../Pages/Home.css'

function Footer() {
    return (
        <div>
            <footer>
                <div class="tp-footer-area" style={{backgroundColor:'#484848'}}>
                    <div class="tp-footer-top pt-95 pb-40">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                                    <div class="tp-footer-widget footer-col-1 mb-50">
                                        <div class="tp-footer-widget-content">
                                            <div class="tp-footer-logo">
                                                <a href="index.html">
                                                    <img src={Logo} alt="logo" width={300}  />
                                                </a>
                                            </div>
                                            <div class="tp-footer-social">
                                                      <a href="https://www.facebook.com/CCTVONLINESHOPPE/" target="_blank"><i class="lab la-facebook"></i></a>
                                                      <a href="https://www.instagram.com/cctv_shoppe/" target="_blank"><i class="lab la-instagram"></i></a>
                                                      <a href="#" target="_blank"><i class="lab la-youtube"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div class="tp-footer-widget footer-col-2 mb-50">
                                        <h4 class="tp-footer-widget-title">My Account</h4>
                                        <div class="tp-footer-widget-content">
                                            <ul>
                                                <li><a href="/shipping">Shipping</a></li>
                                                <li><a href="/wishlist">Wishlist</a></li>
                                                <li><a href="/account">My Account</a></li>
                                                <li><a href="/orders">Order History</a></li>
                                                <li><a href="/cancellation-return">Cancellation & Return</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                    <div class="tp-footer-widget footer-col-3 mb-50">
                                        <h4 class="tp-footer-widget-title">Infomation</h4>
                                        <div class="tp-footer-widget-content">
                                            <ul>
                                                <li><a href="#">Our Story</a></li>
                                                <li><a href="/about">About Us</a></li>
                                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                                <li><a href="/term-conditions">Terms & Conditions</a></li>
                                                <li><a href="/contact">Contact Us</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                    <div class="tp-footer-widget footer-col-4 mb-50">
                                        <h4 class="tp-footer-widget-title">Talk To Us</h4>
                                        <div class="tp-footer-widget-content">
                                            <div class="tp-footer-talk mb-20">
                                                <span>Got Questions? Call us</span>
                                                <h4><a href="tel:+919994335344">+91 9994335344</a></h4>
                                            </div>
                                            <div class="tp-footer-contact">
                                                <div class="tp-footer-contact-item d-flex align-items-start">
                                                    <div class="tp-footer-contact-icon">
                                                        <span>
                                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color:'#fff'}}>
                                                                <path d="M1 5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6H5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M13 5.40039L10.496 7.40039C9.672 8.05639 8.32 8.05639 7.496 7.40039L5 5.40039" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M1 11.4004H5.8" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M1 8.19922H3.4" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div class="tp-footer-contact-content">
                                                        <p><a href="mailto:sales@cctvshoppee.com ">sales@cctvshoppee.com</a></p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tp-footer-bottom">
                        <div class="container">
                            <div class="tp-footer-bottom-wrapper">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <div class="tp-footer-copyright">
                                            <p>© 2025 All Rights Reserved  | <a href="index.html">CCTV SHOPPEE</a></p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="tp-footer-payment text-md-end">
                                            <p>
                                                <img src="assets/img/footer/footer-pay.png" alt="" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

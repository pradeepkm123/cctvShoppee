import React from 'react';
import { Link } from 'react-router-dom';

function Shopnow() {
    return (
        <div>
            <section class="tp-banner-area pb-30">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 col-lg-7">
                            <div class="tp-banner-item tp-banner-height p-relative mb-30 z-index-1 fix">
                                <div class="tp-banner-thumb include-bg transition-3" id='banner1'></div>
                                <div class="tp-banner-content">
                                    <span>Sale 20% off all store</span>
                                    <Link to="/product"><h3 class="tp-banner-title">
                                        <a>Smartphone <br /> BLU G91 Pro 2022</a>
                                    </h3></Link>
                                    <div class="tp-banner-btn">
                                        <a href="product-details.html" class="tp-link-btn">Shop Now
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="tp-banner-item tp-banner-item-sm tp-banner-height p-relative mb-30 z-index-1 fix">
                                <div class="tp-banner-thumb include-bg transition-3" id='banner2'></div>
                                <div class="tp-banner-content">
                                    <h3 class="tp-banner-title">
                                        <a href="product-details.html">HyperX Cloud II <br /> Wireless</a>
                                    </h3>
                                    <p>Sale 35% off</p>
                                    <div class="tp-banner-btn">
                                        <a href="product-details.html" class="tp-link-btn">Shop Now
                                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.9998 6.19656L1 6.19656" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M8.75674 0.975394L14 6.19613L8.75674 11.4177" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shopnow
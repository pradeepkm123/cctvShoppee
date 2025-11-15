import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function About() {
  return (
    <div>
        <Navbar/>
        <main>
         <section class="breadcrumb__area include-bg text-center pt-95 pb-50">
            <div class="container">
               <div class="row">
                  <div class="col-xxl-12">
                     <div class="breadcrumb__content p-relative z-index-1">
                        <h3 class="breadcrumb__title">Keep In Touch with Us</h3>
                        <div class="breadcrumb__list">
                           <span><a href="#">Home</a></span>
                           <span>Contact</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

    
         <section class="tp-contact-area pb-100">
            <div class="container">
               <div class="tp-contact-inner">
                  <div class="row">
                     <div class="col-xl-9 col-lg-8">
                        <div class="tp-contact-wrapper">
                           <h3 class="tp-contact-title">Sent A Message</h3>

                           <div class="tp-contact-form">
                              <form id="contact-form" action="assets/mail.php" method="POST">
                                 <div class="tp-contact-input-wrapper">
                                    <div class="tp-contact-input-box">
                                       <div class="tp-contact-input">
                                          <input name="name" id="name" type="text" />
                                       </div>
                                       <div class="tp-contact-input-title">
                                          <label for="name">Your Name</label>
                                       </div>
                                    </div>
                                    <div class="tp-contact-input-box">
                                       <div class="tp-contact-input">
                                          <input name="email" id="email" type="email" />
                                       </div>
                                       <div class="tp-contact-input-title">
                                          <label for="email">Your Email</label>
                                       </div>
                                    </div>
                                    <div class="tp-contact-input-box">
                                       <div class="tp-contact-input">
                                          <input name="subject" id="subject" type="text" placeholder="Write your subject" />
                                       </div>
                                       <div class="tp-contact-input-title">
                                          <label for="subject">Subject</label>
                                       </div>
                                    </div>
                                    <div class="tp-contact-input-box">
                                       <div class="tp-contact-input">
                                         <textarea id="message" name="message" placeholder="Write your message here..."></textarea>
                                       </div>
                                       <div class="tp-contact-input-title">
                                          <label for="message">Your Message</label>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="tp-contact-suggetions mb-20">
                                    <div class="tp-contact-remeber">
                                       <input id="remeber" type="checkbox" />
                                       <label for="remeber">Save my name, email, and website in this browser for the next time I comment.</label>
                                    </div>
                                 </div>
                                 <div class="tp-contact-btn">
                                    <button type="submit">Send Message</button>
                                 </div>
                              </form>
                              <p class="ajax-response"></p>
                           </div>
                        </div>
                     </div>
                     <div class="col-xl-3 col-lg-4">
                        <div class="tp-contact-info-wrapper">
                           <div class="tp-contact-info-item">
                              <div class="tp-contact-info-icon">
                                 <span>
                                    <img src="https://html.storebuild.shop/shofy-prv/shofy/assets/img/contact/contact-icon-1.png" alt="" />
                                 </span>
                              </div>
                              <div class="tp-contact-info-content">
                                 <p data-info="mail"><a href="mailto:sales@cctvshoppee.com">sales@cctvshoppee.com</a></p>
                                 <p data-info="phone"><a href="tel:+919994335344">+91 9994335344</a></p>
                              </div>
                           </div>
                           <div class="tp-contact-info-item">
                              <div class="tp-contact-info-icon">
                                 <span>
                                  <img src="https://html.storebuild.shop/shofy-prv/shofy/assets/img/contact/contact-icon-2.png" alt="" />
                                 </span>
                              </div>
                              <div class="tp-contact-info-content">
                                 <p>
                                    <a href="https://maps.app.goo.gl/vtn9GAXn59JxYjfv5" target="_blank">
                                       No:6/97 Jaya Nagar,Meera Complex.Mount Poonamallee <br /> High road, Porur Chennai - 600116
                                    </a>
                                 </p>
                              </div>
                           </div>
                           <div class="tp-contact-info-item">
                              <div class="tp-contact-info-icon">
                                 <span>
                                    <img src="https://html.storebuild.shop/shofy-prv/shofy/assets/img/contact/contact-icon-3.png" alt="" />
                                 </span>
                              </div>
                              <div class="tp-contact-info-content">
                                 <div class="tp-contact-social-wrapper mt-5">
                                    <h4 class="tp-contact-social-title">Find on social media</h4>

                                    <div class="tp-contact-social-icon">
                                       <a href="https://www.facebook.com/CCTVONLINESHOPPE/" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                                       <a href="https://www.instagram.com/cctv_shoppe/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                       <a href="# " target="_blank"><i class="fa-brands fa-youtube"></i></a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section class="tp-map-area pb-120">
            <div class="container">
               <div class="row">
                  <div class="col-xl-12">
                     <div class="tp-map-wrapper">
                        <div class="tp-map-hotspot">
                           <span class="tp-hotspot tp-pulse-border">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <circle cx="6" cy="6" r="6" fill="#821F40"/>
                              </svg>
                           </span>
                        </div>
                        <div class="tp-map-iframe">
                          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6604.864239347136!2d80.1490307!3d13.0356358!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52615d5e910e59%3A0x9ea7a355f133ac04!2sCCTV%20SHOPPEE%20-%20PORUR!5e1!3m2!1sen!2sin!4v1763104372029!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

      </main>
      <Footer/>
    </div>
  )
}

export default About

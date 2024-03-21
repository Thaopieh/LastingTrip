import React from 'react'
import './Payment.css'
import { faUser, faBed, faStairs, faSquare, faUtensils, faWifi, faBanSmoking, faPersonBooth, faCircleCheck, faCircleChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class PaymentComponent extends React.Component {
    render() {
        return (
            <div className='layout-payment'>
                <div className='payment-header'></div>
                <div className='payment-main-layout'>
                    <div className='payment-main'>
                        <div className='payment-main-wrapper'>
                            <div className='hotel-detail'>
                                <div className='hotel-detail-left'>
                                    <img className='image' src='https://w0.peakpx.com/wallpaper/709/376/HD-wallpaper-mansion-villa-thumbnail.jpg' alt='#' />
                                </div>
                                <div className='hotel-detail-right'>
                                    <div className='hotel-name'>Devil</div>
                                    <div className='room-name' >Heaven Room</div>
                                    <div className='facilities'>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faUser} />
                                            <span className='f-name'>2 adults </span>

                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faBed} />
                                            <span className='f-name'> 2 single beds  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faUtensils} />
                                            <span className='f-name'>Include 2 breakfasts  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faWifi} />
                                            <span className='f-name'>Free wifi  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faBanSmoking} />
                                            <span className='f-name'>Non-smoking  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faPersonBooth} />
                                            <span className='f-name'>City view  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faSquare} />
                                            <span className='f-name'>40 m2  </span>
                                        </div>
                                        <div className='facility-item'>
                                            <FontAwesomeIcon icon={faStairs} />
                                            <span className='f-name'>Floor: 17  </span>
                                        </div>
                                    </div>
                                    <div className='Option-gift'>
                                        <div className='Option-gift-left'>
                                            <ol className='Pro-desc'>
                                                <li className='desc-item'>1. Miễn phí sử dụng mini bar cho đêm đầu tiên </li>
                                                <li className='desc-item'>2. Đón và trả khách tại sân bay theo lịch trình </li>
                                                <li className='desc-item'>3.   </li>
                                            </ol>
                                        </div>
                                        <div className='Option-gift-left'>
                                            <span class="Option-btn">Chi tiết</span>
                                        </div>
                                    </div>
                                    <div className='cancel-policy'>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                        <span className='cancel-content'>
                                            <span className='green-hightlight'>Free Cancellation</span>
                                            <span className='gray-hightlight'>before 18:00, Mar 20</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='date-and-room'>
                            </div>

                        </div>
                        <div className='guest-info'>
                            <div className='guest-info-text-p1'><p>Guest Info</p></div>
                            <div className='guest-info-text-p2'><p>Guest names must match the valid ID which will be used at check-in.</p></div>
                            <div className='form-payment'>
                                <form className='guest-info-username'>
                                    <span className='guest-info-username-label'>Username</span>
                                    <div className=' guest-info-username-input'>
                                        <input type="text" id="fname" name="fname" placeholder='' /><br />
                                    </div>

                                </form>
                                <form className='guest-info-email'>
                                    <span className='guest-info-email-label'>Email</span>
                                    <div className='guest-info-email-input'>
                                        <input type="text" id="fname" name="fname" placeholder='' /><br />
                                    </div>


                                </form>
                            </div>
                        </div>
                        <div className='request-container'>
                            <div className='request-container-text'>
                                Special Requests
                            </div>
                            <div className='request-container-action'>
                                <div className='request-action-text'> The property will do its best, but cannot guarantee to fulfill all requests.</div>
                                <div className=' request-action-icon'>
                                    <span className='request-action-icon-text'>Hide</span>
                                    <FontAwesomeIcon icon={faCircleChevronUp} />
                                </div>
                            </div>
                            <div className='request-container-input'>
                                <input type='text' className='request-container-input1' placeholder='Enter your request' />
                            </div>
                        </div>
                        <div className='discount-container'>
                            <div className='discount-container-text'>
                                Available for this booking
                            </div>
                            <div className='discount-container-action'>
                                <div className='action-text'> Promotion code</div>
                                <div className='action-icon'>
                                    <span className='action-icon-text'>Hide</span>
                                    <FontAwesomeIcon icon={faCircleChevronUp} />

                                </div>
                            </div>
                            <div className='discount-container-input'>
                                <input type='text' className='discount-container-input1' placeholder='Enter promotion code' />
                            </div>
                            <div className='discount-container-button'>
                                <button type='button' className='discount-container-button1'>
                                    Use
                                </button>
                            </div>
                        </div>
                        <div className='next-step-container'>
                            <div className='next-step-content'>By submitting this booking, I acknowledge that I have read and agree to LastingTrip.com's Terms of Use and Privacy Statement.
                            </div>
                            <div className='next-step-send'>
                                <div class="subscribe-txt" styles="color: rgb(15, 41, 77);">
                                    <input type="checkbox" />
                                    Send me special LastingTrip.com deals and travel reminders</div>
                            </div>
                            <div className='next-step-button'>
                                <button class='next-step-button1'>
                                    <div className='next-step-button1-content'>
                                        <span>Next-step: Final Confirmation</span>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='payment-side'>
                        <div className='priceDetail '>
                            <div className='priceDetail-title'>
                                Price Details
                            </div>
                            <div className='priceDetail-content'>
                                <div className='priceDetail-quantityDays-list'>
                                    <div className='priceDetail-desc'>
                                        <div className='priceDetail-descName'>
                                            <span>1 room x 1 night</span>
                                        </div>
                                        <div class="priceDetail-descPrice">VND 4,008,002</div>
                                    </div>
                                    <div className='priceDetail-payTax-list'>
                                        <div className='priceDetail-desc'>
                                            <div className='priceDetail-descName'>Taxes & fees</div>
                                            <div class="priceDetail-descPrice">VND 402,323</div>
                                        </div>
                                    </div>
                                    <div class="priceDetail-promotionItems-list">
                                        <div class="priceDetail-desc">
                                            <div class="priceDetail-descName">
                                                <span>Special Discount</span>
                                            </div>
                                            <div class="priceDetail-descPrice highlight">-VND 661,549</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="priceDetail-total">
                                    <div class="priceDetail-totalPrice">
                                        <div class="priceDetail-totalPriceName">Prepay Online</div>
                                        <div class="priceDetail-totalPriceDesc">
                                            <div class="priceDetail-showPrice">
                                                <span class="price">VND 3,087,227</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PaymentComponent;
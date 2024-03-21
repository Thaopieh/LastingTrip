import React from 'react'
import './Chatbot.css'
import { faCamera, faFaceSmile, faPaperclip, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ChatbotComponent extends React.Component {
    render() {
        return (
            <div className='layout-chatbot'>
                <div className='chatbot-container'>
                    <div className='chatbot-container-header'>
                        <img className='chatbot-image' src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
                        <div className='chatbot-container-header-content'>
                            <h3>Nguyen Quang</h3>
                            <p>Agent<span>(Online)</span></p>
                        </div>
                    </div>
                    <div className='chatbot-container-main'>
                        <div className='chatbot-container-main-left'>
                            <div className='chatbot-container-main-left-on'>
                                <div className='chatbot-container-main-left-on-agent'>
                                    <img className='chatbot-image' src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />
                                    <p>Hey! There any question?</p>
                                </div>
                                <div className='chatbot-container-main-left-on-client'>
                                    <p>Hello</p>
                                </div >
                            </div>
                            <div className='chatbot-container-main-left-under'>
                                <div className='chatbot-container-main-left-under-icon'>
                                    <FontAwesomeIcon class="under-icon1" icon={faCamera} />
                                    <FontAwesomeIcon class="under-icon1" icon={faFaceSmile} />
                                    <FontAwesomeIcon class="under-icon1" icon={faPaperclip} />
                                </div>
                                <div className='chatbot-container-main-left-under-input'>
                                    <input type="text" className='input1' placeholder='Please enter your question competely'></input>
                                    <input type='submit' className='input2' value="Send"></input>
                                </div>
                            </div>
                        </div>
                        <div className='chatbot-container-main-right'>  </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default ChatbotComponent;
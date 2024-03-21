import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import './Promotions.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
class PromotionComponent extends React.Component {
    render() {
        return (
            <div class='layout-pro'>
                <Sidebar />
                <div class='pro-container'>
                    <div class='pro-search'>
                        <p>MANAGE PROMOTIONS</p>
                        <div class='pro-search-btn'>
                            <form>
                                <input type="text" placeholder="Search.." name="search" />
                                <FontAwesomeIcon icon={faSearch} />
                            </form>
                            <div class='pro-search-create'>+ New Promotion</div>
                        </div>
                    </div>
                    <div>
                        <table class='pro-table'>
                            <tr >
                                <th>CODE</th>
                                <th>DISCOUNT RATE</th>
                                <th>QUANTITY</th>
                                <th>USED</th>
                                <th>START DAY</th>
                                <th>ACTION</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default PromotionComponent;
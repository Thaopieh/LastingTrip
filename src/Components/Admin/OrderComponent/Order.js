import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import './Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
class OrderComponent extends React.Component {
    render() {
        return (
            <div class='layout-orders'>
                <Sidebar />
                <div class='orders-container'>
                    <div class='orders-search'>
                        <p>MANAGE ORDERS</p>
                        <div class='orders-search-btn'>
                            <form>
                                <input type="text" placeholder="Search.." name="search" />
                                <FontAwesomeIcon icon={faSearch} />
                            </form>
                            <div class='orders-search-create'>+ New orders</div>
                        </div>
                    </div>
                    <div class='orders-quantity'>50 in total</div>
                    <div class='orders-table'>
                        <table>
                            <tr>
                                <th>ORDER ID</th>
                                <th>ID</th>
                                <th>START DAY</th>
                                <th>END DAY</th>
                                <th>PAYMENT STATUS</th>
                                <th>TOTAL</th>
                                <th>ACTION</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderComponent;
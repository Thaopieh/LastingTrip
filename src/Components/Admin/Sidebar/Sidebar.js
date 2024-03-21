import React from "react";
import './Sidebar.css'
import { faHouse, faUsers, faRightFromBracket, faHotel, faReceipt, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Sidebar extends React.Component {
    render() {
        return (
            <div class="sidebar">
                <ul>
                    <li className="li-sidebar">
                        <FontAwesomeIcon icon={faHouse} className='search-icon' />
                        <a href="/admin/dashboard">Dashboard</a>
                    </li>
                    <li className="li-sidebar">
                        <FontAwesomeIcon icon={faReceipt} className='search-icon' />
                        <a href="/admin/orders">Orders</a>
                    </li>

                    <li className="li-sidebar">
                        <FontAwesomeIcon icon={faUsers} className='search-icon' />
                        <a href="/admin/users">Users</a>
                    </li>
                    <li className="li-sidebar">
                        <FontAwesomeIcon icon={faHotel} className='search-icon' />
                        <a href="#">Products</a>
                    </li>
                    <li className="li-sidebar">
                        <FontAwesomeIcon className='search-icon' icon={faTicket} />
                        <a href="/admin/promotions">Promotion</a>
                    </li>
                    <li className="li-sidebar">
                        <FontAwesomeIcon icon={faRightFromBracket} className='search-icon' />
                        <a href="/admin">Log out</a>
                    </li>
                </ul>
            </div >
        )
    }
}
export default Sidebar;
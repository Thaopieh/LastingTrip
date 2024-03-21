import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css'
import { faCartShopping, faCity, faMoneyBillTrendUp, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class DashboardComponent extends React.Component {
    render() {
        return (
            <div className='layout-dashboard'>
                <Sidebar />
                <div className='dashboard-container' >
                    <div className='dashboard-container-item dashboard-container-item-first'>
                        <div className='dashboard-container-item-text'>
                            <p>Users</p>
                            <p>3010</p>
                        </div>
                        <FontAwesomeIcon className='d-icon' icon={faUsers} />
                    </div>
                    <div className='dashboard-container-item dashboard-container-item-2'>
                        <div className='dashboard-container-item-text'>
                            <p >Revenue</p>
                            <p>$20000</p>
                        </div>
                        <FontAwesomeIcon className='d-icon' icon={faMoneyBillTrendUp} />
                    </div>
                    <div className='dashboard-container-item dashboard-container-item-3'>
                        <div className='dashboard-container-item-text'>
                            <p>Orders</p>
                            <p>2345</p>
                        </div>
                        <FontAwesomeIcon className='d-icon' icon={faCartShopping} />
                    </div>
                    <div className='dashboard-container-item dashboard-container-item-4'>
                        <div className='dashboard-container-item-text'>
                            <p>Room </p>
                            <p>243</p>
                        </div>
                        <FontAwesomeIcon className='d-icon' icon={faCity} />
                    </div>
                </div >
                <div></div>
            </div>


        )
    }
}
export default DashboardComponent;
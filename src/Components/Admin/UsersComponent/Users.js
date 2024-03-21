import React from 'react'
import './Users.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar/Sidebar.js';
class UsersComponent extends React.Component {
    render() {
        return (
            <div class='layout'>
                <Sidebar />
                <div class='users-container'>
                    <div class='users-search'>
                        <p>MANAGE USERS</p>
                        <div class='users-search-btn'>
                            <form>
                                <input type="text" placeholder="Search.." name="search" />
                                <FontAwesomeIcon icon={faSearch} />
                            </form>
                            <div class='users-search-create'>+ New user</div>
                        </div>

                    </div>
                    <div class='users-option'>
                        <a href="#" class='users-option-1'>Client</a>
                        <a href="#" class='users-option-2'>Member</a>
                    </div>
                    <div class='users-quantity'>200 in total</div>
                    <div class='users-table'>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>ACTION</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default UsersComponent;
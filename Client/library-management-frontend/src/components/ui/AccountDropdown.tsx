import React from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

const AccountDropdown: React.FC = () => {
    const { fullName, logOut } = useAuth();

    return (
        <Dropdown >
            <Dropdown.Toggle className='dropdown-toggle text-white  text-start' variant="">
                <span className="h3">Signed in as: {fullName}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
                <Dropdown.Item className="h5 mb-1 dropdown-item" onClick={logOut}>
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default AccountDropdown;
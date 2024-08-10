// src/components/common/ConfirmLogout.tsx
import React from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import useAuth from '../../hooks/useAuth';

const ConfirmLogout: React.FC = () => {
    const { handleLogout } = useAuth();

    const handleLogoutClick = async () => {
        if(window.confirm("Are you sure you want to log out?"))
            await handleLogout();
    };
    return (
        <button className='header-link' onClick={handleLogoutClick}>Logout</button>

    )
};
export default ConfirmLogout;
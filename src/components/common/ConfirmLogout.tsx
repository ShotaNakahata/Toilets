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
        <button className='hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150 mb-2' onClick={handleLogoutClick}>Logout</button>

    )
};
export default ConfirmLogout;
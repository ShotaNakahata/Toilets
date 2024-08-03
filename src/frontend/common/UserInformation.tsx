// src/components/common/UserInformation.tsx
import React from "react";
import { useUser } from "../context/UserContext";



export const UserInformation:React.FC =()=>{
    const {user}=useUser();

    return(
        <div className="user-information">
            <h2>User Information</h2>
            {user?(
                <>
                <p><strong>Username:</strong>{user.username}</p>
                <p><strong>Email:</strong>{user.email}</p>
                </>
            ):(
                <p>Please log in to see your information.</p>
            )}
        </div>
    );
}


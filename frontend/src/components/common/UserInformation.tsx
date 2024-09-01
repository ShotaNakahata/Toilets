import React from "react";
import { useUser } from "../../context/UserContext";

export const UserInformation: React.FC = () => {
    const { user } = useUser();

    return (
        <div className="user-information container border-white bg-white shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-black tracking-wider">User Information</h2>
            {user ? (
                <>
                    <p className="text-black text-xl mb-4 tracking-wide">
                        <strong className="text-black">Username:</strong> {user.username}
                    </p>
                    <p className=" text-black text-xl tracking-wide">
                        <strong className="text-black">Email:</strong> {user.email}
                    </p>
                </>
            ) : (
                <p className="text-xl text-red-500 tracking-wide">Please log in to see your information.</p>
            )}
        </div>
    );
}



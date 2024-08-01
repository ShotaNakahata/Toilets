// src/__mocks__/mockUserDB.ts
// export const mockUsers = [
//     { id: "1", username: "testuser", email: 'testuser@example.com', password: "hashedpassword" }
// ];
// src/__mocks__/mockUserDB.ts
import { ObjectId } from 'mongodb';

export interface IUser {
    _id: string | ObjectId;
    username: string;
    email: string;
    password: string;
}

export const mockUsers: IUser[] = [
    {
        _id: "667427352d02a8b491c4dc05",
        username: "LoginTest",
        email: "LoginTest@gmail",
        password: "LoginTest" 
    }
];

export const findUserByEmail = (email: string): IUser | undefined => {
    return mockUsers.find(user => user.email === email);
};

export const findUserById = (id: string | ObjectId): IUser | undefined => {
    return mockUsers.find(user => user._id.toString() === id.toString());
};

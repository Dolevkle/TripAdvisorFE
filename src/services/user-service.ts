import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./api-client";

export interface IUser {
    email: string;
    username: string;
    password?: string;
    imgUrl?: string;
    firstName?: string;
    lastName?: string;
    _id?: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface editUser {
    username?: string;
    password?: string;
    imgUrl?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    refreshToken?: string;
}

export const loginUser = async (user: IUser) => {
    const { data } = await apiClient.post("/auth/login", user);
    return data;
};

export const refresh = async (token: string) => {
    const { data } = await apiClient.get("/auth/refresh", { 
        headers: { Authorization: `JWT ${token}`}
    })
    return data;
}

export const registerUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        apiClient
            .post("/auth/register", user)
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...");
        apiClient
            .post("/auth/google", credentialResponse)
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const getAllUsers = async (currentUserId: string) => {
    const { data } = await apiClient.get(`/auth/allUsers/${currentUserId}`);
    return data;
    // return new Promise<IUser>((resolve, reject) => {
    //     console.log("googleSignin ...")
    //     apiClient.post("/auth/google", credentialResponse).then((response) => {
    //         console.log(response)
    //         resolve(response.data)
    //     }).catch((error) => {
    //         console.log(error)
    //         reject(error)
    //     })
    // })
};

export const getCurrentUser = async (accessToken: string) => {
    const { data } = await apiClient.get("/user", {
        headers: { Authorization: `JWT ${accessToken}` },
    });
    return data;
};

export const editProfile = async (userId: string, editUser: editUser) => {
    console.log(editUser)
    const currentUser = localStorage.getItem("currentUser");
    const { accessToken } = JSON.parse(currentUser);
    return new Promise((resolve, reject) => {
        apiClient
            .put(`/user/${userId}`, {...editUser}, {
                headers: { Authorization: `JWT ${accessToken}` },}
            )
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
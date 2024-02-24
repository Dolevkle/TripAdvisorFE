import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./api-client"

export interface IUser {
    email: string,
    username: string;
    password?: string,
    imgUrl?: string,
    _id?: string,
    accessToken?: string,
    refreshToken?: string
}

export const loginUser = async (user: IUser) => {
    const { data } = await apiClient.post('/auth/login', user);
    return data;
}

export const registerUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...")
        apiClient.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const getAllUsers = async (currentUserId: string) => {
    const {data} = await apiClient.get(`/auth/allUsers/${currentUserId}`);
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
}
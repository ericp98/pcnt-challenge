import axios from 'axios'

export const setUserId = async () => {

    const API_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'https://api-3sxs63jhua-uc.a.run.app/v1/' 

    const newUser = async () => {
        /*  Check if user exist */
        if (!getStorageId()) {
            await createUser()
        }
    }

    const createUser = async () => {
        try {
            const res = await axios.get(API_URL + 'userId')
            window.localStorage.setItem("userId", res.data)
        } catch (error) {
            console.log(error)
        }
    }

    await newUser()
}

export const getStorageId = () => {
    return window.localStorage.getItem("userId")
}
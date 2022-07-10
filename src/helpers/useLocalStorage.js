import axios from 'axios'

export const setUserId = () => {

    const endpoint = "https://api-3sxs63jhua-uc.a.run.app/v1/userId"

    const newUser = () => {
        /*  Check if user exist */
        if (!getStorageId()) {
            createUser()
        }
    }

    const createUser = async () => {
        try {
            const res = await axios.get(endpoint)
            window.localStorage.setItem("userId", res.data)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    newUser()
}

export const getStorageId = () => {
    return window.localStorage.getItem("userId")
}
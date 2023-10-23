import {apiWithoutCredentials, apiWithCredentials} from './apiConfig'

export const getAllItems = async () => {
    try{
        const response = await apiWithoutCredentials.get('/items/')
        return response.data
    } catch (error) {
        console.log(error)
        return [];
    }
}

interface createOrderParams {
    email: string;
    username: string;
    order_items: { item: number; quantity: number }[];
}


export const createOrder = async ({ email, username, order_items }: createOrderParams) => {
    const csrfToken = localStorage.getItem('csrfToken')
    try {
        const response = await apiWithCredentials.post('/order-create/', {
            email: email as string,
            username,
            order_items
        }, {
            headers:{
                'X-CSRFToken' : csrfToken
            },
            withCredentials:true
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getOrders = async (username:string) => {
    let csrfToken = localStorage.getItem('csrfToken')
    try {
        const response = await apiWithCredentials.get(`orders/by-username/${username}/`, {
            headers:{
                'X-CSRFToken' : csrfToken
            },
            withCredentials:true
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}



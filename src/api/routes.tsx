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

interface signUpParams {
    username:string;
    password:string;
    email:string;
}

export const signup = async ({username, email, password} : signUpParams) => {
    try{
        const response = await apiWithoutCredentials.post('/signup/', {
            username,
            password,
            email
        })

        if(response){
            localStorage.setItem('username',response.data.username)
            localStorage.setItem('email', response.data.email)
        }
        return response.data
    }catch(error){
        console.log(error)
    }
}

interface createOrderParams {
    username: string;
    order_items: { item: number; quantity: number }[];
}


export const createOrder = async ({ username, order_items }: createOrderParams) => {
    const csrfToken = localStorage.getItem('csrfToken')
    try {
        const response = await apiWithCredentials.post('/order-create/', {
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



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

export const logout = async () => {
    try {
        const response = await apiWithCredentials.post('/logout/', {}, { withCredentials: true });

        if (response.status === 200) { 
            console.log('Successfully logged out');
            return response.data;
        } else {
            console.error(`Unexpected response code: ${response.status}`);
            throw new Error('Failed to logout');
        }
    } catch (error) {
        console.error('An error occurred during the logout process:', error);
        throw error;
    }
}


interface createOrderParams {
    username: string;
    order_items: { item: number; quantity: number }[];
}


export const createOrder = async ({ username, order_items }: createOrderParams) => {
    try {
        const response = await api.post('/order-create/', {
            username,
            order_items
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getOrders = async (username:string) => {
    try {
        const response = await api.get(`orders/by-username/${username}/`);
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}



import React, { createContext, useState, useContext, FunctionComponent } from 'react';
import {apiWithCredentials, apiWithoutCredentials} from '../api/apiConfig'

// Define the shape of your context
interface AuthContextProps {
  // authToken: string | null;
  username: string;
  email: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>
  deleteUser: () => Promise<void>
  updateUser: (username:string) => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ children }) =>  {
  const [email, setEmail] = useState<string>('Guest@FurniTech.com')
  const [username, setUsername] = useState<string>('Guest');

  const login = async (username: string, password: string) => {
    try {
      const response = await apiWithoutCredentials.post('/login/', {
        username, 
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) { 
        setUsername(response.data.username); 
        setEmail(response.data.email)
        localStorage.setItem('csrfToken', response.data.csrfToken)
        localStorage.setItem('username', response.data.username)
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const logout = async () => {
    const csrfToken = localStorage.getItem('csrfToken')
    try {
        const response = await apiWithCredentials.post('/logout/', {}, { 
            headers: {
                'X-CSRFToken' : csrfToken
            },
            withCredentials: true 
        });

        if (response.status === 200) { 
            localStorage.removeItem('csrfToken')
            localStorage.removeItem('username')
            localStorage.removeItem('cartItems')
            setUsername('Guest')
            setEmail('Guest@FurniTech.com')
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

  const updateUser = async (email:string) => {
    const csrfToken = localStorage.getItem('csrfToken')
    try{
      const response = await apiWithCredentials.put('/update-email/', {email}, {
        withCredentials:true,
        headers:{
          'X-CSRFToken' : csrfToken
        }
      })
      if(response.status===200){
        setEmail(response.data.new_email)
      }
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  const deleteUser = async () => {
    const csrfToken = localStorage.getItem('csrfToken')
    try{
      const response = await apiWithCredentials.delete('/delete-user/', {
        withCredentials:true,
        headers:{
          'X-CSRFToken': csrfToken
        }
      })
      if(response.status===200){
        localStorage.removeItem('csrfToken')
        localStorage.removeItem('username')
        localStorage.removeItem('cartItems')
        setUsername('Guest')
        setEmail('Guest@FurniTech.com')
      }
      console.log('USER HAS BEEN EVICERATED')

    }catch(error){
      console.log('User Not Autorized to delete account')
    }
  }

  return (
    <AuthContext.Provider value={{ username, login, logout, deleteUser, updateUser, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


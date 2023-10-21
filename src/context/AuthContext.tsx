import React, { createContext, useState, useContext, FunctionComponent } from 'react';
import {apiWithCredentials, apiWithoutCredentials} from '../api/apiConfig'

// Define the shape of your context
interface AuthContextProps {
  // authToken: string | null;
  username: string | null;
  email: string | null;
  login: (username: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ children }) =>  {
  // const [authToken, setAuthToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null);
  console.log(email, username)

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
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ username, login, email }}>
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


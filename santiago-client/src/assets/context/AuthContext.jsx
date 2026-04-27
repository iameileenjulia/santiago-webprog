import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = { email, name: email.split('@')[0] };
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const signUp = (firstName, lastName, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && firstName && lastName) {
          const user = { email, name: `${firstName} ${lastName}` };
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          resolve(user);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 500);
    });
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
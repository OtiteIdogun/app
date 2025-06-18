import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('blog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    // Mock login - in real app this would call backend
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : email.includes('author') ? 'author' : 'reader',
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=6366f1&color=fff`,
      bio: 'Passionate writer and tech enthusiast.',
      joinedDate: new Date().toISOString(),
    };
    
    localStorage.setItem('blog_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    return mockUser;
  };

  const signup = async (userData) => {
    setIsLoading(true);
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'reader',
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=6366f1&color=fff`,
      joinedDate: new Date().toISOString(),
    };
    
    localStorage.setItem('blog_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('blog_user');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('blog_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAuthor: user?.role === 'author' || user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
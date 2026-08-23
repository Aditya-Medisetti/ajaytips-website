import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ajaytips_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ajaytips_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default demo student user for instant exploration
      const demoStudent = {
        _id: 'usr_student_1',
        name: 'Ajay Kumar',
        email: 'student@ajaytips.com',
        role: 'student',
        phone: '+91 9876543210',
        targetExams: ['SSC CGL', 'RRB NTPC', 'AP SI/PC'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        qualification: 'B.Tech Graduate'
      };
      setUser(demoStudent);
      setToken('demo_jwt_token_2026');
      localStorage.setItem('ajaytips_user', JSON.stringify(demoStudent));
      localStorage.setItem('ajaytips_token', 'demo_jwt_token_2026');
    }
    setLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('ajaytips_user', JSON.stringify(userData));
    localStorage.setItem('ajaytips_token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ajaytips_user');
    localStorage.removeItem('ajaytips_token');
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedFields };
      localStorage.setItem('ajaytips_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const switchRole = (newRole) => {
    updateUserProfile({ role: newRole });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUserProfile, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

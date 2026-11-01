import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../types';
import { authService } from '../../services/api';
import { translations, Language } from '../i18n/translations';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; phone?: string; role?: string }) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rakai_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('rakai_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('rakai_lang') as Language;
    return savedLang === 'ta' ? 'ta' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rakai_lang', lang);
  };

  const t = translations[language];

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('rakai_token');
      if (storedToken) {
        try {
          const freshUser = await authService.getMe();
          setUser(freshUser);
          localStorage.setItem('rakai_user', JSON.stringify(freshUser));
        } catch {
          // Token expired or invalid
          localStorage.removeItem('rakai_token');
          localStorage.removeItem('rakai_user');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await authService.login({ email, password });
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('rakai_token', res.access_token);
    localStorage.setItem('rakai_user', JSON.stringify(res.user));
    return res.user;
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string; role?: string }): Promise<User> => {
    const res = await authService.register(data);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('rakai_token', res.access_token);
    localStorage.setItem('rakai_user', JSON.stringify(res.user));
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('rakai_token');
    localStorage.removeItem('rakai_user');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const freshUser = await authService.getMe();
      setUser(freshUser);
      localStorage.setItem('rakai_user', JSON.stringify(freshUser));
    } catch (e) {
      console.warn('Failed to refresh user:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        language,
        setLanguage,
        t,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: NotificationType; show: boolean }>({
    message: '',
    type: 'info',
    show: false,
  });

  const showNotification = (message: string, type: NotificationType = 'info') => {
    setToast({ message, type, show: true });
  };

  const hideNotification = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideNotification} />
      )}
    </NotificationContext.Provider>
  );
} 
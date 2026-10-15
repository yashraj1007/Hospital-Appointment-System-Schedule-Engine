import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'appointment' | 'system' | 'message';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Rahul Sharma has been confirmed.',
    time: '5 mins ago',
    isRead: false,
    type: 'appointment'
  },
  {
    id: '2',
    title: 'System Update',
    message: 'We have updated our privacy policy. Please review it.',
    time: '2 hours ago',
    isRead: false,
    type: 'system'
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have a new message from the hospital administration.',
    time: '1 day ago',
    isRead: true,
    type: 'message'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addNotification = (n: Omit<Notification, 'id' | 'isRead'>) => {
    const newNotification: Notification = {
      ...n,
      id: Math.random().toString(36).substring(7),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

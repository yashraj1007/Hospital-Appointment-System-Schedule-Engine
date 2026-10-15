import React from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Check, Clock, Trash2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NotificationsPage({ role }: { role: 'patient' | 'doctor' | 'admin' }) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <PanelLayout role={role}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-dark">Notifications</h1>
            <p className="text-secondary-text">Stay updated with your latest activities and alerts.</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="btn-secondary px-6"
          >
            Mark All as Read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div 
                key={n.id}
                className={cn(
                  "card p-6 flex flex-col sm:flex-row gap-6 items-start transition-all hover:border-primary/30",
                  !n.isRead && "border-l-4 border-l-primary bg-primary/5"
                )}
              >
                <div className={cn(
                  "p-3 rounded-2xl shrink-0",
                  n.type === 'appointment' ? "bg-primary/10 text-primary" :
                  n.type === 'system' ? "bg-warning-orange/10 text-warning-orange" :
                  "bg-medical-cyan text-primary"
                )}>
                  <Bell className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn("text-lg font-bold", !n.isRead ? "text-dark" : "text-secondary-text")}>
                      {n.title}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {n.time}
                    </span>
                  </div>
                  <p className="text-secondary-text leading-relaxed">{n.message}</p>
                  {!n.isRead && (
                    <button 
                      onClick={() => markAsRead(n.id)}
                      className="text-xs font-black text-primary uppercase tracking-widest mt-2 flex items-center gap-1 hover:underline"
                    >
                      <Check className="w-3 h-3" /> Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="card p-20 text-center">
              <div className="w-20 h-20 bg-medical-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-dark mb-2">All caught up!</h2>
              <p className="text-secondary-text">You don't have any new notifications at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

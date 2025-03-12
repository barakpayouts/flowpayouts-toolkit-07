
import React from 'react';
import { Bell, BellDot, CheckCheck } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { notifications, setNotifications, companyName } = usePayoutWidget();
  
  const unreadCount = notifications?.filter(n => !n.read).length || 0;
  
  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const handleMarkAllAsRead = () => {
    if (notifications && setNotifications) {
      const updatedNotifications = notifications.map(n => ({
        ...n,
        read: true
      }));
      setNotifications(updatedNotifications);
    }
  };
  
  const handleMarkAsRead = (id: string) => {
    if (notifications && setNotifications) {
      const updatedNotifications = notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
    }
  };
  
  return (
    <div className="relative">
      <button 
        onClick={handleTogglePanel}
        className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <>
            <BellDot size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </>
        ) : (
          <Bell size={20} />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <button 
              onClick={handleMarkAllAsRead}
              className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"
            >
              <CheckCheck size={12} />
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications && notifications.length > 0 ? (
              <div className="divide-y divide-white/10">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 hover:bg-white/5 transition-colors cursor-pointer",
                      !notification.read && "bg-white/5"
                    )}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-xs text-white/70 mt-1">{notification.message}</p>
                    <div className="text-xs opacity-50 mt-2">{notification.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm opacity-60">
                No notifications
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-white/10 text-center">
            <button className="text-xs text-blue-400 hover:text-blue-300 w-full py-1">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;

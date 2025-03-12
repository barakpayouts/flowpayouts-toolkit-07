
import React, { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import CurrentMethodCard from './CurrentMethodCard';
import DashboardTabs from './DashboardTabs';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { Bell, X } from 'lucide-react';
import UploadInvoice from './UploadInvoice';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  date: string;
}

interface DashboardProps {
  onBack?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const { 
    handleBackStep, 
    showDashboard, 
    advanceType, 
    isInvoiceUploadOpen,
    setIsInvoiceUploadOpen,
    isInvoiceDetailOpen 
  } = usePayoutWidget();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      title: 'Welcome to the Dashboard',
      message: 'You can manage all your payment methods and transactions here.',
      type: 'info',
      read: false,
      date: new Date().toISOString()
    },
    {
      id: 'n2',
      title: 'New Team Features Available',
      message: 'You can now invite team members to help manage your payments.',
      type: 'success',
      read: false,
      date: new Date().toISOString()
    }
  ]);
  
  // Log when Dashboard renders to confirm it's being shown
  useEffect(() => {
    console.log("Dashboard component mounted, showDashboard:", showDashboard);
    if (advanceType) {
      console.log("Advance type:", advanceType);
    }
  }, [showDashboard, advanceType]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const handleCloseInvoiceUpload = () => {
    setIsInvoiceUploadOpen(false);
  };
  
  return (
    <div className="dashboard-container relative">
      {/* Notification Bell */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-payouts-accent text-payouts-dark rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        
        {/* Notification Panel */}
        {showNotifications && (
          <div className="absolute top-12 right-0 w-72 max-h-80 overflow-y-auto bg-payouts-primary border border-white/10 rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-white/10 flex justify-between items-center">
              <h4 className="font-medium text-white">Notifications</h4>
              {unreadCount > 0 && (
                <button 
                  className="text-xs underline opacity-70 hover:opacity-100 text-white"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm opacity-70 text-white">
                No notifications
              </div>
            ) : (
              <div>
                {notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-3 border-b border-white/10 last:border-0 ${notif.read ? 'opacity-70' : ''}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-sm font-medium text-white">{notif.title}</h5>
                      <button 
                        className="text-white/50 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs mb-1 text-white">{notif.message}</p>
                    <span className="text-xs opacity-50 text-white">
                      {new Date(notif.date).toLocaleDateString()} • {new Date(notif.date).toLocaleTimeString()}
                    </span>
                    {!notif.read && (
                      <span className="block mt-1 w-2 h-2 rounded-full bg-payouts-accent"></span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    
      <DashboardHeader />
      <CurrentMethodCard />
      <DashboardTabs />
      
      {onBack && (
        <button
          onClick={onBack || handleBackStep}
          className="mt-6 w-full py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm text-white"
        >
          Back
        </button>
      )}
      
      {/* Invoice Upload Dialog */}
      <UploadInvoice 
        isOpen={isInvoiceUploadOpen} 
        onClose={handleCloseInvoiceUpload} 
      />
    </div>
  );
};

export default Dashboard;

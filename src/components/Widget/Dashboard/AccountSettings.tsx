
import React, { useState } from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { toast } from "sonner";
import { Bell, Shield, LogOut, CreditCard, Mail } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const { handleLogout } = usePayoutWidget();
  
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    paymentUpdates: true,
    marketingEmails: false
  });
  
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast.success(`Notification preference updated`, {
      description: `${key} notifications ${notifications[key] ? 'disabled' : 'enabled'}`
    });
  };
  
  const toggleTwoFactor = () => {
    setSecurity(prev => ({
      ...prev,
      twoFactor: !prev.twoFactor
    }));
    
    if (!security.twoFactor) {
      toast.success(`Two-factor authentication enabled`, {
        description: `Your account is now more secure`
      });
    } else {
      toast.info(`Two-factor authentication disabled`, {
        description: `Consider enabling 2FA for better security`
      });
    }
  };
  
  const handleSessionTimeoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSecurity(prev => ({
      ...prev,
      sessionTimeout: e.target.value
    }));
    
    toast.success(`Session timeout updated`, {
      description: `Sessions will now timeout after ${e.target.value} minutes of inactivity`
    });
  };

  return (
    <div className="settings-container">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Account Settings</h3>
        <p className="text-sm opacity-70 mb-4">Manage your account preferences and security settings</p>
      </div>
      
      {/* Notification Settings */}
      <div className="settings-section mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bell size={18} />
          <h4 className="text-md font-medium">Notification Preferences</h4>
        </div>
        
        <div className="grid gap-3 ml-6">
          <div className="flex justify-between items-center">
            <label className="text-sm">Email Notifications</label>
            <button 
              onClick={() => toggleNotification('email')}
              className={`w-11 h-6 rounded-full relative ${notifications.email ? 'bg-payouts-accent' : 'bg-white/20'} transition-colors`}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-payouts-dark top-1 transition-all ${notifications.email ? 'right-1' : 'left-1'}`}></span>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <label className="text-sm">Browser Notifications</label>
            <button 
              onClick={() => toggleNotification('browser')}
              className={`w-11 h-6 rounded-full relative ${notifications.browser ? 'bg-payouts-accent' : 'bg-white/20'} transition-colors`}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-payouts-dark top-1 transition-all ${notifications.browser ? 'right-1' : 'left-1'}`}></span>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <label className="text-sm">Payment Updates</label>
            <button 
              onClick={() => toggleNotification('paymentUpdates')}
              className={`w-11 h-6 rounded-full relative ${notifications.paymentUpdates ? 'bg-payouts-accent' : 'bg-white/20'} transition-colors`}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-payouts-dark top-1 transition-all ${notifications.paymentUpdates ? 'right-1' : 'left-1'}`}></span>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <label className="text-sm">Marketing Emails</label>
            <button 
              onClick={() => toggleNotification('marketingEmails')}
              className={`w-11 h-6 rounded-full relative ${notifications.marketingEmails ? 'bg-payouts-accent' : 'bg-white/20'} transition-colors`}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-payouts-dark top-1 transition-all ${notifications.marketingEmails ? 'right-1' : 'left-1'}`}></span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Security Settings */}
      <div className="settings-section mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} />
          <h4 className="text-md font-medium">Security Settings</h4>
        </div>
        
        <div className="grid gap-3 ml-6">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-sm">Two-Factor Authentication</label>
              <p className="text-xs opacity-70">Enhance account security with 2FA</p>
            </div>
            <button 
              onClick={toggleTwoFactor}
              className={`w-11 h-6 rounded-full relative ${security.twoFactor ? 'bg-payouts-accent' : 'bg-white/20'} transition-colors`}
            >
              <span className={`absolute w-4 h-4 rounded-full bg-payouts-dark top-1 transition-all ${security.twoFactor ? 'right-1' : 'left-1'}`}></span>
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <label className="text-sm">Session Timeout</label>
              <p className="text-xs opacity-70">Auto-logout after inactivity</p>
            </div>
            <select 
              value={security.sessionTimeout} 
              onChange={handleSessionTimeoutChange}
              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Account Actions */}
      <div className="settings-section">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={18} />
          <h4 className="text-md font-medium">Account Actions</h4>
        </div>
        
        <div className="grid gap-3 ml-6">
          <button 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded text-sm"
            onClick={() => {
              toast.success("Email verification sent", {
                description: "Please check your inbox to verify your email address."
              });
            }}
          >
            <Mail size={16} />
            Verify Email Address
          </button>
          
          <button 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded text-sm"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

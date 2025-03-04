
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { sendTestEmail, generateWinningsEmail } from '@/utils/email';
import { toast } from 'sonner';
import { Mail, Loader2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface SendTestEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setWidgetKey: React.Dispatch<React.SetStateAction<number>>;
}

const SendTestEmailModal: React.FC<SendTestEmailModalProps> = ({ 
  open, 
  onOpenChange,
  setWidgetKey
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { config, updateConfig } = useWidgetConfig();

  const handleSendEmail = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Generate email content
      const { subject, html } = generateWinningsEmail(email);
      
      // Attempt to send the email (simulation in frontend environment)
      const result = await sendTestEmail({
        to: email,
        subject,
        html,
      });

      if (result.success) {
        // Enable payouts only mode for demo
        if (config.steps.length !== 0) {
          updateConfig({ steps: [] });
          setWidgetKey(prev => prev + 1);
        }
        
        setEmailSent(true);
        toast.success('Email simulation completed', {
          description: 'This is a frontend-only simulation. No actual email was sent.'
        });
      } else {
        throw new Error(result.note || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error in email process:', error);
      toast.error('Email simulation failed', {
        description: 'This frontend demo cannot send actual emails. You would need a backend service for that.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-payouts-dark text-white border border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Send Test Email</DialogTitle>
          <DialogDescription className="text-white/70">
            Simulate sending a tournament winning notification email
          </DialogDescription>
        </DialogHeader>
        
        {!emailSent ? (
          <>
            <div className="space-y-4 py-4">
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                <div className="flex items-center gap-2 p-2 bg-amber-500/20 rounded-lg mb-4 text-amber-200">
                  <AlertTriangle size={18} />
                  <p className="text-sm font-medium">
                    Frontend Email Limitation
                  </p>
                </div>
                
                <p className="text-sm text-white/80 mb-4">
                  <strong>Important:</strong> This demo cannot send actual emails from your browser due to CORS security restrictions. 
                  In a real application, email sending would be handled by a backend service.
                </p>
                
                <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded-lg text-blue-200">
                  <Info size={18} />
                  <p className="text-sm">
                    The API call to SendGrid will be simulated, and logs will appear in the console.
                  </p>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Recipient Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="dark" className="text-white">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                onClick={handleSendEmail}
                disabled={isLoading}
                style={{
                  background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
                }}
                className="text-payouts-dark font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Simulate Email
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="bg-payouts-accent/10 p-4 rounded-lg border border-payouts-accent/30 text-center">
              <div className="w-16 h-16 bg-payouts-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-payouts-accent" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Email Simulation Complete</h3>
              <p className="text-sm text-white/80 mb-2">
                An email to <strong>{email}</strong> has been simulated.
              </p>
              <div className="bg-black/20 p-3 rounded text-left my-3 text-xs font-mono">
                <p>⚠️ No actual email was sent due to browser limitations</p>
                <p>✅ Check browser console for email details</p>
              </div>
              <p className="text-sm text-white/80">
                The payout widget has been configured in "Payouts Only" mode.
              </p>
              <DialogClose asChild>
                <Button className="mt-4" variant="dark">Close</Button>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SendTestEmailModal;

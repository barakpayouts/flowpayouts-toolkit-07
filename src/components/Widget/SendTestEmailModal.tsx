
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { sendTestEmail, generateWinningsEmail } from '@/utils/email';
import { toast } from 'sonner';
import { Mail, Loader2 } from 'lucide-react';

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
      
      // Send the email
      const result = await sendTestEmail({
        to: email,
        subject,
        html,
      });

      if (result.success) {
        // Enable payouts only mode for demo
        if (!config.steps.length === 0) {
          updateConfig({ steps: [] });
          setWidgetKey(prev => prev + 1);
        }
        
        setEmailSent(true);
        toast.success('Test email sent successfully!', {
          description: `Email sent to ${email}`
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email', {
        description: 'Please try again later'
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
        </DialogHeader>
        
        {!emailSent ? (
          <>
            <div className="space-y-4 py-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-white/80 mb-4">
                  Send a test email that simulates a tournament winnings notification from Bowl.com. 
                  The recipient will receive an email with a button to claim their prize.
                </p>
                
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
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
              <h3 className="text-lg font-medium text-white mb-2">Email Sent Successfully!</h3>
              <p className="text-sm text-white/80 mb-4">
                A test email has been sent to {email}. The payout widget has been configured in "Payouts Only" mode.
              </p>
              <DialogClose asChild>
                <Button className="mt-2" variant="dark">Close</Button>
              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SendTestEmailModal;

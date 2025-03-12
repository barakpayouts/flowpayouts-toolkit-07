
import React, { useState } from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, UserPlus, X, Mail, Check, Shield, Eye } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Pending' | 'Declined';
  dateAdded: string;
}

const TeamMembers: React.FC = () => {
  const { companyName } = usePayoutWidget();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Member' | 'Viewer'>('Member');

  // Example team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      email: 'current-user@example.com',
      name: 'Current User',
      role: 'Admin',
      status: 'Active',
      dateAdded: '2023-12-01'
    }
  ]);

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }

    // Add new team member with pending status
    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: inviteEmail,
      name: inviteEmail.split('@')[0],
      role: selectedRole,
      status: 'Pending',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsInviteOpen(false);
    setInviteEmail('');
    setSelectedRole('Member');

    toast.success("Invitation sent", {
      description: `Invitation email sent to ${inviteEmail}`
    });
  };

  const handleRemoveMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    
    toast.success("Team member removed", {
      description: "The team member has been removed from your account."
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield size={14} className="mr-1" />;
      case 'Member': return <UserPlus size={14} className="mr-1" />;
      case 'Viewer': return <Eye size={14} className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="team-members-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Team Members</h3>
        <button 
          onClick={() => setIsInviteOpen(true)} 
          className="flex items-center text-sm bg-payouts-accent text-payouts-dark px-3 py-1.5 rounded hover:bg-payouts-accent-light transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Invite
        </button>
      </div>

      <div className="mb-3 p-3 rounded-lg border border-white/10 bg-white/5">
        <p className="text-sm opacity-70">Invite team members to help manage payments for {companyName || 'your company'}</p>
      </div>

      <div className="rounded-lg border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-3 text-xs font-medium bg-white/5 border-b border-white/10">
          <div className="col-span-5">User</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-1"></div>
        </div>

        {teamMembers.map(member => (
          <div key={member.id} className="grid grid-cols-12 gap-2 p-3 border-b border-white/10 last:border-0 text-sm items-center">
            <div className="col-span-5">
              <div className="font-medium">{member.name}</div>
              <div className="text-xs opacity-70">{member.email}</div>
            </div>
            <div className="col-span-3 flex items-center">
              {getRoleIcon(member.role)}
              {member.role}
            </div>
            <div className="col-span-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                member.status === 'Active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : member.status === 'Pending' 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}>
                {member.status === 'Active' && <Check size={12} className="mr-1" />}
                {member.status}
              </span>
            </div>
            <div className="col-span-1 text-right">
              {member.role !== 'Admin' && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-white/50 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="widget-dialog-content sm:max-w-md bg-payouts-primary border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Invite Team Member</DialogTitle>
            <DialogDescription className="text-white/80">
              Add a new member to your payment team. They'll receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <div className="flex items-center border rounded-md border-white/20 bg-white/5 px-3 py-2">
                <Mail className="mr-2 h-4 w-4 text-white opacity-70" />
                <input
                  type="email"
                  id="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none text-white"
                  placeholder="colleague@company.com"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-white">Role</label>
              <div className="flex flex-wrap gap-2">
                {(['Admin', 'Member', 'Viewer'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1.5 rounded text-sm font-medium ${
                      selectedRole === role
                        ? 'bg-payouts-accent text-payouts-dark'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {getRoleIcon(role)}
                    {role}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/70 mt-1">
                {selectedRole === 'Admin' && 'Can manage all settings and invite others'}
                {selectedRole === 'Member' && 'Can create and manage payments'}
                {selectedRole === 'Viewer' && 'Can only view payment information'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <button 
              onClick={() => setIsInviteOpen(false)}
              className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              className="ml-2 px-4 py-2 rounded bg-payouts-accent text-payouts-dark hover:bg-payouts-accent-light"
            >
              Send Invitation
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMembers;

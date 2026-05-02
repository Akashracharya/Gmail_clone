export type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  timestamp: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'spam';
};

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Google Security',
    subject: 'Security alert',
    snippet: 'A new sign-in on Mac was detected from your account.',
    timestamp: '10:39 AM',
    isRead: false,
    folder: 'inbox',
  },
  {
    id: '2',
    sender: 'GitHub',
    subject: '[GitHub] Please verify your device',
    snippet: 'Hey there, we need to verify your new device logging in from Bengaluru.',
    timestamp: '09:15 AM',
    isRead: true,
    folder: 'inbox',
  },
  {
    id: '3',
    sender: 'Me',
    subject: 'Project Proposal 2026',
    snippet: 'Attached is the final draft of the Q3 project proposal. Let me know what you think.',
    timestamp: 'Yesterday',
    isRead: true,
    folder: 'sent',
  },
  {
    id: '4',
    sender: 'Nigerian Prince',
    subject: 'URGENT: Claim your inheritance',
    snippet: 'You have been selected to receive $10,000,000 USD. Please reply with your bank details.',
    timestamp: 'May 1',
    isRead: false,
    folder: 'spam',
  },
  {
    id: '5',
    sender: 'Vercel',
    subject: 'Deployment successful',
    snippet: 'Your production deployment for gmail-clone has completed successfully.',
    timestamp: 'May 1',
    isRead: false,
    folder: 'inbox',
  }
];
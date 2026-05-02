"use client";
import React, { createContext, useContext, useState } from 'react';

export type Email = {
  id: string;
  sender: string;
  senderEmail?: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  folder: string;
  avatarColor: string;
  attachment?: string;
};

const mockEmails: Email[] = [
  // --- ORIGINAL EMAILS (Now with full bodies) ---
  { 
    id: 'orig_1', sender: 'Google Security', subject: 'Security alert', snippet: 'A new sign-in on Mac was detected.', 
    body: 'Hi Akash,\n\nWe detected a new sign-in to your Google Account from a Mac device in Bengaluru, Karnataka. If this was you, you can ignore this email.\n\nIf you don\'t recognize this activity, please secure your account immediately.\n\nThe Google Security Team', 
    timestamp: '10:39 AM', isRead: false, folder: 'primary', avatarColor: 'bg-[#DB4437]' 
  },
  { 
    id: 'orig_2', sender: 'GitHub', subject: '[GitHub] Please verify your device', snippet: 'Hey there, we need to verify your new device.', 
    body: 'Hey there,\n\nWe recently detected a login attempt from a new device or location. To verify your identity, please enter the following code on the GitHub login page:\n\n847291\n\nThanks,\nThe GitHub Team', 
    timestamp: '09:15 AM', isRead: true, folder: 'primary', avatarColor: 'bg-[#333333]' 
  },
  { 
    id: 'orig_3', sender: 'Me', subject: 'Project Proposal 2026', snippet: 'Attached is the final draft of the Q3 project proposal.', 
    body: 'Team,\n\nAttached is the final draft of the Q3 project proposal. I\'ve incorporated all the feedback from last week\'s sync. Let me know what you think before we present it to the stakeholders.\n\nBest,\nAkash', 
    timestamp: 'Yesterday', isRead: true, folder: 'sent', avatarColor: 'bg-blue-600' 
  },
  { 
    id: 'orig_4', sender: 'System', subject: 'URGENT: Storage Full', snippet: 'Your Google Drive is out of storage space.', 
    body: 'Your Google Account storage is 100% full.\n\nYou can no longer send or receive emails, and you cannot back up photos or files. Upgrade your Google One plan today to restore service.\n\n- Google One Team', 
    timestamp: 'May 1', isRead: false, folder: 'spam', avatarColor: 'bg-[#F4B400]' 
  },
  

  // --- SCREENSHOT EMAILS ---
  { 
    id: '1', sender: 'Recraft', subject: 'Your Recraft account will be deleted...', snippet: 'Recraft Hi, Your Recraft acc...', 
    body: 'Hi Akash,\n\nYour Recraft account has been flagged for deletion due to prolonged inactivity. If you wish to keep your account and your generated assets, please log in within the next 7 days.\n\nBest,\nThe Recraft Team', 
    timestamp: 'May 1', isRead: false, folder: 'primary', avatarColor: 'bg-[#5F6368]' 
  },
  { 
    id: '2', sender: 'canarabank 3', subject: 'ATM/IMPS/UPI Transaction Alert', snippet: 'Dear Customer, Thanking you for ban...', 
    body: 'Dear Customer,\n\nThanking you for banking with Canara Bank. Your account ending in XXXX has been debited by INR 500.00 towards an IMPS/UPI transaction on 01-May-2026.\n\nIf this was not you, please contact your branch immediately.', 
    timestamp: 'May 1', isRead: false, folder: 'primary', avatarColor: 'bg-[#00897B]' 
  },
  { 
    id: '3', sender: 'Instamart', subject: 'How else will we know, Akashh? 🥺', snippet: 'Tell us if you 💗 us (or not)', 
    body: 'Hi Akashh,\n\nYour recent Instamart order was delivered! How did we do? We are constantly trying to improve our lightning-fast deliveries and fresh produce.\n\nTap here to leave a quick rating. Tell us if you 💗 us (or not)!\n\nStay fresh,\nSwiggy Instamart', 
    timestamp: 'Apr 30', isRead: false, folder: 'primary', avatarColor: 'bg-[#00ACC1]' 
  },
  { 
    id: '4', sender: 'Dr.Shreenath Acharya ICB...', subject: 'New announcement: "Dear student...', snippet: 'Notification settings VI Sem ICB - Clo...', 
    body: 'Dear students,\n\nPlease note the upcoming changes to the submission guidelines for your final project. All documentation must be submitted via Google Classroom by EOD Friday.\n\nRegards,\nDr. Shreenath Acharya', 
    timestamp: 'Apr 30', isRead: false, folder: 'primary', avatarColor: 'bg-[#43A047]' 
  },
  { 
    id: '5', sender: 'canarabank 2', subject: 'ATM/IMPS/UPI Transaction Alert', snippet: 'Dear Customer, Thanking you for ban...', 
    body: 'Dear Customer,\n\nThanking you for banking with Canara Bank. Your account ending in XXXX has been credited with INR 2,000.00 via UPI transaction on 30-Apr-2026.', 
    timestamp: 'Apr 30', isRead: false, folder: 'primary', avatarColor: 'bg-[#00897B]' 
  },
  { 
    id: '6', sender: 'SBI Rewardz', subject: 'E-statement: You have 100 Points wor...', snippet: 'To ensure that you receive our update...', 
    body: 'Dear SBI Customer,\n\nYou have successfully earned 100 Reward Points this month! Your total point balance is now ready for redemption.\n\nLog in to the YONO app or SBI Rewardz portal to claim gift cards, mobile recharges, and more.', 
    timestamp: 'Apr 29', isRead: true, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: '7', sender: 'Rohit G Shet (via Google Drive)', subject: 'Folder shared with you: \'FASHION WA...', snippet: 'Rohit G Shet shared a folder Rohit G S...', 
    body: 'Rohit G Shet has invited you to view a shared folder.\n\nFolder Name: FASHION WARDROBE ASSETS\n\nClick the link below to open it in Google Drive.', 
    timestamp: 'Apr 29', isRead: true, folder: 'primary', avatarColor: 'bg-[#E91E63]' 
  },
  { 
    id: '8', sender: 'KuCoin', subject: 'Your Futures Trial Funds Have Expir...', snippet: 'Your Futures Trial Funds Have Expired...', 
    body: 'Dear KuCoin User,\n\nNotice: Your recent Futures Trial Funds have expired as they were not utilized within the designated timeframe. Keep an eye on our promotions hub for more upcoming bonuses!\n\nHappy Trading,\nThe KuCoin Team', 
    timestamp: 'Apr 29', isRead: true, folder: 'primary', avatarColor: 'bg-[#EF5350]' 
  },
  { 
    id: '9', sender: 'Google One', subject: 'speedrunning this essay w/ gemini ...', snippet: 'research faster, write better and craft...', 
    body: 'Writing an essay? Let Gemini Advanced do the heavy lifting.\n\nResearch faster, write better, and craft the perfect arguments. With your Google One subscription, you have access to our most capable AI models directly in Google Docs and Gmail.', 
    timestamp: 'Apr 28', isRead: false, folder: 'primary', avatarColor: 'bg-[#7CB342]' 
  },
  { 
    id: '10', sender: 'Zack D. Films', subject: 'Too boring for Youtube...', snippet: 'Didn\'t love how this one turned out vis...', 
    body: 'Hey everyone,\n\nI didn\'t love how this latest video turned out visually, so I decided not to post it publicly on the main channel. But I wanted to share it with my newsletter subscribers anyway. Let me know what you think of the concept!', 
    timestamp: 'Apr 27', isRead: false, folder: 'primary', avatarColor: 'bg-[#5F6368]' 
  },
  { 
    id: '11', sender: 'SBI', subject: 'Bank Smarter with the New Yono N...', snippet: 'For any assistance or feedback: Call -...', 
    body: 'Experience the all-new Yono App!\n\nBank smarter, invest better, and shop with exclusive discounts. Update your app today to experience the fresh UI and faster transactions.', 
    timestamp: 'Apr 27', isRead: false, folder: 'primary', avatarColor: 'bg-[#1976D2]' 
  },
  { 
    id: 'simplilearn_1', 
    sender: 'Simplilearn',
    senderEmail: 'no-reply@simplilearn.training', 
    subject: 'Congratulations! You have unlocked your certificate.', 
    snippet: 'Hi Akash Acharya,Congrats! You have successfully completed your VLSI Course', 
    body: 'Hi Akash Acharya,Congrats! You have successfully completed your VLSI Course\n\n---\n\nFrom: Simplilearn • no-reply@simplilearn.training\nTo: akaashracharya@gmail.com\nDate: Apr 27, 2026, 9:43 AM\nSecurity: Standard encryption (TLS).', 
    timestamp: 'Apr 27', 
    isRead: true, 
    folder: 'primary', 
    avatarColor: 'bg-[#5F6368]' 
  },
  { 
    id: '13', sender: 'Swiggy', subject: 'Your Swiggy order was delivered supe...', snippet: 'Delivery in 27 mins! ₹186 saved on this...', 
    body: 'Hi Akash,\n\nYour Swiggy order was delivered super fast! \n\nDelivery in: 27 mins\nTotal Savings: ₹186\n\nPlease find your tax invoice attached below.', 
    timestamp: 'Apr 27', isRead: true, folder: 'primary', avatarColor: 'bg-[#5F6368]', attachment: 'taco/236198380...' 
  },
  { 
    id: '14', sender: 'OLX', subject: 'Detected login into your account', snippet: 'Hello Akash, We detected a login to yo...', 
    body: 'Hello Akash,\n\nWe detected a login to your OLX account from a new Android device in Bengaluru. If this was you, no further action is required. If you do not recognize this activity, please reset your password immediately.', 
    timestamp: 'Apr 25', isRead: false, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: '15', sender: 'cbsalerts.sbi', subject: 'CBSSBI ALERT', snippet: 'भारतीय स्टेट बैंक की ओर से शुभकामनाएं ! Gre...', 
    body: 'भारतीय स्टेट बैंक की ओर से शुभकामनाएं!\n\nGreetings from State Bank of India! This is an alert regarding a recent update to your account terms. Please visit our website for more details.', 
    timestamp: 'Apr 25', isRead: true, folder: 'primary', avatarColor: 'bg-[#F57C00]' 
  },
  { 
    id: '16', sender: 'noreply', subject: 'Your Instamart order was successfully...', snippet: 'Greetings from Instamart👋 Your Inst...', 
    body: 'Greetings from Instamart 👋\n\nYour Instamart order has been successfully placed and delivered. We hope you enjoy your groceries! Your digital receipt is attached.', 
    timestamp: 'Apr 24', isRead: true, folder: 'primary', avatarColor: 'bg-[#5F6368]', attachment: 'taco/236019264...' 
  },
  { 
    id: '17', sender: 'Mrs.Jamuna ICB (Classroom)', subject: 'New material: "IA-2 Question bank"', snippet: 'Notification settings 6th CSE-ICB-MC...', 
    body: 'Mrs. Jamuna has posted a new material in 6th CSE-ICB.\n\nMaterial: "IA-2 Question bank"\n\nPlease review these questions carefully ahead of your internal assessments next week.', 
    timestamp: 'Apr 24', isRead: false, folder: 'primary', avatarColor: 'bg-[#00BFA5]' 
  },
  { 
    id: '18', sender: 'JanSuraksha', subject: 'JanSuraksha - Scheme Opt Out', snippet: 'Dear Sir/Madam, You have successfull...', 
    body: 'Dear Sir/Madam,\n\nYou have successfully opted out of the JanSuraksha auto-renewal scheme. No further premium deductions will be made from your linked bank account.', 
    timestamp: 'Apr 23', isRead: true, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: '19', sender: 'yonobysbi', subject: 'YONO 2.0 Notification', snippet: 'Dear Akash Acharya, You have entere...', 
    body: 'Dear Akash Acharya,\n\nYou have entered the requested OTP for your YONO 2.0 login. Never share your OTP or MPIN with anyone.', 
    timestamp: 'Apr 23', isRead: false, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: '20', sender: 'Dr.Sruthi Dinesh ECE (Class...', subject: 'New announcement: "Question ban...', snippet: 'Notification settings BEC654A ICB Ne...', 
    body: 'Dr. Sruthi Dinesh has posted a new announcement.\n\n"Question bank for the upcoming modules has been uploaded. Please solve the numericals before Monday\'s lecture."\n\nOpen Google Classroom to view.', 
    timestamp: 'Apr 23', isRead: false, folder: 'primary', avatarColor: 'bg-[#00E676]' 
  },
  // --- MARCH SCREENSHOT EMAILS ---
  { 
    id: 'mar_1', sender: 'SBI Rewardz', subject: 'E-statement: You have 100 Points wor...', snippet: 'To ensure that you receive our update...', 
    body: 'Dear Customer,\n\nYour monthly E-statement is ready. You currently have 100 Reward Points worth ₹25. To ensure that you receive our updates, please whitelist this email address.\n\nSBI Rewardz Team', 
    timestamp: 'Mar 28', isRead: true, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: 'mar_2', sender: 'KuCoin', subject: 'Coupon Pack received!', snippet: 'Coupon Pack received! Dear KuCoin u...', 
    body: 'Coupon Pack received!\n\nDear KuCoin user, a new trading bot coupon pack has been added to your account. Claim it before it expires in 7 days.', 
    timestamp: 'Mar 28', isRead: false, folder: 'primary', avatarColor: 'bg-[#EF5350]' 
  },
  { 
    id: 'mar_3', sender: 'CampusLife', subject: 'akaashracharya@gmail.com : OTP -...', snippet: '763069 is your One Time Password (O...', 
    body: 'Hello,\n\n763069 is your One Time Password (OTP) for account verification. Please do not share this code with anyone.\n\nRegards,\nCampusLife Portal', 
    timestamp: 'Mar 26', isRead: false, folder: 'primary', avatarColor: 'bg-[#757575]' 
  },
  { 
    id: 'mar_4', sender: 'Chess.com', subject: 'Updates to Chess.com Policies', snippet: 'Review a summary of what\'s changing...', 
    body: 'Hi Chess Player,\n\nWe are updating our Terms of Service and Fair Play Policy. Review a summary of what\'s changing on our official blog. These changes will take effect next month.', 
    timestamp: 'Mar 26', isRead: false, folder: 'primary', avatarColor: 'bg-[#43A047]' 
  },
  { 
    id: 'mar_5', sender: 'GitHub', subject: 'Important Update to GitHub Copilo...', snippet: 'GitHub GitHub Hi there, We\'...', 
    body: 'Hi there,\n\nWe\'re writing to let you know about an important update to GitHub Copilot. We are introducing new features to help you code faster and more securely. Check out the release notes!', 
    timestamp: 'Mar 26', isRead: false, folder: 'primary', avatarColor: 'bg-[#333333]' 
  },
  { 
    id: 'mar_6', sender: 'YouTube', subject: 'Thanks for your report to YouTube', snippet: 'Hello Akash, Thank you for your video...', 
    body: 'Hello Akash,\n\nThank you for your video report. We rely on community members like you to help keep YouTube safe. We will review the content and take appropriate action based on our Community Guidelines.', 
    timestamp: 'Mar 25', isRead: false, folder: 'primary', avatarColor: 'bg-[#DB4437]' 
  },
  { 
    id: 'mar_7', sender: 'KuCoin', subject: 'KuCoin Live: Invitation to Start You...', snippet: 'KuCoin Live: Invitation to Start Your Fir...', 
    body: 'KuCoin Live: Invitation to Start Your First Stream!\n\nWe are excited to invite you to become a creator on KuCoin Live. Share your crypto insights and earn rewards.', 
    timestamp: 'Mar 24', isRead: false, folder: 'primary', avatarColor: 'bg-[#00BCD4]' 
  },
  { 
    id: 'mar_8', sender: 'Team Unstop', subject: '₹12.5 LPA PPO + Reward...', snippet: 'Apply Now!', 
    body: 'Hey there,\n\nDon\'t miss this opportunity! Compete in the latest hackathon to win a ₹12.5 LPA PPO + Rewards. Apply Now before registrations close!\n\nTeam Unstop', 
    timestamp: 'Mar 24', isRead: false, folder: 'primary', avatarColor: 'bg-[#00BFA5]' 
  },
  { 
    id: 'mar_9', sender: 'Google Cloud', subject: '[Produc...] Automatic enablement of n...', snippet: 'We\'re enabling a new OTLP ingestion...', 
    body: 'Product Update:\n\nWe\'re enabling a new OTLP ingestion pipeline for your Google Cloud projects. Please see the attached documentation for migration steps.', 
    timestamp: 'Mar 18', isRead: false, folder: 'primary', avatarColor: 'bg-[#9C27B0]', attachment: 'fb75271d-21bd-1...' 
  },
  { 
    id: 'mar_10', sender: 'Dr.Sruthi Dinesh ECE (Class...', subject: 'New announcement: "Answer sche...', snippet: 'Notification settings BEC654A ICB Ne...', 
    body: 'Dr. Sruthi Dinesh has posted a new announcement.\n\n"Answer scheme for the previous assignment is now live. Please review your mistakes."\n\nOpen Google Classroom to view.', 
    timestamp: 'Mar 17', isRead: false, folder: 'primary', avatarColor: 'bg-[#00E676]' 
  },
  { 
    id: 'mar_11', sender: 'canarabank', subject: 'ATM/IMPS/UPI Transaction Alert', snippet: 'Dear Customer, Thanking you for ban...', 
    body: 'Dear Customer,\n\nThanking you for banking with Canara Bank. Your account was debited by INR 150.00 for a UPI transaction on 15-Mar-2026.', 
    timestamp: 'Mar 15', isRead: false, folder: 'primary', avatarColor: 'bg-[#00897B]' 
  },
  { 
    id: 'mar_12', sender: 'Dr.Rahul Ponneth ICB (Clas...', subject: 'New announcement: "textbook"', snippet: 'Notification settings Cryptography an...', 
    body: 'Dr. Rahul Ponneth has posted a new announcement.\n\n"textbook chapter 4 needs to be completed before tomorrow\'s session."\n\nOpen Google Classroom to view.', 
    timestamp: 'Mar 13', isRead: false, folder: 'primary', avatarColor: 'bg-[#00E676]' 
  },
  { 
    id: 'mar_13', sender: 'Dr.Rahul Ponneth ICB (Clas...', subject: 'New announcement: "chk the topics"', snippet: 'Notification settings Cryptography an...', 
    body: 'Dr. Rahul Ponneth has posted a new announcement.\n\n"chk the topics uploaded in the drive link for your upcoming internals."\n\nOpen Google Classroom to view.', 
    timestamp: 'Mar 13', isRead: false, folder: 'primary', avatarColor: 'bg-[#00E676]' 
  },
  { 
    id: 'mar_14', sender: 'NPTEL', subject: 'NPTEL Newsletter: IIT Madras BS D...', snippet: 'Thanks and Regards, NPTEL TEAM. --...', 
    body: 'Welcome to the NPTEL Newsletter!\n\nCheck out the latest updates on the IIT Madras BS Degree program and upcoming certification exams.\n\nThanks and Regards,\nNPTEL TEAM.', 
    timestamp: 'Mar 12', isRead: false, folder: 'primary', avatarColor: 'bg-[#E53935]' 
  },
  { 
    id: 'mar_15', sender: 'Infosys Springboard', subject: 'Reminder: AA Edutech Content Exp...', snippet: 'If you are having trouble reading this...', 
    body: 'Reminder:\n\nYour AA Edutech Content access on Infosys Springboard is expiring soon. Please complete your pending modules.\n\nIf you are having trouble reading this email, please view it in your browser.', 
    timestamp: 'Mar 10', isRead: false, folder: 'primary', avatarColor: 'bg-[#1E88E5]' 
  },
  { 
    id: 'mar_16', sender: 'YouTube', subject: 'Your YouTube Premium family me...', snippet: 'View order Delivered', 
    body: 'Hello Akash,\n\nYour YouTube Premium family membership has been successfully renewed. Thank you for subscribing!\n\nView order for more details.', 
    timestamp: 'Mar 9', isRead: false, folder: 'primary', avatarColor: 'bg-[#8BC34A]' 
  }
  
];

interface EmailContextType {
  emails: Email[];
  sendEmail: (to: string, subject: string, body: string) => void;
  deleteEmail: (id: string) => void;
  archiveEmail: (id: string) => void;
  markAsRead: (id: string) => void;
  toggleReadStatus: (id: string) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [emails, setEmails] = useState<Email[]>(mockEmails);

  const sendEmail = (to: string, subject: string, body: string) => {
    const newEmail: Email = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'Akash Acharya',
      subject: subject || '(No subject)',
      snippet: body.substring(0, 40) + '...',
      body: body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      folder: 'sent',
      avatarColor: 'bg-blue-600',
    };
    setEmails((prev) => [newEmail, ...prev]);
  };

  const deleteEmail = (id: string) => setEmails((prev) => prev.filter((e) => e.id !== id));
  const archiveEmail = (id: string) => setEmails((prev) => prev.filter((e) => e.id !== id));
  const markAsRead = (id: string) => setEmails((prev) => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
  const toggleReadStatus = (id: string) => setEmails((prev) => prev.map(e => e.id === id ? { ...e, isRead: !e.isRead } : e));

  return (
    <EmailContext.Provider value={{ emails, sendEmail, deleteEmail, archiveEmail, markAsRead, toggleReadStatus }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmails() {
  const context = useContext(EmailContext);
  if (!context) throw new Error('useEmails must be used within an EmailProvider');
  return context;
}
"use client";
import React, { createContext, useContext, useState } from 'react';
import { mockEmails, Email } from '@/data/mock';

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
      sender: 'Me',
      subject: subject || '(No subject)',
      snippet: body || '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      folder: 'sent',
    };
    setEmails((prev) => [newEmail, ...prev]);
  };

  const deleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
  };

  const archiveEmail = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
  };

  const markAsRead = (id: string) => {
    setEmails((prev) => prev.map(e => e.id === id ? { ...e, isRead: true } : e));
  };

  const toggleReadStatus = (id: string) => {
    setEmails((prev) => prev.map(e => e.id === id ? { ...e, isRead: !e.isRead } : e));
  };

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
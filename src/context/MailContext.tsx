"use client";
import React, { createContext, useContext, useState } from 'react';
import ComposeModal from '@/components/ComposeModal';

interface MailContextType {
  openCompose: () => void;
  closeCompose: () => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <MailContext.Provider value={{
      openCompose: () => setIsComposeOpen(true),
      closeCompose: () => setIsComposeOpen(false)
    }}>
      {children}
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
    </MailContext.Provider>
  );
}

export function useMail() {
  const context = useContext(MailContext);
  if (!context) throw new Error('useMail must be used within a MailProvider');
  return context;
}
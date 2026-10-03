"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface ConsultationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  return (
    <ConsultationModalContext.Provider value={value}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (!context) {
    throw new Error("useConsultationModal must be used within a ConsultationModalProvider");
  }
  return context;
}

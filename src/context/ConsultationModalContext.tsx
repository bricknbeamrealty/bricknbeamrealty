"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface PropertyModalContext {
  id?: string;
  title: string;
  developer?: string;
  location?: string;
  subLocation?: string;
  pricing?: string;
  bhks?: string[];
  image?: string;
  possession?: string;
  rera?: string;
  status?: string;
}

interface ConsultationModalContextType {
  isOpen: boolean;
  projectData: PropertyModalContext | null;
  openModal: (projectOrEvent?: PropertyModalContext | unknown) => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectData, setProjectData] = useState<PropertyModalContext | null>(null);

  const openModal = useCallback((projectOrEvent?: PropertyModalContext | unknown) => {
    if (
      projectOrEvent &&
      typeof projectOrEvent === "object" &&
      "title" in projectOrEvent &&
      typeof (projectOrEvent as PropertyModalContext).title === "string"
    ) {
      setProjectData(projectOrEvent as PropertyModalContext);
    } else {
      setProjectData(null);
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      projectData,
      openModal,
      closeModal,
    }),
    [isOpen, projectData, openModal, closeModal]
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

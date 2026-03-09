import React, { createContext, useContext } from "react";
import {
  ServicesContainer,
  createServicesContainer,
} from "../services/servicesContainer";

const ServicesContext = createContext<ServicesContainer | undefined>(undefined);

export const useServices = (): ServicesContainer => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    return createServicesContainer();
  }
  return context;
};

export function ServicesProvider({
  children,
  container,
}: {
  children: React.ReactNode;
  container: ServicesContainer;
}) {
  return (
    <ServicesContext.Provider value={container}>
      {children}
    </ServicesContext.Provider>
  );
}

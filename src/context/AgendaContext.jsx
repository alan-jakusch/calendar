import React, { createContext, useContext } from "react";

import useAgenda from "../hooks/UseAgenda";

const AgendaContext = createContext();

export const AgendaProvider = ({ children }) => {
  const agenda = useAgenda();

  return (
    <AgendaContext.Provider value={agenda}>{children}</AgendaContext.Provider>
  );
};

export const useAgendaContext = () => {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error("useAgendaContext must be used within an AgendaProvider");
  }
  return context;
};

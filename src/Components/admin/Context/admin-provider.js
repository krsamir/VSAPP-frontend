import React, { useState, useMemo } from "react";
import { AdminContext } from "./admin-context";

export const AdminProvider = ({ children = null }) => {
  const defaultState = {};

  const [providerState, setProviderState] = useState(defaultState);

  const providerValue = useMemo(
    () => ({ providerState, setProviderState }),
    [providerState]
  );
  return (
    <AdminContext.Provider value={providerValue}>
      {children}
    </AdminContext.Provider>
  );
};

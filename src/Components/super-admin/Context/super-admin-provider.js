import React, { useState, useMemo } from "react";

import { SuperAdminContext } from "./super-admin-context";

export const SuperAdminProvider = ({ children = null }) => {
  const setTenantData = (data = {}) => {
    setProviderState((prevState) => ({
      ...prevState,
      tenantData: data,
    }));
  };

  const setModalState = (modalState = false) => {
    setProviderState((prevState) => ({
      ...prevState,
      open: modalState,
    }));
  };

  const defaultState = {
    tenantData: {},
    open: false,
    setTenantData,
    setModalState,
  };
  const [providerState, setProviderState] = useState(defaultState);

  const providerValue = useMemo(
    () => ({ providerState, setProviderState }),
    [providerState]
  );

  return (
    <SuperAdminContext.Provider value={providerValue}>
      {children}
    </SuperAdminContext.Provider>
  );
};

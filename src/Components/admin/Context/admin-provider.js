import React, { useState, useMemo } from "react";
import { AdminContext } from "./admin-context";

export const AdminProvider = ({ children = null }) => {
  const setUserData = (data = null) => {
    setProviderState((prevState) => ({
      ...prevState,
      userData: data,
    }));
  };

  const setModalState = (modalState = false) => {
    setProviderState((prevState) => ({
      ...prevState,
      modalState,
    }));
  };

  const defaultState = {
    modalState: false,
    userData: null,
    setModalState,
    setUserData,
  };

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

import React from "react";
import { useStoreState } from "easy-peasy";
import { useGetTenants } from "../Hooks/useTenants";
// import Styled from "styled-components";
function Tenants() {
  const { tenants } = useStoreState((state) => state.tenant);
  // console.log(tenants);
  const { isLoading } = useGetTenants();
  // console.log(isLoading);
  return <>Tenants</>;
}

export default Tenants;

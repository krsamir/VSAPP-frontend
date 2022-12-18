import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import { useStoreActions } from "easy-peasy";
import { toast } from "react-hot-toast";

export const useGetTenants = () => {
  const { fetchTenantsList } = useStoreActions((store) => store.tenant);
  const { isLoading } = useQuery(QUERY_KEYS.GET_TENANTS, fetchTenantsList, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while fetching Tenants List.`);
    },
  });
  return useMemo(
    () => ({
      isLoading,
    }),
    [isLoading]
  );
};

export const useCreateTenants = () => {
  const { createTenants } = useStoreActions((store) => store.tenant);
  const { mutate: createTenant } = useMutation(createTenants, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while creating Tenants.`);
    },
  });
  return useMemo(() => ({ createTenant }), [createTenant]);
};

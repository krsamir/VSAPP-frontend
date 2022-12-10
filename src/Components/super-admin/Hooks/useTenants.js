import { useMemo } from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import { useStoreActions } from "easy-peasy";
import { toast } from "react-hot-toast";

export const useGetTenants = () => {
  const { fetchTenantsList } = useStoreActions((store) => store.tenant);
  const { isLoading } = useQuery(QUERY_KEYS.GET_TENANTS, fetchTenantsList, {
    onSuccess(data) {
      if (data) {
        data?.status !== 1 && toast.error(data?.message);
      }
    },
    onError(e) {
      if (e?.response) {
        toast.error("Issue while fetching tenants.");
      }
    },
  });
  return useMemo(
    () => ({
      isLoading,
    }),
    [isLoading]
  );
};

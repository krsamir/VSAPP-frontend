import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../../../Utilities/query-keys";
import { useStoreActions } from "easy-peasy";
import { toast } from "react-hot-toast";

export const useGetUsers = () => {
  const { fetchUserListThunk } = useStoreActions((store) => store.users);
  const { isLoading } = useQuery(QUERY_KEYS.GET_USERS, fetchUserListThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while fetching User List.`);
    },
  });
  return useMemo(
    () => ({
      isLoading,
    }),
    [isLoading]
  );
};

export const useCreateUser = () => {
  const { createUserThunk } = useStoreActions((store) => store.users);
  const { mutate: createUser } = useMutation(createUserThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while creating Users.`);
    },
  });
  return useMemo(() => ({ createUser }), [createUser]);
};

export const usePatchUser = () => {
  const { updateUserThunk } = useStoreActions((store) => store.users);
  const { mutate: updateUserData } = useMutation(updateUserThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while updating Users.`);
    },
  });
  return useMemo(() => ({ updateUserData }), [updateUserData]);
};

export const useDeleteUser = () => {
  const { deleteUserThunk } = useStoreActions((store) => store.users);
  const { mutate: deleteUserData } = useMutation(deleteUserThunk, {
    onError(e) {
      console.log(e);
      toast.error(`Issue while Deleting Users.`);
    },
  });
  return useMemo(() => ({ deleteUserData }), [deleteUserData]);
};

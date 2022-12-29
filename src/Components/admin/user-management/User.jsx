import React from "react";
import CreateEditUserComponent from "./create-edit-user";
import UserTable from "./UserTable";

function User() {
  return (
    <div>
      <CreateEditUserComponent />
      <UserTable />
    </div>
  );
}

export default User;

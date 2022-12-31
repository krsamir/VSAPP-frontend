import React, { useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import Styled from "styled-components";
import { AdminContext } from "../Context/admin-context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoreState } from "easy-peasy";
import { useDeleteUser, useGetUsers } from "../Hooks/useUser";
import DeleteDialogComponent from "../../Common/Delete-Dialog";

const TableWrapper = Styled.div`
    margin-left: 20px;
    margin-top:20px;
`;
const StyledEditIcon = Styled(EditIcon)`
  cursor: pointer;
`;
const StyledDeleteIcon = Styled(DeleteIcon)`
  cursor:pointer;
`;
const IconWrapper = Styled.div`
  display:flex;
  justify-content: center;
`;
function UserTable() {
  const { users } = useStoreState((state) => state.users);
  useGetUsers();
  const { deleteUserData } = useDeleteUser();
  const {
    providerState: { setUserData, setModalState },
  } = useContext(AdminContext);
  const [, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const editCellRenderer = ({ data }) => {
    return (
      <IconWrapper>
        <StyledEditIcon
          onClick={() => {
            setUserData(data);
            setModalState(true);
          }}
        ></StyledEditIcon>
      </IconWrapper>
    );
  };

  const deleteCellRenderer = ({ data }) => {
    return (
      <IconWrapper>
        <StyledDeleteIcon
          onClick={() => handleOpenDialog(data)}
        ></StyledDeleteIcon>
      </IconWrapper>
    );
  };
  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
    },
    { headerName: "Username", field: "username" },
    { headerName: "Mobile No.", field: "mobile" },
    {
      headerName: "Status",
      field: "status",
      valueGetter: ({ data: { isActive } }) =>
        isActive ? `Active` : `Inactive`,
    },
    { headerName: "Tenant", field: "tenant.name" },
    { headerName: "Token", field: "token" },
    { headerName: "Valid Till", field: "validTill" },
    { headerName: "Created By", field: "createdBy" },
    {
      headerName: "Edit",
      field: "edit",
      cellRenderer: editCellRenderer,
      resizable: false,
      sortable: false,
      filter: false,
    },
    {
      headerName: "Delete",
      field: "delete",
      cellRenderer: deleteCellRenderer,
      resizable: false,
      sortable: false,
      filter: false,
    },
  ];
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    filterParams: {
      buttons: ["reset"],
      debounceMs: 200,
    },
  };
  const onGridReady = (e) => {
    setGridApi(e.api);
    e.api.sizeColumnsToFit();
  };
  const gridOptions = {
    pagination: true,
    overlayNoRowsTemplate: "<h3>No Data Available.</h3>",
    tooltipShowDelay: 0,
  };
  const getRowNodeId = ({ data: { id } }) => id;

  const handleOpenDialog = (item) => {
    setOpen(true);
    setData(item);
  };
  const handleAccept = () => {
    if (data?.id) {
      deleteUserData(data?.id, {
        onSuccess: () => {
          setOpen(false);
          setTimeout(() => {
            setData(null);
          }, 200);
        },
      });
    }
  };
  return (
    <TableWrapper
      className="ag-theme-alpine"
      style={{ width: "90%", height: 520 }}
    >
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        animateRows={true}
        gridOptions={gridOptions}
        getRowId={getRowNodeId}
        paginationPageSize={10}
      ></AgGridReact>
      <DeleteDialogComponent
        setOpen={setOpen}
        open={open}
        handleAccept={handleAccept}
        content={`Are you sure to delete user ${data?.name}?`}
        title={`Delete User`}
        setData={setData}
      ></DeleteDialogComponent>
    </TableWrapper>
  );
}

export default UserTable;

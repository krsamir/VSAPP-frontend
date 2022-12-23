import React, { useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import Styled from "styled-components";
import { SuperAdminContext } from "../Context/super-admin-context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoreState } from "easy-peasy";
import { useGetTenants, useDeleteTenants } from "../Hooks/useTenants";
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
function TenantTable() {
  const {
    providerState: { setTenantData, setModalState },
  } = useContext(SuperAdminContext);
  const [, setGridApi] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const { tenants } = useStoreState((state) => state.tenant);
  useGetTenants();
  const { deleteTenantData } = useDeleteTenants();
  const editCellRenderer = ({ data }) => {
    return (
      <IconWrapper>
        <StyledEditIcon
          onClick={() => {
            setTenantData(data);
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
    { headerName: "Branch", field: "branch" },
    {
      headerName: "Status",
      field: "status",
      valueGetter: ({ data: { status } }) => (status ? `Active` : `Inactive`),
    },
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
      deleteTenantData(data?.id, {
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
      style={{ width: 900, height: 520 }}
    >
      <AgGridReact
        rowData={tenants}
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
        content={`Are you sure to delete ${data?.name}?`}
        title={`Delete Tenant`}
        setData={setData}
      ></DeleteDialogComponent>
    </TableWrapper>
  );
}

export default TenantTable;

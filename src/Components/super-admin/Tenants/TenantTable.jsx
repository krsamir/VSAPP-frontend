import React, { useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import Styled from "styled-components";
import { SuperAdminContext } from "../Context/super-admin-context";
import EditIcon from "@mui/icons-material/Edit";
import { useStoreState } from "easy-peasy";
import { useGetTenants } from "../Hooks/useTenants";

const TableWrapper = Styled.div`
    margin-left: 20px;
    margin-top:20px;
`;
const StyledEditIcon = Styled(EditIcon)`
  cursor: pointer;
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
  const { tenants } = useStoreState((state) => state.tenant);
  useGetTenants();
  const actionCellRenderer = ({ data }) => {
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
      cellRenderer: actionCellRenderer,
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
    </TableWrapper>
  );
}

export default TenantTable;

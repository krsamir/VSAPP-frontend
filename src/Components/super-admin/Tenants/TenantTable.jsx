import React, { useState, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import Styled from "styled-components";
import { SuperAdminContext } from "../Context/super-admin-context";
const TableWrapper = Styled.div`
    margin-left: 20px;
    margin-top:20px;
`;
function TenantTable({ data = [] }) {
  const {
    providerState: { setTenantData, setModalState },
  } = useContext(SuperAdminContext);
  const [, setGridApi] = useState(null);
  const actionCellRenderer = ({ data }) => {
    return (
      <div>
        <div
          onClick={() => {
            setTenantData(data);
            setModalState(true);
          }}
        >
          Click
        </div>
      </div>
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
      style={{ width: 900, height: 500 }}
    >
      <AgGridReact
        rowData={data}
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

import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarContainer,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Statuses, UserRoles } from "../../components/common/constant";

interface TableData {
  doorRefNumber: string;
  doorType: string;
  fireRating: string;
  compliance: string;
  comments?: string;
}

interface DataGridTableProps {
  tableData: TableData[];
  userRole: string;
  inspectorInspectionStatus: string;
  propertyInfo: {
    status: string;
  };
}

const StyledQuickFilter = styled(GridToolbarQuickFilter)({
  display: "grid",
  alignItems: "center",
});

function CustomToolbar() {
  return (
    <GridToolbarContainer variant="dense">
      <Tooltip title="Columns">
        <span>
          <ViewColumnIcon fontSize="small" />
        </span>
      </Tooltip>
      <Tooltip title="Filters">
        <span>
          <Badge badgeContent={0} color="primary" variant="dot">
            <FilterListIcon fontSize="small" />
          </Badge>
        </span>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />
      <StyledQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput.split(",").map((value) => value.trim())
        }
        debounceMs={500}
        placeholder="Search..."
      />
    </GridToolbarContainer>
  );
}

const DataGridTable: React.FC<DataGridTableProps> = (props) => {
  const [userList, setUserList] = React.useState<any[]>([]);
  const { tableData } = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    const payload = tableData?.map((item, index) => ({
      id: index + 1,
      ...item,
    }));
    setUserList(payload);
  }, [tableData]);

  const gotoDashBoard = (drn: string, field: "view" | "edit") => {
    if (field === "view") {
      navigate("/viewSurvey/" + drn);
    } else {
      navigate("/editSurvey/" + drn);
    }
  };

  const shouldShowEditColumn =
    props.userRole === UserRoles.INSPECTOR &&
    props.inspectorInspectionStatus !== Statuses.COMPLETED &&
    (props.propertyInfo?.status === Statuses.REJECTED ||
      props.propertyInfo?.status === Statuses.INREVIEW);

  const baseColumns: GridColDef[] = [
    {
      field: "doorRefNumber",
      headerName: "Door Reference",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "doorType",
      headerName: "Type",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "fireRating",
      headerName: "Fire Rating",
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) =>
        params.value === "Select" ? "-" : params.value,
    },
    {
      field: "compliance",
      headerName: "Compliant",
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <span
            className={
              params.value === "Compliant" ? "status-dot-green" : "status-dot-orange"
            }
          ></span>
          {params.value}
        </>
      ),
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.value || "-"}</>
      ),
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      flex: 0.5,
      minWidth: 70,
      renderCell: (params: GridRenderCellParams) => (
        <i
          className="fa-solid fa-eye fa-lg"
          title="View"
          style={{ cursor: "pointer" }}
          onClick={() => gotoDashBoard(params.row.doorRefNumber, "view")}
        ></i>
      ),
    },
  ];

  const editColumn: GridColDef = {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    flex: 0.5,
    minWidth: 70,
    renderCell: (params: GridRenderCellParams) => (
      <i
        className="fa-solid fa-pen-to-square fa-lg"
        title="Edit"
        style={{ cursor: "pointer" }}
        onClick={() => gotoDashBoard(params.row.doorRefNumber, "edit")}
      ></i>
    ),
  };

  const columns = shouldShowEditColumn
    ? [...baseColumns, editColumn]
    : baseColumns;

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={userList}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={45}
        columnHeaderHeight={45}
        slots={{ toolbar: CustomToolbar }}
        pageSizeOptions={[5, 10, 20, { value: -1, label: "All" }]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableColumnMenu
        sx={{
          display: "grid",
          boxShadow: 2,
          width: "100%",
        }}
      />
    </Box>
  );
};

export default DataGridTable;

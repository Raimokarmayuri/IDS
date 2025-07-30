// components/DataGridTable.tsx
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Toolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";

import { useRouter } from "expo-router";

import * as React from "react";

// import { useNavigate } from "react-router-dom";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Statuses, UserRoles } from "../../components/common/constants";


interface TableRowData {
  doorRefNumber: string;
  doorType: string;
  fireRating: string;
  compliance: string;
  comments?: string;
  id: number;
}

interface DataGridTableProps {
  tableData: TableRowData[];
  userRole: number | null;
  inspectorInspectionStatus: string | null;
  propertyInfo: {
    status: string;
  };
}

const StyledQuickFilter = styled(GridToolbarQuickFilter)(() => ({
  display: "grid",
  alignItems: "center",
}));

function CustomToolbar() {
    
  return (
    <Toolbar variant="dense">
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
        // placeholder="Search..."
      />
    </Toolbar>
  );
}

const DataGridTable: React.FC<DataGridTableProps> = ({ tableData, userRole, inspectorInspectionStatus, propertyInfo }) => {
  const [userList, setUserList] = React.useState<TableRowData[]>([]);
const navigation = useNavigation<NavigationProp<any>>();
const router = useRouter();
 React.useEffect(() => {
  const payload = tableData.map((item, index) => {
    return {
      ...item,
      id: item.id ?? index + 1, // Use existing id if available, otherwise index + 1
    };
  });
  setUserList(payload);
}, [tableData]);

const gotoDashBoard = (drn: string, field: "view" | "edit") => {
  if (field === "view") {
    router.push(`/viewSurvey/${drn}`);
  } else {
    router.push(`/editSurvey/${drn}`);
  }
};



  const shouldShowEditColumn =
    userRole === UserRoles.INSPECTOR &&
    inspectorInspectionStatus !== Statuses.COMPLETED &&
    (propertyInfo?.status === Statuses.REJECTED || propertyInfo?.status === Statuses.INREVIEW);

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
    <VisibilityIcon
      fontSize="small"
      style={{ cursor: "pointer" }}
      onClick={() => gotoDashBoard(params.row.doorRefNumber, "view")}
    />
  ),
}


  ];

  const editColumn: GridColDef = {
  field: "edit",
  headerName: "Edit",
  sortable: false,
  flex: 0.5,
  minWidth: 70,
  renderCell: (params: GridRenderCellParams) => (
    <EditIcon
      fontSize="small"
      style={{ cursor: "pointer" }}
      onClick={() => gotoDashBoard(params.row.doorRefNumber, "edit")}
    />
  ),
};



  const columns = shouldShowEditColumn ? [...baseColumns, editColumn] : baseColumns;

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
        sx={{ display: "grid", boxShadow: 2, width: "100%" }}
      />
    </Box>
  );
};

export default DataGridTable;
// 
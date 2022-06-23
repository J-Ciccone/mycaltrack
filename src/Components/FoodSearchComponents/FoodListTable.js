import { useTheme } from "@emotion/react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { createFoodObjectsForTable } from "../../Services/FoodService";
import { FOOD_TABLE_COLUMNS } from "../../Values";
import { FoodTableContext } from "../../Context/FoodTableContext";
import { useContext } from "react";
import { Grid } from "@mui/material";

const FoodListTable = () => {
  const theme = useTheme();
  const context = useContext(FoodTableContext);
  let foodTableRows = createFoodObjectsForTable(context.foodListForTable);
  const columns = [
    {
      field: "id",
      headerName: "Track",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          context.setFoodListForTracking((prev) => [...prev, params.row]);
        };

        return (
          <Button
            sx={{ color: "white" }}
            variant="contained"
            size="small"
            onClick={onClick}
          >
            Track
          </Button>
        );
      },
    },
    ...FOOD_TABLE_COLUMNS,
  ];

  return (
    <Paper
      sx={{
        width: "55vw",
      }}
      elevation={3}
    >
      <DataGrid
        autoHeight
        columnThreshold={0}
        rows={foodTableRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
};

export default FoodListTable;

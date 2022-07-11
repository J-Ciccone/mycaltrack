import { useTheme } from "@emotion/react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { createFoodObjectsForTable } from "../../Services/FoodService";
import { FOOD_TABLE_COLUMNS } from "../../Values";
import { FoodContext } from "../../Context/Context";
import { useContext } from "react";

const FoodSearchTable = () => {
  const context = useContext(FoodContext);
  let foodTableRows = createFoodObjectsForTable(context.foodListForTable);
  const columns = [
    {
      field: "key",
      headerName: "Track",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
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
  //TODO figure oout hopw to get the datagrid to go back to page 0 when there is a new search
  return (
    <Paper
      sx={{
        width:"100%",
        
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

export default FoodSearchTable;

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";
import numberSort from "./utils/grid/numberSort";

// Assumptions: There are no specified type of fields. I assume the types based on what I can see in the table
// blocker: discovery date filter seems to be not working properly. skipping this to work on task 3
const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true, filter: true, menuTabs: ['filterMenuTab']  },
  { field: "discovery_date", headerName: "Discovery Date", sortable: true, filter: 'agDateColumnFilter' },
  { field: "h_mag", headerName: "H (mag)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "q_au_1", headerName: "q (au)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true, comparator: numberSort, filter: 'agNumberColumnFilter' },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true, filter: true },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, sortable: true, filter: true },
];

const NeoGrid = ({ title }: {title: string}): JSX.Element => {
  useEffect(()=> {
    // Assumption - I'm expecting it to be scalable and there will be other type of tables or pages that will have different titles. 
    // this is the reason I put a side-effect to change the title instead of changing it directly in index.html
    // Added title pros as well
    document.title = title;
  }, [title]);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h1>{title}</h1>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;

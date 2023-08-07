import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect } from "react";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  { field: "discovery_date", headerName: "Discovery Date" },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha", headerName: "Potentially Hazardous" },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, },
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

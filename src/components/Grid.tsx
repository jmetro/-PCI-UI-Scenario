import { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import data from '../near-earth-asteroids.json';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import numberSort from '../utils/grid/numberSort';
import dateFormatter from '../utils/grid/dateFormatter';
import dateFilter from '../utils/grid/dateFilter';
import yesNoFormatter from '../utils/grid/yesNoFormatter';
import './style.css';
// Assumptions: There are no specified type of fields. I assume the types based on what I can see in the table
// blocker: discovery date filter seems to be not working properly. skipping this to work on task 3
// Task 3: fixed filtering of date column
// Added value formatter for date
const columnDefs: ColDef[] = [
  {
    field: 'designation',
    headerName: 'Designation',
    sortable: true,
    filter: true,
    menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
  },
  {
    field: 'discovery_date',
    headerName: 'Discovery Date',
    sortable: true,
    filter: 'agDateColumnFilter',
    valueFormatter: dateFormatter,
    filterParams: { comparator: dateFilter },
  },
  {
    field: 'h_mag',
    headerName: 'H (mag)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'moid_au',
    headerName: 'MOID (au)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'q_au_1',
    headerName: 'q (au)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'q_au_2',
    headerName: 'Q (au)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'period_yr',
    headerName: 'Period (yr)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'i_deg',
    headerName: 'Inclination (deg)',
    sortable: true,
    comparator: numberSort,
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'pha',
    headerName: 'Potentially Hazardous',
    sortable: true,
    filter: true,
    valueFormatter: yesNoFormatter,
  },
  {
    field: 'orbit_class',
    headerName: 'Orbit Class',
    enableRowGroup: true,
    sortable: true,
    filter: true,
  },
];

const NeoGrid = ({ title }: { title: string }): JSX.Element => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();
  useEffect(() => {
    // Assumption - I'm expecting it to be scalable and there will be other type of tables or pages that will have different titles.
    // this is the reason I put a side-effect to change the title instead of changing it directly in index.html
    // Added title pros as well
    document.title = title;
  }, [title]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    // accessed gridApi and columnApi via onGridReady since I don't have enterprise package for agGrid instance
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }, []);

  const onClearFilters = useCallback(() => {
    if (gridApi) {
      columnApi?.applyColumnState({
        defaultState: { sort: null },
      });
      columnDefs.forEach((column) => {
        const instance = gridApi.getFilterInstance(column.field as string);
        instance?.setModel({ values: [] });
        gridApi.onFilterChanged();
      });
    }
  }, [gridApi, columnApi]);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div className="header-container">
        <h1>{title} </h1>
        <button className="header-action" onClick={onClearFilters}>
          Clear Filters and Sorters
        </button>
      </div>

      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default NeoGrid;

import { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { FaSearch } from "react-icons/fa";

const DataTable = ({
  rows,
  columns,
  loading,
  fetchData,
  isServerSidePagination = false,
  totalPages = 1,
}) => {
  const [filterText, setFilterText] = useState("");
  const [includeOutliers, setIncludeOutliers] = useState(true);
  const apiRef = useGridApiRef();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        Object.keys(row).some(
          (field) =>
            typeof row[field] === "string" &&
            row[field].toLowerCase().includes(filterText.toLowerCase())
        )
      )
    : [];

  // const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    // If server-side pagination is enabled, fetch the specific page from the server
    if (isServerSidePagination) {
      fetchData(newPage, pageSize);
    }
  };

  const autosizeOptions = {
    includeHeaders: true,
    includeOutliers,
  };

  // const pageSize = 10;
  const pageStartIndex = (page - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  // Use rows directly if server-side pagination is enabled; otherwise, slice for client-side pagination
  const pageRows = isServerSidePagination
    ? rows
    : filteredRows.slice((page - 1) * pageSize, page * pageSize);

  // Use server-provided total pages if server-side pagination is enabled; otherwise, calculate based on filtered rows
  const calculatedTotalPages = isServerSidePagination
    ? totalPages
    : Math.ceil(filteredRows.length / pageSize);

  useEffect(() => {
    apiRef.current.autosizeColumns(autosizeOptions);
  }, [loading]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 border border-gray-300 rounded-md py-2 pl-10 pr-4"
            value={filterText}
            onChange={handleFilterChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* <div>
          <button
            className="border border-teal-500 text-teal-500 font-bold py-2 px-4 rounded hover:bg-teal-800 hover:text-white"
            onClick={() => apiRef.current.autosizeColumns(autosizeOptions)}
          >
            Autosize all columns
          </button>
        </div> */}
      </div>
      <div style={{ flexGrow: 1, overflowX: "auto" }}>
        <DataGrid
          autoHeight
          rows={pageRows}
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            minWidth: 150,
          }))}
          pageSize={pageSize}
          disableSelectionOnClick
          apiRef={apiRef}
          density="compact"
          pageSizeOptions={[pageSize]}
          slots={{
            loadingOverlay: loading ? LinearProgress : undefined,
          }}
          loading={loading}
          columnBuffer={columns.length}
          columnThreshold={columns.length}
          rowHeight={100}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          count={calculatedTotalPages}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default DataTable;

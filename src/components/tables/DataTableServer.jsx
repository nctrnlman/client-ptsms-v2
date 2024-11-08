import { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { FaSearch } from "react-icons/fa";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "@mui/material";

export default function DataTableServer({
  columns,
  rows,
  totalPages,
  page,
  setPage,
  itemsPerPage,
}) {
  const [loading, setLoading] = useState(false);
  const apiRef = useGridApiRef();
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // Function to handle pagination change (used for DataGrid)
  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Set page to newPage (Material UI uses 1-based indexing)
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (newPageSize) => {
    setPageSize(newPageSize); // Update the page size
    setPage(1); // Reset to page 1 when rows per page change
  };

  // Filter rows based on the search query
  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        Object.keys(row).some(
          (field) =>
            typeof row[field] === "string" &&
            row[field].toLowerCase().includes(filterText.toLowerCase())
        )
      )
    : [];

  // Ensure totalPages and page are valid
  const validTotalPages =
    Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 1;
  const validPage = Number.isInteger(page) && page > 0 ? page : 1;

  // Autosize columns on every loading change
  useEffect(() => {
    apiRef.current?.autosizeColumns({ includeHeaders: true });
  }, [loading]);

  // If loading is true, show loading indicator
  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Search Bar */}
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
      </div>

      {/* Data Grid */}
      <div style={{ flexGrow: 1, overflowX: "auto" }}>
        <DataGrid
          autoHeight
          rows={filteredRows}
          columns={columns.map((column) => ({
            ...column,
            flex: 1,
            minWidth: 150,
          }))}
          pageSize={pageSize}
          page={validPage - 1} // Ensure that the page is valid (0-based for DataGrid)
          disableSelectionOnClick
          apiRef={apiRef}
          density="compact"
          paginationMode="server"
          rowCount={validTotalPages * pageSize} // Ensure rowCount is valid
          loading={loading}
          columnBuffer={columns.length}
          columnThreshold={columns.length}
          rowHeight={100}
          onPageChange={handlePageChange}
          onPageSizeChange={handleRowsPerPageChange}
          slots={{
            loadingOverlay: loading ? LinearProgress : undefined,
          }}
        />
      </div>

      {/* Pagination Component from Material-UI */}
      <div className="flex justify-end mt-4">
        <Pagination
          count={validTotalPages} // The total number of pages (starts from 1)
          page={validPage}
          onChange={handlePageChange} // Update page state when page changes
          color="primary"
        />
      </div>
    </div>
  );
}

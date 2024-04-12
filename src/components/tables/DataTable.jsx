import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const DataTable = ({ rows, columns, loading }) => {
  const [filterText, setFilterText] = useState("");
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

  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const pageSize = 10;
  const pageStartIndex = (page - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const pageRows = filteredRows.slice(pageStartIndex, pageEndIndex);

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  return (
    <div className="flex flex-col  w-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 border border-gray-300 rounded-md py-2 pl-10 pr-4"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className="w-full h-full">
        <DataGrid
          autoHeight
          rows={pageRows}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          slots={{
            loadingOverlay: loading ? LinearProgress : undefined,
          }}
          loading={loading}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </div>
      <div className="flex justify-end mt-4 ">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default DataTable;

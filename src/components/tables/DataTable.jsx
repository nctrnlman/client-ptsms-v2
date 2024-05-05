import { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { FaSearch } from "react-icons/fa";

const DataTable = ({ rows, loading }) => {
  const [filterText, setFilterText] = useState("");
  const [includeOutliers, setIncludeOutliers] = useState(true);
  const apiRef = useGridApiRef();

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

  const autosizeOptions = {
    includeHeaders: true,
    includeOutliers,
  };

  const pageSize = 10;
  const pageStartIndex = (page - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const pageRows = filteredRows.slice(pageStartIndex, pageEndIndex);

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "no_faktur", headerName: "No Faktur", width: 150 },
    { field: "supplier_name", headerName: "Distributor name", width: 200 },
    { field: "payment_method", headerName: "Payment Method", width: 150 },
    { field: "created_at", headerName: "Created Date", width: 150 },
    { field: "time_to_payment", headerName: "Time To Payment", width: 150 },
    { field: "amount", headerName: "Total Amount", width: 150 },
    { field: "amount_tax", headerName: "Total Amount with Tax", width: 180 },
    { field: "pic", headerName: "PIC", width: 150 },
    {
      field: "note",
      headerName: "Note",
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: "nowrap" }}>{params.value}</div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 350,
      renderCell: (params) => (
        <div className="flex gap-3">
          <button
            className="text-brand-500 hover:text-brand-800 font-bold"
            onClick={() => handleEdit(params.row.transaction_id)}
          >
            Detail
          </button>
          <button
            className="text-red-500 hover:text-red-800 font-bold"
            onClick={() => handleDelete(params.row.transaction_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    apiRef.current.autosizeColumns(autosizeOptions);
  }, [loading]);

  const handleEdit = (transactionId) => {
    // Implementasikan logika untuk mengedit transaksi dengan ID tertentu
    console.log("Edit transaction with ID:", transactionId);
  };

  const handleDelete = (transactionId) => {
    // Implementasikan logika untuk menghapus transaksi dengan ID tertentu
    console.log("Delete transaction with ID:", transactionId);
  };

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
        <div>
          <button
            className="border border-teal-500 text-teal-500 font-bold py-2 px-4 rounded hover:bg-teal-800 hover:text-white"
            onClick={() => apiRef.current.autosizeColumns(autosizeOptions)}
          >
            Autosize all columns
          </button>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflowX: "auto" }}>
        <DataGrid
          autoHeight
          rows={pageRows}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          apiRef={apiRef}
          density="compact"
          pageSizeOptions={[pageSize]}
          slots={{
            loadingOverlay: loading ? LinearProgress : undefined,
          }}
          loading={loading}
        />
      </div>
      <div className="flex justify-end mt-4">
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

import React, { useEffect, useState, ReactNode } from "react";
import { Table } from "react-bootstrap";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import "./Datatable.css";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

// 1. Define the type for a single column
type ColumnDef<T> = {
  field: keyof T | (string & {}); // The key from the data object
  header: ReactNode; // What to display in the th
  sorting?: boolean;
  align?: "left" | "right" | "center";
};

// 2. Define the types for the component's props using a generic
// <T> will represent the shape of a single row object (e.g., { id: 1, name: "Test" })
// We constrain T to require an 'id' property
type DatatableProps<T extends { id: any }> = {
  data: T[];
  columns: ColumnDef<T>[];
  checkbox?: boolean;
  isSearchBar?: boolean;
  children?: (props: {
    row: T;
    column: ColumnDef<T>;
    rowIndex: number;
  }) => ReactNode;
  rowClick?: (row: T) => void;
  selectData: (T["id"])[]; // An array of row IDs
  setSelectData: React.Dispatch<React.SetStateAction<(T["id"])[]>>;
  isLoader?: boolean;
  tableNm?: string;
  pagination?: boolean;
  tableBtn?: ReactNode;
  footerSection?: ReactNode;
  customRender?: (
    row: T,
    column: ColumnDef<T>,
    colIndex: number
  ) => ReactNode | null;
  setSelectedPage?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedItemsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  totalPagesCount?: number;
  setsearch?: React.Dispatch<React.SetStateAction<string>>;
  height?: string;
  tableDataHeight?: string;
  customHeight?: string | number;
  icon?: ReactNode;
  hr?: boolean
};

// 3. Type the sort direction state
type SortDirection = "asc" | "desc" | null;

export const Datatable = <T extends { id: any }>({
  data,
  columns,
  checkbox,
  isSearchBar,
  children,
  rowClick,
  selectData,
  setSelectData,
  isLoader,
  tableNm,
  pagination,
  tableBtn,
  footerSection,
  customRender,
  setSelectedPage,
  setSelectedItemsPerPage,
  totalPagesCount,
  setsearch,
  height = "calc(100vh - 225px)",
  tableDataHeight,
  icon,
  hr = true,
  customHeight,
}: DatatableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 4. Type the state variables explicitly
  const [sortColumn, setSortColumn] = useState<keyof T | (string & {}) | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // UseFor Server Side Pagination
  useEffect(() => {
    // Check if functions exist before calling them
    setSelectedPage?.(currentPage);
    setSelectedItemsPerPage?.(itemsPerPage);
    setsearch?.(searchTerm);
  }, [currentPage, itemsPerPage, searchTerm, setSelectedPage, setSelectedItemsPerPage, setsearch]);

  // 5. Type the handler's parameter
  const handleSort = (columnField: keyof T | (string & {})) => {
    if (sortColumn === columnField) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(columnField);
      setSortDirection("asc");
    }
  };

  // 6. Type the filter function
  const filterData = (dataToFilter: T[]): T[] => {
    return isSearchBar && !setsearch // Only filter client-side if server-side search isn't provided
      ? dataToFilter.filter((item) =>
        Object.values(item).some((value) =>
          value !== null
            ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            : false // Return false for null/undefined values
        )
      )
      : dataToFilter;
  };

  const sortedData = (sortColumn && !totalPagesCount) // Only sort client-side if not server-paginated
    ? [...filterData(data)].sort((a, b) => { // Create a new array with [...data]
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    })
    : filterData(data);

  const totalPages =
    totalPagesCount || Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    pagination && !totalPagesCount // Slice only if client-side pagination
      ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
      : sortedData;

  // 7. Type the event handler
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelectData(newSelected);
      return;
    }
    setSelectData([]);
  };

  // 8. Type the handler's parameter
  const isSelected = (id: T["id"]): boolean => selectData?.indexOf(id) !== -1;

  // 9. Type the event handler and its 'id' parameter
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, id: T["id"]) => {
    const selectedIndex = selectData?.indexOf(id);
    let newSelected: (T["id"])[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectData, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectData.slice(1));
    } else if (selectedIndex === selectData.length - 1) {
      newSelected = newSelected.concat(selectData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectData.slice(0, selectedIndex),
        selectData.slice(selectedIndex + 1)
      );
    }
    setSelectData(newSelected);
  };

  return (
    <div>
      <div>
        <div className="inline-block w-100 align-middle">
          {isSearchBar && (
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="primary" > <span>{icon}</span>  {tableNm}</h6>
              <div className="d-flex align-items-center gap-3">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {tableBtn}
              </div>
            </div>
          )}
          {hr &&
            <hr style={{ color: "#adadadff" }} />
          }
          <div
            className=" rounded mt-2"
            style={{ height: height, overflow: "auto", border: "1px solid #f0f0f0ff" }}
          >
            <Table
              style={{ border: "1px solid #f0f0f0ff" }}
              hover
              responsive
              size="sm"
              className="mb-2 text-nowrap  data-table"
            >
              <thead>
                <tr className="fw-medium text-secondary ps-2">
                  {checkbox && (
                    <th
                      className="p-2"
                      style={{
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        zIndex: "2",
                      }}
                    >
                      <div className="d-flex justify-content-center ms-1">
                        {/* <Checkbox
                          checked={sortedData.length > 0 && selectData?.length === sortedData.length}
                          onChange={handleSelectAllClick} // Pass the typed handler
                        /> */}
                      </div>
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      style={{ whiteSpace: "nowrap", padding: "12px" }}
                      // 10. Use a stable key like column.field
                      key={column.field as string}
                      onClick={() => column.sorting && handleSort(column.field)}
                      className=" text-sm text-center border-0 "
                    >
                      <div
                        style={{ color: "#636363ff" }}
                        className={`d-flex ${column.align === "center"
                          ? "justify-content-center"
                          : "justify-content-between"
                          } align-items-center text-sm text-nowrap fw-semibold text-slate-700`}
                      >
                        {column.header}
                        {sortColumn === column.field && column.sorting && (
                          <span className="ms-auto">
                            {sortDirection === "asc" ? (
                              <HiOutlineChevronDown />
                            ) : (
                              <HiOutlineChevronUp />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {isLoader ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr
                      key={index}
                      style={{
                        fontSize: "12px",
                        padding: "10px",
                        whiteSpace: "nowrap",
                        height: "35px",
                      }}
                      className="skeleton-row ps-2"
                    >
                      {checkbox && (
                        <td className="p-2">
                          <div className="skeleton-box skeleton-box-50" />
                        </td>
                      )}
                      {columns.map((column) => (
                        // 10. Use a stable key
                        <td key={column.field as string}>
                          <div
                            className={`skeleton-box ${column.field === "name"
                              ? "skeleton-box-200"
                              : "skeleton-box-100"
                              }`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  currentItems.map((row, rowIndex) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <tr key={row.id || rowIndex} style={{ cursor: "pointer" }}>
                        {checkbox && (
                          <td className="p-2">
                            <div className="d-flex justify-content-center ms-1">
                              {/* <Checkbox
                                checked={isItemSelected}
                                value={isItemSelected}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleClick(event, row.id)}
                              /> */}
                            </div>
                          </td>
                        )}
                        {columns.map((column, colIndex) => {
                          const customCell = customRender
                            ? customRender(row, column, colIndex)
                            : null;

                          return customCell ? (
                            customCell
                          ) : (
                            <td
                              // 10. Use a stable key
                              key={column.field as string}
                              className="p-2 text-sm"
                              onClick={() => rowClick?.(row)}
                              style={{ textAlign: column.align || "left" }}
                            >
                              {children
                                ? children({ row, column, rowIndex })
                                : (row[column.field as keyof T] as ReactNode) ?? ""}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}

                {currentItems.length === 0 && !isLoader && (
                  <tr>
                    <td colSpan={columns.length + (checkbox ? 1 : 0)}>
                      <div
                        className="d-flex align-items-center justify-content-center flex-column"
                        style={{
                          height: tableDataHeight ? tableDataHeight : "40vh",
                        }}
                      >
                        {/* <MySVG customHeight={customHeight} /> */}
                        <h6 className="text-center text-sm">
                          No {tableNm || "data"} found
                        </h6>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
              {footerSection && <tfoot>{footerSection}</tfoot>}
            </Table>
          </div>

          {pagination && (
            <Pagination
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setItemsPerPage={setItemsPerPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// You can't use 'export default' on a 'const' declaration
// If you need a default export, do it separately:
// export default Datatable;

// Or just keep it as a named export
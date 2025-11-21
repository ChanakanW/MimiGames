import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "ลำดับ", minWidth: 170 },
  { id: "name", label: "ชื่อ", minWidth: 170 },
  {
    id: "population",
    label: "ประเภทการลา",
    minWidth: 170,
    align: "right",
  },
  {
    id: "size",
    label: "วันที่เริ่มต้นการลา",
    minWidth: 170,
    align: "right",
  },
  {
    id: "density",
    label: "วันที่สิ้นสุดการลา",
    minWidth: 170,
    align: "right",
  },
  {
    id: "density",
    label: "เหตุผลการลา",
    minWidth: 170,
    align: "right",
  },
  {
    id: "density",
    label: "ผู้อนุมัติการลา",
    minWidth: 170,
    align: "right",
  },
  {
    id: "population",
    label: "สถานะการลา",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  num: number;
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  num: number,
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { num, name, code, population, size, density };
}

const rows = [
  createData(1, "India", "IN", 1324171354, 3287263),
  createData(2, "China", "CN", 1403500365, 9596961),
  createData(3, "Italy", "IT", 60483973, 301340),
  createData(4, "United States", "US", 327167434, 9833520),
  createData(5, "Canada", "CA", 37602103, 9984670),
  createData(6, "Australia", "AU", 25475400, 7692024),
  createData(7, "Germany", "DE", 83019200, 357578),
  createData(8, "Ireland", "IE", 4857000, 70273),
  createData(9, "Mexico", "MX", 126577691, 1972550),
  createData(10, "Japan", "JP", 126317000, 377973),
  createData(11, "France", "FR", 67022000, 640679),
  createData(12, "United Kingdom", "GB", 67545757, 242495),
  createData(13, "Russia", "RU", 146793744, 17098246),
  createData(14, "Nigeria", "NG", 200962417, 923768),
  createData(15, "Brazil", "BR", 210147125, 8515767),
];

export default function LeaveHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box>
        <Divider
          textAlign="left"
          sx={{
            borderColor: "#03a9f4",
            borderWidth: "2px",
            width: "100%",
            margin: "16px 0",
          }}
        />
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              borderBottom: "1px solid #f1f1f1",
                              color: theme.palette.text.primary,
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: theme.palette.background.default,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          />
        </Paper>
      </Box>
    </Card>
  );
}

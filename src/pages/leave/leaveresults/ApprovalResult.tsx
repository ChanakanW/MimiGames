import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';

function createData(
  number: number,
  name: string,
  startDate: string,
  endDate: string,
  reason: string,
  approver: string,
  status: string
) {
  return { number, name, startDate, endDate, reason, approver, status };
}

const rows = [
  createData(1, 'John Doe', '01/01/2024', '01/05/2024', 'Vacation', 'Jane Smith', 'Approved'),
  createData(2, 'Mary Jane', '05/01/2024', '05/03/2024', 'Sick Leave', 'Jake White', 'Pending'),
  createData(3, 'Alice Brown', '06/01/2024', '06/07/2024', 'Family Emergency', 'David Clark', 'Rejected'),
  createData(4, 'Bob Black', '07/01/2024', '07/10/2024', 'Holiday', 'Emily Green', 'Approved'),
  createData(5, 'Charlie Blue', '08/01/2024', '08/12/2024', 'Personal', 'Michael Blue', 'Pending'),
];

export default function ApprovalResult() {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          รายการลา
        </Typography>
      </CardContent>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              ลำดับ
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>ชื่อ-สกุล</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              วันที่เริ่มต้นการลา
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              วันที่สิ้นสุดการลา
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              เหตุผลการลา
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              ผู้อนุมัติการลา
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
              สถานนะการลา
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.number}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: theme.palette.action.hover },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell align="right">{row.number}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.approver}</TableCell>
              <TableCell align="right">
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color:
                      row.status === 'Approved'
                        ? 'green'
                        : row.status === 'Pending'
                        ? 'orange'
                        : 'red',
                  }}
                >
                  {row.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

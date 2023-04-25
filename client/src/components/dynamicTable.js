import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export default function DynamicTable({ headers, rows }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: "fixed" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ maxWidth: '500px' }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell key={`${row.id}-${header}`} sx={{ wordWrap: "break-word", maxWidth: '500px' }}>{row[header.toLowerCase()]}</TableCell>
              ))}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
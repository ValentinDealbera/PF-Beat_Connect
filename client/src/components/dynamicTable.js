import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function DynamicTable({ headers, rows }) {
  return (
    <TableContainer className="shadow-none">
      <Table
        sx={{ minWidth: 650, tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead className="p-0">
          <TableRow className="p-0">
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell
                  key={`${row.id}-${header}`}
                  sx={{ wordWrap: "break-word", maxWidth: "500px" }}
                >
                  {row[header.toLowerCase()]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

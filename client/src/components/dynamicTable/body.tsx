import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow'
import TablePaginationActions from './tablePaginationActions'
import { TableHead } from '@mui/material'

interface TableBodyProps {
  headers: string[]
  rows: any[]
  rowsPerPage: number
  page: number
  emptyRows: number
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChangeRowsPerPage: any
  TableCellStyledHead: any
  TableCellStyled: any
  TablePaginationStyled: any
}

export default function TableBodyFn({
  headers,
  rows,
  rowsPerPage,
  page,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
  TableCellStyledHead,
  TableCellStyled,
  TablePaginationStyled
}: TableBodyProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHead className='p-0'>
          <TableRow className='p-24'>
            {headers.map((header) => (
              <TableCellStyledHead key={header}>{header}</TableCellStyledHead>
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            '& .MuiTableCell-root': {}
          }}
        >
          {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
            <TableRow key={row.name}>
              {headers.map((header) => (
                <TableCellStyled key={`${row.id}-${header}`}>{row[header.toLowerCase()]}</TableCellStyled>
              ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginationStyled
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page'
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

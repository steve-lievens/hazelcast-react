import React from 'react';
import {
  Pagination,
  Button,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableToolbar,
  TableToolbarContent,
} from 'carbon-components-react';

const AccountTable = ({ state, updateDataLoop, handlePagination }) => {
  return (
    <div>
      <DataTable
        isSortable={true}
        rows={state.rowsforpage}
        headers={state.headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          sortBy,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title={state.tableheader}>
            <TableToolbar>
              <TableToolbarContent>
                <Button
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onClick={() => updateDataLoop()}
                  size="small"
                  kind="primary">
                  Refresh
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <div style={{width: "100%", overflowX: "auto"}}>
              <Table useZebraStyles className="bx--data-table--short">
                <TableHead>
                  <TableRow>
                    {headers.map(header => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.id}
                      className={
                        row.cells[4].value === 'CR' ? 'credit' : 'deposit'
                      }>
                      {row.cells.map(cell => (
                        <TableCell className="wordwrap" key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
        )}
      />
      <Pagination
        backwardText="Previous page"
        disabled={false}
        forwardText="Next page"
        isLastPage={false}
        itemsPerPageText="Items per page:"
        onChange={e => handlePagination(e)}
        pageInputDisabled={false}
        pageNumberText="Page Number"
        pageSize={state.pageSize}
        pageSizes={state.pageSizes}
        pagesUnknown={false}
        totalItems={state.rows.length}
      />
    </div>
  );
};

export default AccountTable;

import { useState } from 'react';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';

import SearchNotFound from '../../../_common/table/searchNotFound';
import ListHead from '../../../_common/table/listHead';
import ListToolbar from '../../../_common/table/listToolbar';
import ListTableRow from './tableRow';
import { applySortFilter, getComparator } from './tableHelpers';
import { toast } from 'react-toastify';
import { updateReportStatus } from '../../../../helpers/api/contact/reviewReport';

export default function ListTable({
  data = [],
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isEmptyData = data.length === 0;
  // console.log(userData);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((item) => item.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, dataId) => {
    const selectedIndex = selected.indexOf(dataId);
    let newSelected = [];
    if (selectedIndex === -1) {
      // Newly selected
      newSelected = newSelected.concat(selected, dataId);
      // Else deselect
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName,
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleExecuteReport = (dataId) => () => {
    const toastLoadingId = toast.loading('Đang cập nhật');
    updateReportStatus(dataId, 'E')
      .then((res) => {
        toast.success('Cập nhật thành công');
        onUpdateSuccess(dataId, res.data.rvReport);
      })
      .catch(() => {
        toast.error('Lỗi cập nhật');
      })
      .finally(() => {
        toast.dismiss(toastLoadingId);
      });
  };

  const handleSkipReport = (dataId) => () => {
    const toastLoadingId = toast.loading('Đang cập nhật');
    updateReportStatus(dataId, 'S')
      .then((res) => {
        toast.success('Cập nhật thành công');
        onUpdateSuccess(dataId, res.data.rvReport);
      })
      .catch(() => {
        toast.error('Lỗi cập nhật');
      })
      .finally(() => {
        toast.dismiss(toastLoadingId);
      });
  };

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <TableContainer>
        <Table stickyHeader>
          <ListHead
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={data.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            selectAll={false}
          />
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                // IMPORTANCE: EDIT SELECTED ITEM HERE
                const { id } = row;
                const isItemSelected = selected.indexOf(id) !== -1;

                return (
                  <ListTableRow
                    key={row.id}
                    row={row}
                    selected={isItemSelected}
                    handleClick={handleClick}
                    onExecuteReport={handleExecuteReport(id)}
                    onSkipReport={handleSkipReport(id)}
                  />
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {isUserNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound
                    isEmpty={isEmptyData}
                    searchQuery={filterName}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'review', label: 'Bài đánh giá', alignRight: false },
  { id: 'reason', label: 'Báo cáo', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: 'title', label: 'Bài đăng', alignRight: false },
  { id: '', label: 'Hành động', alignRight: false },
];

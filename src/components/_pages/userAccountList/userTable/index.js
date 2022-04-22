import { useState } from 'react';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import { filter } from 'lodash';

import { toast } from 'react-toastify';
import AdminUsersAPI from '../../../../helpers/api/admin/users';

import SearchNotFound from '../../../_common/userTable/searchNotFound';

import UserListHead from '../../../_common/userTable/userListHead';
import UserListToolbar from '../../../_common/userTable/userListToolbar';
import UserTableRow from './tableRow';
import removeSigns from '../../../../helpers/format/removeSigns';

export default function AdminListTable({
  userData = [],
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isEmptyData = userData.length === 0;
  // console.log(userData);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];
    if (selectedIndex === -1) {
      // Newly selected
      newSelected = newSelected.concat(selected, userId);
      // Else deselect
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
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

  const handleDelete = (userId) => () => {
    //Delete
    const userInfo = userData.find((x) => x.id === userId);
    const updateData = {
      status: (userInfo.status === 'A') ? 'D' : 'A'
    }
    const toastLoadingId = toast.loading('Đang cập nhật');
    AdminUsersAPI.editUser(userId, updateData)
    .then((res) => {
      toast.success('Cập nhật thành công');
      onUpdateSuccess(userId, updateData)
    })
    .catch(() => {
      toast.error('Lỗi cập nhật');
    })
    .finally(() => {
      toast.dismiss(toastLoadingId);
    })
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const filteredUsers = applySortFilter(userData, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer>
            <Table stickyHeader>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userData.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // IMPORTANCE: EDIT SELECTED ITEM HERE
                    const { id } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={isItemSelected}
                        handleClick={handleClick}
                        handleDelete={handleDelete(id)}
                      />
                    )
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
            count={userData.length}
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
  { id: 'fullname', label: 'Họ tên', alignRight: false },
  { id: 'email', label: 'Email/Username', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: 'account_type', label: 'Loại tài khoản', alignRight: false },
  { id: 'createdAt', label: 'Thời gian tạo', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Search with 'fullname'
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array, 
      // Search with 'fullname', edit below
      (_data) => removeSigns(_data.fullname).toLowerCase().indexOf(
        removeSigns(query).toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

import { Box, Paper, Typography } from '@mui/material';
import DataAddForm from '../dataAddForm';
import DataListItem from './listItem/listItem';

export default function DataList({
  data = [],
  onAddDataSuccess = () => {},
  onEditDataSuccess = () => {},
  onAddSubDataSuccess = () => {},
  onEditSubDataSuccess = () => {},
  handleDeleteSubData = () => {},
  //
}) {
  return (
    <Box mt={2}>
      <Paper>
        <Box p={1}>
          <Typography variant='body2'>Thêm tỉnh / thành phố</Typography>
          <Typography variant='caption'>
            (Sẽ không xóa được sau khi tạo và người dùng sẽ chỉ thấy được khi có
            một quận / huyện thuộc tỉnh / thành phố này)
          </Typography>
          <DataAddForm onSuccess={onAddDataSuccess} />
        </Box>
      </Paper>
      <Box mx={2} mt={2}>
        <Typography variant='body1'>
          <b>Danh sách tỉnh / thành phố</b>
        </Typography>
      </Box>
      <Box mt={1}>
        {data.map((row) => (
          <DataListItem
            key={row.id}
            data={row}
            onEditDataSuccess={onEditDataSuccess}
            onAddSubDataSuccess={onAddSubDataSuccess}
            onEditSubDataSuccess={onEditSubDataSuccess}
            handleDeleteSubData={handleDeleteSubData}
          />
        ))}
      </Box>
    </Box>
  );
}

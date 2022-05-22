import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DataSubListItem from './subListItem';
import SubDataAddForm from './subDataAddForm';
import DataEditForm from './editForm';

export default function DataListItem({
  data = {},
  onEditDataSuccess = () => {},
  onAddSubDataSuccess = () => {},
  onEditSubDataSuccess = () => {},
  handleDeleteSubData = () => {},
}) {
  const formattedData = data || {};
  const dataName = formattedData.name || '';
  const subData = formattedData.districts || [];
  const subDataLength = subData.length;

  const handleEditSubDataSuccess = (subDataId, newData) => {
    onEditSubDataSuccess(formattedData.id, subDataId, newData);
  };

  const handleAddSubDataSuccess = (newData) => {
    onAddSubDataSuccess(formattedData.id, newData);
  };

  const onHandleDeleteSubData = (subDataId) => {
    handleDeleteSubData(formattedData.id, subDataId);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <b>{dataName}</b>
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {subDataLength} quận / huyện
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper variant='outlined'>
          <Box p={1}>
            <Typography variant='body2'>Chỉnh sửa</Typography>
            <DataEditForm data={formattedData} onSuccess={onEditDataSuccess} />
          </Box>
        </Paper>
        <Box mt={1} mx={1}>
          <Typography>
            <b>Danh sách quận huyện</b>
          </Typography>
        </Box>
        <Paper>
          <Box p={1}>
            <Typography variant='body2'>Thêm quận / huyện</Typography>
            <SubDataAddForm
              dataId={formattedData.id}
              onSuccess={handleAddSubDataSuccess}
            />
          </Box>
        </Paper>
        {subData.map((row) => (
          <DataSubListItem
            key={row.id}
            provinceId={formattedData.id}
            data={row}
            onEditSuccess={handleEditSubDataSuccess}
            handleDelete={onHandleDeleteSubData}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SubDataEditForm from './editForm';

export default function DataSubListItem({
  data = {},
  onEditSuccess = () => {},
  handleDelete = () => {},
}) {
  const formattedData = data || {};
  const dataName = formattedData.name || '';
  return (
    <Accordion>
      <AccordionSummary expandIcon={<EditIcon />}>
        <Typography>{dataName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper variant='outlined'>
          <Box p={1}>
            <Typography variant='subtitle2'>Chỉnh sửa</Typography>
            <Grid
              container
              spacing={2}
              alignItems='center'
              justifyContent='center'
            >
              <Grid item lg={11} xs={12}>
                <SubDataEditForm
                  data={formattedData}
                  onSuccess={onEditSuccess}
                />
              </Grid>
              <Grid item lg={1} xs={12}>
                <Button
                  fullWidth
                  color='error'
                  variant='contained'
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(formattedData.id)}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

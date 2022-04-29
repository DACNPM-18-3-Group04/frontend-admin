import { Box, Paper, Container, Typography, Grid } from '@mui/material';
import AdInfoEditForm from './adInfoForm/inputForm';
import AuthorInfoDisplay from './authorInfo';
import BasicInfoEditForm from './basicInfoForm/inputForm';
import PropertyEditForm from './propertyForm/inputForm';

export default function EditFormPanel({
  dataInfo = {},
  handleRefresh = () => {},
  onUpdateSuccess = () => {},
}) {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item container lg={8} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Thông tin cơ bản</Typography>
                <Box>
                  <BasicInfoEditForm
                    dataInfo={dataInfo}
                    onSuccess={onUpdateSuccess}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Thông tin tin rao</Typography>
                <Box>
                  <AdInfoEditForm
                    dataInfo={dataInfo}
                    onSuccess={onUpdateSuccess}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Typography>Thông tin bất động sản</Typography>
                <Box>
                  <PropertyEditForm
                    dataInfo={dataInfo}
                    onSuccess={onUpdateSuccess}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
          order={{ xs: 1, lg: 2 }}
          container
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper>
              <Box padding={2}>
                <Box>
                  <AuthorInfoDisplay dataInfo={dataInfo} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

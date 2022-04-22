import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import CustomThemeProvider from './theme';
import store from '../../redux/store';
import FetchSignedInUser from './fetcher/fetchSignedInUser';
import FetchPropertyLocation from './fetcher/fetchPropertyLocation';
import { BrowserRouter } from 'react-router-dom';
import Router from '../_router';

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <FetchSignedInUser>
          <FetchPropertyLocation />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </FetchSignedInUser>
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;

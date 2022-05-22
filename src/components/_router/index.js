import { Route, Switch, Redirect } from 'react-router-dom';
import AuthOnlyRoute from './customRoute/authOnlyRoute';
import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../_pages/notfound';
import SignInPage from '../_pages/signin';
import UserInfoPage from '../_pages/userinfo';
import UserAccountList from '../_pages/userAccountList';
import DefaultLayout from '../_layout/default';
import UserSingle from '../_pages/userSingle';
import PropertyList from '../_pages/propertyList';
import PropertySingle from '../_pages/propertySingle';
import LocationList from '../_pages/locationList';
import ReviewReport from '../_pages/reviewReport';
import SubServiceLocationList from '../_pages/service.locationList';

// Pages

function Router() {
  return (
    <Switch>
      <NonAuthOnlyRoute exact path='/signin'>
        <SignInPage />
      </NonAuthOnlyRoute>
      <AuthOnlyRoute exact path='/dashboard'>
        <Redirect to='/users' />
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/profile'>
        <DefaultLayout>
          <UserInfoPage />
        </DefaultLayout>
      </AuthOnlyRoute>

      <AuthOnlyRoute exact path='/locations'>
        <LocationList />
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/services/locations'>
        <SubServiceLocationList />
      </AuthOnlyRoute>

      <AuthOnlyRoute exact path='/users'>
        <UserAccountList />
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/user/:userId'>
        <DefaultLayout>
          <UserSingle />
        </DefaultLayout>
      </AuthOnlyRoute>

      <AuthOnlyRoute exact path='/p'>
        <PropertyList />
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/p/:propertyId'>
        <DefaultLayout>
          <PropertySingle />
        </DefaultLayout>
      </AuthOnlyRoute>

      <AuthOnlyRoute path='/review/rp'>
        <ReviewReport />
      </AuthOnlyRoute>

      <Route exact path='/notfound'>
        <NotFoundPage />
      </Route>
      <Route exact path='/'>
        <Redirect to='/dashboard' />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Router;

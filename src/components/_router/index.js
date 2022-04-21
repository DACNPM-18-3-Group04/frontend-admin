import { Route, Switch, Redirect } from 'react-router-dom';
import AuthOnlyRoute from './customRoute/authOnlyRoute';
import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../_pages/notfound';
import SignInPage from '../_pages/signin';
import UserInfoPage from '../_pages/userinfo';
import UserAccountList from '../_pages/userList';
import DefaultLayout from '../_layout/default';
// import UserSingle from '../_pages/userSingle';
// import ClassSingle from '../_pages/classSingle';

// Pages

function Router() {
  return (
    <Switch>
      <NonAuthOnlyRoute exact path='/signin'>
        <SignInPage/>
      </NonAuthOnlyRoute>
      <AuthOnlyRoute exact path='/dashboard'>
        <Redirect to='/users'/>
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/profile'>
        <DefaultLayout>
          <UserInfoPage />
        </DefaultLayout>
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/users'>
        {/* List users */}
        <UserAccountList />
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/user/:userId'>
        {/* Edit single user */}
        {/* <UserSingle /> */}
      </AuthOnlyRoute>
      <AuthOnlyRoute exact path='/p'>
        {/* List property */}
      </AuthOnlyRoute>
      <AuthOnlyRoute path='/p/:propertyId'>
        {/* Edit single property */}
      </AuthOnlyRoute>

      <Route exact path='/notfound'>
        <NotFoundPage/>
      </Route>
      <Route exact path='/'>
        <Redirect to='/dashboard'/>
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  )
}

export default Router;

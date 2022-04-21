import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';

export default function AuthorizationRoute({
  path,
  exact = false,
  children,
  authRequired = true,  // If false: only non-signed in users can go to, else go to alternative
                        // If true: only signed in users can go to, else go to alternative
  alternativePath = '/',
  location,
}) {
  const user = useSelector(selectUser);
  let goToPath = path;
  let goToPathExact = exact;

  return (
    <Route
      path={goToPath}
      exact={goToPathExact}
    >
      {(user.isLogin === authRequired) 
      ? children 
      : <Redirect to={{ 
          pathname: alternativePath, 
          state: {
            from: location
          } 
       }}
      />}
    </Route>
  )
}

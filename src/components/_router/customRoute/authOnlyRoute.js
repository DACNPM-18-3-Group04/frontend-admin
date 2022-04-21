import AuthorizationRoute from "./authorizationRoute";

/**
 * Wrapper for authorization route for ease of use
 */
export default function AuthOnlyRoute({
  path,
  exact = false,
  children,
  alternativePath = '/signin',
  location
}) {

  return (
    <AuthorizationRoute
      path={path}
      exact={exact}
      alternativePath={alternativePath}
      location={location}
    >
      {children}
    </AuthorizationRoute>
  )
}

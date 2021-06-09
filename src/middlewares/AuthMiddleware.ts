import AuthenticationService from '../domain/Authentication/authentication.service';

export async function authUserMiddleware(req, res, next) {
  const authenticationService = new AuthenticationService();
  const isAuthenticated = await authenticationService.verify(req);
  if (!isAuthenticated) {
    return res.status(401).json({
      msg: 'Não autorizado',
    });
  }

  next();
}

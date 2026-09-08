import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  console.log(
    '[JWT] Token:',
    token ? 'ENCONTRADO' : 'NÃO ENCONTRADO'
  );

  if (!token) {
    return next(req);
  }

  const reqComToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('[JWT] Authorization enviado');

  return next(reqComToken);
};
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { refCount } from 'rxjs';

export const jwtInterceptor:
  HttpInterceptorFn = (req, next) => {

  const token =
    localStorage.getItem('token');

  console.log(
    '[JWT] Token:',
    token ? 'ENCONTRADO' : 'NÃO ENCONTRADO'
  );

  

  if (token) {

    const reqComToken =
      req.clone({

        setHeaders: {

          Authorization:
            `Bearer ${token}`,

        },
      });

    return next(reqComToken);
  }

  return next(req);
};
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt.interceptor'; // Certifique-se que a importação está em letra minúscula se for uma função

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registra o interceptor funcional de forma direta
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};
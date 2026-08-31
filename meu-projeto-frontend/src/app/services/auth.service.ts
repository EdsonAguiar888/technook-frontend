

import { Injectable } from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
  tap,
} from 'rxjs';

export enum Role {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(
    email: string,
    senha: string
  ): Observable<any> {

    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        {
          email,
          senha,
        }
      )
      .pipe(

        tap(res => {

          console.log(
            'Resposta do login:',
            res
          );

          localStorage.setItem(
            'token',
            res.access_token
          );

          localStorage.setItem(
            'user_role',
            res.role
          );
        })
      );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }

  getRole(): Role | null {

    return localStorage.getItem(
      'user_role'
    ) as Role | null;
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user_role');
  }
}












// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// export enum Role {
//   ADMIN = 'admin',
//   USUARIO = 'usuario',
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/auth';

//   constructor(private http: HttpClient) {}

//   login(email: string, senha: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
//       tap(res => {
//         // Salva o token e o perfil no localStorage do navegador ao autenticar
//         localStorage.setItem('token', res.access_token);
//         localStorage.setItem('user_role', res.role);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.clear();
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getRole(): Role | null {
//     return localStorage.getItem('user_role') as Role;
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken(); // Retorna true se houver token salvo
//   }
// }
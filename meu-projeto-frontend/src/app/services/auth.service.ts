



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';



export enum Role {
  ADMIN = 'admin', USUARIO = 'usuario'
}

interface LoginResponse {
  access_token: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/auth';
  

  constructor(
    private http: HttpClient
  ) { }

  login(
    email: string,
    senha: string
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        {
          email,
          senha
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

          localStorage.setItem(
            'user_email',
            email.trim().toLowerCase()
          );

          console.log(
            '[AUTH] Token salvo'
          );

          console.log(
            '[AUTH] Role:',
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

  getEmail(): string | null {

    return localStorage.getItem(
      'user_email'
    );
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  isAdmin(): boolean {

    return this.getRole() === Role.ADMIN;
  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user_role');

    localStorage.removeItem('user_email');
  }
}
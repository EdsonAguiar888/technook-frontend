



import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';

import {
  AuthService,
  Role
} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {

    // 1. Verifica se está logado
    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);

      return false;
    }

    // 2. Pega as roles permitidas na rota
    const rolesPermitidas =
      route.data['roles'] as Role[] | undefined;

    // 3. Se a rota não possui restrição de role,
    // qualquer usuário logado pode acessar
    if (!rolesPermitidas) {
      return true;
    }

    // 4. Descobre a role do usuário logado
    const roleUsuario =
      this.authService.getRole();

    // 5. Verifica se a role está autorizada
    if (
      !roleUsuario ||
      !rolesPermitidas.includes(roleUsuario)
    ) {

      alert('Acesso negado: você não possui permissão.');

      return false;
    }

    // 6. Está logado e possui permissão
    return true;
  }
}

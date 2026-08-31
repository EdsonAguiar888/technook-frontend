



import {
  Injectable
} from '@angular/core';

import {
  CanActivate,
  Router,
} from '@angular/router';

import {
  AuthService
} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard
  implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (
      !this.authService.isLoggedIn()
    ) {

      this.router.navigate([
        '/login'
      ]);

      return false;
    }

    return true;
  }
}
























// // import { Injectable } from '@nestjs/common';
// // import { AuthGuard } from '@nestjs/passport';

// // @Injectable()
// // export class JwtAuthGuard extends AuthGuard('jwt') {}







// // import { Injectable } from '@angular/core';
// // import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
// // import { AuthService, Role } from '../services/auth.service';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthGuard implements CanActivate {
// //   constructor(private authService: AuthService, private router: Router) {}

// //   canActivate(route: ActivatedRouteSnapshot): boolean {
// //     if (!this.authService.isLoggedIn()) {
// //       this.router.navigate(['/login']);
// //       return false;
// //     }

// //     const expectedRoles: Role[] = route.data['roles'];
// //     const userRole = this.authService.getRole();

// //     if (expectedRoles && userRole && !expectedRoles.includes(userRole)) {
// //       alert('Acesso negado: Perfil sem permissão.');
// //       return false;
// //     }

// //     return true;
// //   }
// // }





// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const estaLogado = this.authService.isLoggedIn();


//     console.log('--- AUTH GUARD EXECUTADO ---');
//     console.log('Tentando acessar a URL:', state.url);
//     console.log('Status de Autenticação:', estaLogado);






//     if (!estaLogado) {





//       console.log('Acesso negado. Redirecionando para /login...');




//       // Evita redirecionar se o usuário JÁ ESTIVER indo para a tela de login
//       if (state.url !== '/login') {
//         this.router.navigate(['/login']);
//       }
//       return false;
//     }

//     return true;
//   }
// }
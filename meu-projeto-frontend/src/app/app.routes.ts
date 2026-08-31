



import {
  Routes
} from '@angular/router';

import {
  LoginComponent
} from './components/login/login.component';

import {
  TarefaListaComponent
} from './tarefas/TarefaListaComponent/tarefa-lista';

import {
  AuthGuard
} from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'tarefas',
    component: TarefaListaComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];















// import { Routes } from '@angular/router';
// import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
// import { GraficosApexComponent } from './tarefas/graficos-apex/graficos-apex';
// import { AuthGuard } from './guards/auth.guard';
// import { LoginComponent } from './components/login/login.component';


// export const routes: Routes = [
  
//   // { path: '', component: TarefaListaComponent },
//   // { path: '**', redirectTo: '' }
  
//   { path: 'graficos',
//     component: GraficosApexComponent 
//   },
  
//   { 
//     path: 'login', 
//     component: LoginComponent 
//   },
//   { 
//     path: 'tarefas', 
//     component: TarefaListaComponent, 
//     canActivate: [AuthGuard] 
//   },
//   { 
//     path: '', 
//     redirectTo: 'login', 
//     pathMatch: 'full' 
//   },
//   { 
//     path: '**', 
//     redirectTo: 'login' 
//   }

// ];

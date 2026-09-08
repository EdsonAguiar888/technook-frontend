



import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
import { GraficosApexComponent } from './tarefas/graficos-apex/graficos-apex';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'tarefas',
    component: TarefaListaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'graficos',
    component: GraficosApexComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
      // roles: ['admin', 'usuario']
    }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
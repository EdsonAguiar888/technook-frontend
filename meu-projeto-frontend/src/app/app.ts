import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TarefaListaComponent } from './tarefas/TarefaListaComponent/tarefa-lista';
import { CommonModule } from '@angular/common';

// 1. Importe RouterLink e RouterLinkActive


@Component({
  selector: 'app-root',
  standalone: true,
  imports:
    [
      // TarefaListaComponent,
      CommonModule,
      RouterOutlet,
      // RouterLink, 
      // RouterLinkActive
      
    ],
  // template: '<router-outlet></router-outlet>',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'meu-projeto-frontend';
  // protected readonly title = signal('meu-projeto-frontend');
}

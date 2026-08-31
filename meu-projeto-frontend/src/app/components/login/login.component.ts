import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // 👈 Importe o CommonModule (resolve o *ngIf)
import { FormsModule } from '@angular/forms';   // 👈 Importe o FormsModule (resolve o [(ngModel)])

@Component({
  selector: 'app-login',
  standalone: true, // 👈 Indica que o componente é Standalone

  imports: [
    CommonModule, // 👈 Adicione aqui
    FormsModule   // 👈 Adicione aqui
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Garante atualização imediata do estado visual
  ) {

    console.log('--- LOGIN COMPONENT INICIALIZADO COM SUCESSO ---'); // 👈 Log de Rastreio
  }

  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/tarefas']); // Redireciona após login com sucesso
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'E-mail ou senha incorretos.';
        this.cdr.detectChanges();
      }
    });
  }
}


import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id?: string;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/tarefas';

  // Listar tarefas com filtros opcionais (GET /tarefas?status=X&prioridade=Y)
  listar(status?: string, prioridade?: string): Observable<Tarefa[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (prioridade) params = params.set('prioridade', prioridade);

    return this.http.get<Tarefa[]>(this.API_URL, { params });
  }

  // Buscar por ID (GET /tarefas/:id)
  buscarPorId(id: string): Observable<Tarefa> {


    console.log('Tipo do ID:', typeof id);
    return this.http.get<Tarefa>(`${this.API_URL}/${id}`);
    console.log("angular" +id);
  }

  // Criar nova tarefa (POST /tarefas)
  criar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API_URL, tarefa);
  }

  // Deletar tarefa (DELETE /tarefas/:id)
  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Atualizar tarefa (PUT /tarefas/:id)
atualizar(id: string, tarefa: Partial<Tarefa>): Observable<Tarefa> {
  return this.http.put<Tarefa>(`${this.API_URL}/${id}`, tarefa);
}
}
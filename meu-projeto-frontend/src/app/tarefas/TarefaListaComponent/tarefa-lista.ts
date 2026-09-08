



// src/app/tarefas/tarefa-lista/tarefa-lista.ts

import { ChangeDetectorRef, Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService, Tarefa } from '../tarefa.service';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { AuthService } from '../../services/auth.service';
// import { RouterLink, RouterLinkActive } from '@angular/router';





@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  // imports: [CommonModule, FormsModule, BaseChartDirective, RouterLink, RouterLinkActive],
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css'
})
export class TarefaListaComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  private cd = inject(ChangeDetectorRef); // 2. Injete aqui
  private zone = inject(NgZone);


  constructor(
    // private tarefaService: TarefaService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef  //Declara e injeta o serviço ChangeDetectorRef na instância do componente com o nome de variável cdr
  ) { }


    isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }


  tarefas: Tarefa[] = [];
  tarefaDetalhes?: Tarefa;


  novaTarefa: Tarefa = {
    titulo: '',
    descricao: '',
    prioridade: 'baixa',
    status: 'ABERTA'
  };

  filtroStatus = '';
  filtroPrioridade = '';
  buscaId = '';




  /////////////////////////////////////////////////////////////////////////////
  ///////////// --- CONTROLE DO MODAL DE EDIÇÃO --- ///////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  exibirModalEditar = false;


  // Objeto isolado APENAS para o Modal de Edição
  tarefaParaEditar: {
    id: string;
    titulo: string;
    descricao: string;
    status: 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
    prioridade: 'baixa' | 'media' | 'alta';
  } = {
      id: '',
      titulo: '',
      descricao: '',
      status: 'ABERTA',
      prioridade: 'baixa'
    };

  // 1. Abre o Modal e copia a tarefa para o objeto do modal
  abrirModalEdicao(tarefa: Tarefa): void {

    if (!tarefa.id) {
      console.error('Tarefa sem id não pode ser editada.');
      return;

    }

    this.tarefaParaEditar = {
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status as 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA',
      prioridade: tarefa.prioridade as 'baixa' | 'media' | 'alta'
    };
    this.exibirModalEditar = true;
    this.cd.detectChanges();
  }

  // 2. Fecha o Modal sem alterar nada
  fecharModalEdicao(): void {
    this.exibirModalEditar = false;
  }

  // 3. Envia os dados do Modal para a API NestJS via PUT
  salvarEdicaoModal(): void {
    const { id, ...dadosAtualizados } = this.tarefaParaEditar;

    this.tarefaService.atualizar(id, dadosAtualizados).subscribe({
      next: () => {

        this.zone.run(() => {
          this.exibirModalEditar = false;
          this.fecharModalEdicao();
          this.carregarTarefas(); // Recarrega a lista e atualiza os gráficos!
        });
      },
      error: (err) => console.error('Erro ao atualizar tarefa pelo modal:', err)
    });
  }


  /////////////////////////////////////////////////////////////////////////////
  /////////// --- CONFIGURAÇÃO DO GRÁFICO DE DISCO (STATUS) --- ///////////////
  /////////////////////////////////////////////////////////////////////////////

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'] // Vermelho, Amarelo, Verde
      }
    ]
  };


  /////////////////////////////////////////////////////////////////////////////
  /////////// --- CONFIGURAÇÃO DO GRÁFICO DE BARRAS (PRIORIDADE) --- //////////
  /////////////////////////////////////////////////////////////////////////////

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Baixa', 'Média', 'Alta'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#3498db', '#e67e22', '#9b59b6']
      }
    ]
  };




  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.listar(this.filtroStatus, this.filtroPrioridade).subscribe({
      next: (dados) => {
        console.log('Tarefas recebidas da API:', dados);
        this.tarefas = dados;


        this.atualizarDadosGraficos();


        this.cd.detectChanges(); // 3. Força a atualização da tela
      },
      error: (err) => console.error('Erro na requisição GET /tarefas:', err)
    });
  }




  ////////////////////////////////////////////////////////////////////////////////////
  /// --- Processa a contagem de tarefas e atualiza os datasets dos gráficos --- ////
  //////////////////////////////////////////////////////////////////////////////////

  atualizarDadosGraficos(): void {
    const statusCounts = { ABERTA: 0, EM_ANDAMENTO: 0, CONCLUIDA: 0 };
    const prioridadeCounts = { baixa: 0, media: 0, alta: 0 };

    this.tarefas.forEach(t => {
      if (t.status in statusCounts) statusCounts[t.status as keyof typeof statusCounts]++;
      if (t.prioridade in prioridadeCounts) prioridadeCounts[t.prioridade as keyof typeof prioridadeCounts]++;
    });

    // Atualiza o gráfico de Rosca/Disco
    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{ ...this.doughnutChartData.datasets[0], data: [statusCounts.ABERTA, statusCounts.EM_ANDAMENTO, statusCounts.CONCLUIDA] }]
    };

    // Atualiza o gráfico de Barras
    this.barChartData = {
      ...this.barChartData,
      datasets: [{ ...this.barChartData.datasets[0], data: [prioridadeCounts.baixa, prioridadeCounts.media, prioridadeCounts.alta] }]
    };
  }


  /////////////////////////////////////////////////////////////////////////////
  ////////////////// --- EVENTOS DE CLIQUE INTERATIVOS --- ////////////////////
  /////////////////////////////////////////////////////////////////////////////

  aoClicarStatus(event: { event?: ChartEvent; active?: object[] }): void {
    if (event.active && event.active.length > 0) {
      const activeElement = event.active[0] as { index: number };
      const statusSelecionado = this.doughnutChartData.labels?.[activeElement.index] as string;

      console.log('Status clicado no gráfico:', statusSelecionado);
      this.filtroStatus = statusSelecionado;
      this.carregarTarefas();
    }
  }

  aoClicarPrioridade(event: { event?: ChartEvent; active?: object[] }): void {
    if (event.active && event.active.length > 0) {
      const activeElement = event.active[0] as { index: number };
      const prioridadeSelecionada = (this.barChartData.labels?.[activeElement.index] as string).toLowerCase();

      console.log('Prioridade clicada no gráfico:', prioridadeSelecionada);
      this.filtroPrioridade = prioridadeSelecionada;
      this.carregarTarefas();
    }
  }



































  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- Metodos --- //////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////


  buscarPorId(): void {
    const id = this.buscaId.trim();
    if (!id) {
      alert('Digite um ID para buscar!');
      return;
    }
    
    this.tarefaService.buscarPorId(id).subscribe({
      next: (dados) => {        
        this.tarefaDetalhes = dados;
        this.cdr.detectChanges(); //Força a atualização visual imediata no DOM/HTML
      },

      error: (err) => {
        console.error('Erro na requisição GET por ID:', err);
        alert('Tarefa não encontrada com o ID informado! Tipo: ' + typeof id);

        this.cdr.detectChanges(); //Força a atualização visual imediata no DOM/HTML
      }
    });
  }

  limparBuscaId(): void {
    this.tarefaDetalhes = undefined;
    this.buscaId = '';
  }

  cadastrarTarefa(): void {
    if (!this.novaTarefa.titulo.trim()) return;

    this.tarefaService.criar(this.novaTarefa).subscribe({
      next: (res) => {
        console.log('Tarefa criada:', res);
        this.carregarTarefas();
        this.novaTarefa = { titulo: '', descricao: '', prioridade: 'baixa', status: 'ABERTA' };
      },
      error: (err) => console.error('Erro ao cadastrar:', err)
    });
  }

  excluirTarefa(id?: string): void {
    if (!id || !confirm('Deseja realmente excluir esta tarefa?')) return;

    this.tarefaService.deletar(id).subscribe({
      next: () => {
        console.log('Tarefa excluída');
        this.carregarTarefas();
      },
      error: (err) => console.error('Erro ao deletar:', err)
    });
  }
}
import { Component, ElementRef, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts'; // 1. Importa a biblioteca ApexCharts pura
import { TarefaService, Tarefa } from '../tarefa.service'; // 2. Ajuste o caminho do seu service
import type { ApexOptions } from 'apexcharts'; // 3. Importa o tipo ApexOptions

@Component({
  selector: 'app-graficos-apex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graficos-apex.html',
  styleUrl: './graficos-apex.css'
})
export class GraficosApexComponent implements AfterViewInit {

  // 3. Captura as divs do HTML onde os gráficos serão renderizados
  @ViewChild('chartStatus') chartStatusRef!: ElementRef;
  @ViewChild('chartPrioridade') chartPrioridadeRef!: ElementRef;
  @ViewChild('chartAtivas') chartAtivasRef!: ElementRef;  //Captura a div do novo gráfico de tarefas ativas
  @ViewChild('chartEvolucao') chartEvolucaoRef!: ElementRef;

  private tarefaService = inject(TarefaService);
  
  // Instâncias dos gráficos para podermos renderizar/destruir
  private chartStatusInstance?: ApexCharts; // Instancia grafico de Tarefas Status
  private chartPrioridadeInstance?: ApexCharts; // Instancia grafico de Tarefas Prioridade
  private chartAtivasInstance?: ApexCharts; // Instância gráfico de tarefas ativas
  private chartEvolucaoInstance?: ApexCharts; // Intancia o Grafico de Evolucao

  // 4. Ciclo de vida do Angular: Executa logo após a tela e as divs estarem prontas no DOM
  ngAfterViewInit(): void {
    this.carregarDadosEConfigurarGraficos();
  }

  carregarDadosEConfigurarGraficos(): void {
    this.tarefaService.listar().subscribe({
      next: (tarefas: Tarefa[]) => {

        // Total de tarefas
        const totalTarefas = tarefas.length;

        // =========== Contagem de tarefas por Status ==================================
        const qtdAberta = tarefas.filter(t => t.status === 'ABERTA').length;
        const qtdEmAndamento = tarefas.filter(t => t.status === 'EM_ANDAMENTO').length;
        const qtdConcluida = tarefas.filter(t => t.status === 'CONCLUIDA').length;

        // Contagem de tarefas por Prioridade
        const qtdBaixa = tarefas.filter(t => t.prioridade === 'baixa').length;
        const qtdMedia = tarefas.filter(t => t.prioridade === 'media').length;
        const qtdAlta = tarefas.filter(t => t.prioridade === 'alta').length;


        //========= Cálculo das Tarefas Ativas (Aberta + Em Andamento)=============
        const qtdAtivas = qtdAberta + qtdEmAndamento;          
        // Percentual de tarefas ativas em relação ao total
        const percentualAtivas = totalTarefas > 0 
          ? Math.round((qtdAtivas / totalTarefas) * 100) 
          : 0;

          // Renderiza os gráficos nas divs capturadas
        this.renderizarGraficoStatus(qtdAberta, qtdEmAndamento, qtdConcluida);
        this.renderizarGraficoPrioridade(qtdBaixa, qtdMedia, qtdAlta);
        this.renderizarGraficoAtivas(qtdAtivas, percentualAtivas);

        //================Grafico de Evolucao ==========================
        // Exemplo: Agrupando tarefas pelos últimos 7 dias da semana
        const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        
        // Simulação/Contagem de quantidade de tarefas criadas em cada dia
        // (Se você tiver um campo criadoEm na tarefa, pode agrupar por data real)
        const totalPorDia = [2, 5, 3, 8, 4, 6, 9];

        // Chama a função para desenhar o novo gráfico
        this.renderizarGraficoEvolucao(diasSemana, totalPorDia);

       
     
      },
      error: (err) => console.error('Erro ao carregar dados para os gráficos:', err)
    });
  }

  //  Gráfico 1: Donut (Status)
  private renderizarGraficoStatus(aberta: number, emAndamento: number, concluida: number): void {
    const options: ApexOptions = {
      series: [aberta, emAndamento, concluida],
      labels: ['Aberta', 'Em Andamento', 'Concluída'],
      chart: {
        type: 'donut',
        height: 320
      },
      colors: ['#e74c3c', '#f39c12', '#2ecc71'],
      title: {
        text: 'Tarefas por Status',
        align: 'left'
      },
      legend: {
        position: 'bottom'
      }
    };

    // Cria a instância do ApexCharts apontando para a div nativa
    this.chartStatusInstance = new ApexCharts(this.chartStatusRef.nativeElement, options);
    this.chartStatusInstance.render();
  }

  //  Gráfico 2: Barras (Prioridade)
  private renderizarGraficoPrioridade(baixa: number, media: number, alta: number): void {
    const options: ApexOptions = {
      series: [{
        name: 'Quantidade',
        data: [baixa, media, alta]
      }],
      chart: {
        type: 'bar',        
        height: 320
      },
      xaxis: {
        categories: ['Baixa', 'Média', 'Alta']
      },
      colors: ['#189c39'], 
      title: {
        text: 'Tarefas por Prioridade',
        align: 'left'
      }
    };

    this.chartPrioridadeInstance = new ApexCharts(this.chartPrioridadeRef.nativeElement, options);
    this.chartPrioridadeInstance.render();
  }

  // Gráfico 3: Tarefas Ativas (RadialBar)
  private renderizarGraficoAtivas(qtdAtivas: number, percentual: number): void {
    const options: ApexOptions = {
      series: [percentual], // O RadialBar recebe um valor percentual de 0 a 100
      chart: {
        type: 'radialBar',
        height: 320
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%' // Tamanho do círculo interno
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              color: '#333',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '22px',
              color: '#2980b9',
              formatter: () => `${qtdAtivas} tarefas` // Exibe a quantidade absoluta no centro
            }
          }
        }
      },
      colors: ['#3498db'], // Cor da barra de progresso
      labels: ['Tarefas Ativas'], // Rótulo central
      title: {
        text: 'Volume de Tarefas Ativas',
        align: 'left'
      }
    };

    this.chartAtivasInstance = new ApexCharts(this.chartAtivasRef.nativeElement, options);
    this.chartAtivasInstance.render();
  }

  // Gráfico 4: Evolução Temporal
  private renderizarGraficoEvolucao(categorias: string[], dados: number[]): void {
    const options: ApexOptions = {
      series: [
        {
          name: 'Novas Tarefas',
          data: dados
        }
      ],
      chart: {
        type: 'area', // Tipo Área com curvatura
        height: 320,
        toolbar: {
          show: false // Oculta o menu para manter o visual limpo
        }
      },
      stroke: {
        curve: 'smooth', // Curva suave (Spline)
        width: 3
      },
      colors: ['#8e44ad'], // Roxo elegante
      fill: {
        type: 'gradient', // Efeito de gradiente sob a linha
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: categorias
      },
      title: {
        text: 'Evolução de Novas Tarefas (Semanal)',
        align: 'left'
      }
    };

    this.chartEvolucaoInstance = new ApexCharts(this.chartEvolucaoRef.nativeElement, options);
    this.chartEvolucaoInstance.render();
  }






}
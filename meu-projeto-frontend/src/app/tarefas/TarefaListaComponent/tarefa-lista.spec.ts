import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaLista } from './tarefa-lista';

describe('TarefaLista', () => {
  let component: TarefaLista;
  let fixture: ComponentFixture<TarefaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

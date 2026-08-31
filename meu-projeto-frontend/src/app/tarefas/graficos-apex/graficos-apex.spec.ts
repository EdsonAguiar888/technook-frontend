import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosApex } from './graficos-apex';

describe('GraficosApex', () => {
  let component: GraficosApex;
  let fixture: ComponentFixture<GraficosApex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficosApex],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficosApex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

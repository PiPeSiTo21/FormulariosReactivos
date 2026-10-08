import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ListarClientes } from './listar-clientes';

describe('ListarClientes', () => {
  let component: ListarClientes;
  let fixture: ComponentFixture<ListarClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarClientes],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarClientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

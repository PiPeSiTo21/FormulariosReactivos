import { Routes } from '@angular/router';
import { Form } from './clientes/crear-cliente/form';
import {ListarClientes} from "./clientes/listar-clientes/listar-clientes";

export const routes: Routes = [
  {path: '', redirectTo: '/clientes/listarClientes', pathMatch: 'full'},
  { path: 'cliente/crearClientes', component: Form },
  { path: 'clientes/listarClientes', component: ListarClientes }
];

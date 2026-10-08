import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../servicios/cliente';

@Component({
  imports: [CommonModule, RouterLink, SweetAlert2Module],
  selector: 'app-listar-clientes',
  styleUrl: './listar-clientes.css',
  templateUrl: './listar-clientes.html',
})
export class ListarClientes implements OnInit {
  public clientes = signal<Cliente[]>([]);

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes.set(clientes);
      },
      error: (err) => {
        console.error('Error al listar clientes:', err.message);
      },
    });
  }
}

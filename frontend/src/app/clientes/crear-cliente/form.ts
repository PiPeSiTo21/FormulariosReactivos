import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClienteService } from '../servicios/cliente';
import { Cliente } from '../modelos/cliente';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SweetAlert2Module, HttpClientModule],
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form implements OnInit {
  public formulario!: FormGroup;
  public titulo: string = 'Crear Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      codigo: new FormControl('', [Validators.required, validarFormatocodigo()], [
        codigoDuplicadoValidator(this.clienteService),
      ]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, validarCorreoUnicauca()]),
    });
  }

  public crearCliente(): void {
    console.log('Creando cliente');
    const cliente = this.formulario.value as Cliente;
    this.clienteService.create(cliente).subscribe({
      next: (response) => {
        console.log('Cliente creado exitosamente');
        this.router.navigate(['/clientes/listarClientes']);
        Swal.fire('Nuevo cliente', `Cliente ${response.nombre} creado con éxito`, 'success');
      },
      error: (err) => {
        console.error('Error al crear cliente:', err.message);
      },
    });
  }
}

export function validarCorreoUnicauca(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null;
    }
    const dominio = '@unicauca.edu.co';
    return email.endsWith(dominio) ? null : { dominioInvalido: true };
  };
}

export function codigoDuplicadoValidator(clienteService: ClienteService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return clienteService.verificarCodigo(control.value).pipe(
      map((existe) => (existe ? { codigoDuplicado: true } : null)),
      catchError(() => of(null)),
    );
  };
}

function validarFormatocodigo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (!valor) {
      return null;
    }
    const valido = /^\d{3}456$/.test(valor);
    return valido ? null : { codigoInvalido: true };
  };
}

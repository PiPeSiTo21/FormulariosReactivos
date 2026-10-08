import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPoint: string = 'http://localhost:5000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    console.log('listando clientes desde el servicio');
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    console.log('creando cliente desde el servicio');
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders });
  }

  verificarCodigo(codigo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlEndPoint}/codigo/${codigo}`);
  }
}

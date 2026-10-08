import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  public nombres: String ="Andres Felipe";
  public apellidos: String = "Obando Quintero";
  public disciplina: String = "Soy desarrollador web especialista en node.js y en Experiencia de usuario";
  public descripcion: String = "Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web"
}
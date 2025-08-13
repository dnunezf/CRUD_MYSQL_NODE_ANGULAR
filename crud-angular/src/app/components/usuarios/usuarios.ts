/*OnInit para obtener la informacion de los usuario de forma inicial*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = { nombre: '', email: '' };
  editando: Boolean = false;
  idEditando: number | null = null;

  constructor(private usuarioService: UsuarioService) {}

  // Llamar de nuestro servicio la funcion para obtener los usuarios
  ngOnInit(): void {
    this.getUsuarios();
  }

  // Cargar usuarios desde el backend
  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Crear o actualizar un usuario
  guardarUsuario(): void {
    if (this.editando && this.idEditando != null) {
      // SI ESTAMOS EDITANDO, ENVIAREMOS LA SOLICITUD COMO UN PUT
      this.usuarioService
        .updateUsuario(this.idEditando, this.usuario)
        .subscribe(() => {
          this.getUsuarios();
          this.resetFormulario();
        });
    } else {
      // SI NO ESTAMOS EDITANDO, CREAMOS UN NUEVO USER
      this.usuarioService.addUsuario(this.usuario).subscribe(() => {
        this.getUsuarios();
        this.resetFormulario();
      });
    }
  }

  // LLENAR EL FORMULARIO CON LOS DATOS DEL USUARIO A EDITAR
  editar(usuario: Usuario): void {
    this.usuario = { ...usuario };
    this.editando = true;
    this.idEditando = usuario.id!;
  }

  // ELIMINAR UN USUARIO
  eliminar(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }

  // RESETEAR EL FORMULARIO A SU ESTADO ORIGINAL
  resetFormulario(): void {
    this.usuario = { nombre: '', email: '' };
    this.editando = false;
    this.idEditando = null;
  }
}

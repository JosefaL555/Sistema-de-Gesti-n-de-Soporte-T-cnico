import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { TicketNuevo } from '../../models/ticket';

@Component({
  selector: 'app-nuevo-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicketComponent {
    ticket: TicketNuevo = {
    asunto: '',
    descripcion: '',
    solicitante: '',
    categoria: 'Soporte Técnico',
    prioridad: 'Media',
    estado: 'Pendiente',
    fechaRegistro: ''
  };

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  guardarTicket(): void {
    this.ticketsService.crearTicket(this.ticket).subscribe({
      next: () => {
        alert('¡Ticket registrado con éxito!');
        this.router.navigate(['/tickets']); // O a la ruta principal de tu listado
      },
      error: (err) => {
        console.error('Error al crear el ticket:', err);
        alert('Hubo un error al registrar el ticket.');
      }
    });
  }
}
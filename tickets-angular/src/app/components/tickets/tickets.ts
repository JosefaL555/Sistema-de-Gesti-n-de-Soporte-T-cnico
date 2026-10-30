import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  cargando: boolean = true;
  mostrarFormulario: boolean = false;
  
  // Variables para controlar la edición
  editando: boolean = false;
  idTicketEditando: number | null = null;

  nuevoTicket = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Soporte Técnico',
    prioridad: 'Media',
    estado: 'Pendiente',
    fechaRegistro: new Date().toISOString().split('T')[0]
  };

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    const ticketsGuardados = localStorage.getItem('mis_tickets');
    if (ticketsGuardados) {
      this.tickets = JSON.parse(ticketsGuardados);
      this.cargando = false;
    }
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketsService.obtenerTickets().subscribe({
      next: (data: any) => {
        this.tickets = Array.isArray(data) ? data : (data.tickets || []);
        this.cargando = false;
        localStorage.setItem('mis_tickets', JSON.stringify(this.tickets));
      },
      error: (err) => {
        console.error("Error al conectar con la API:", err);
        this.cargando = false;
      }
    });
  }

  prepararEdicion(ticket: any): void {
    this.editando = true;
    this.idTicketEditando = ticket.id;
    this.nuevoTicket = {
      asunto: ticket.asunto,
      solicitante: ticket.solicitante,
      descripcion: ticket.descripcion,
      categoria: ticket.categoria,
      prioridad: ticket.prioridad,
      estado: ticket.estado,
      fechaRegistro: ticket.fechaRegistro ? ticket.fechaRegistro.split('T')[0] : new Date().toISOString().split('T')[0]
    };
    this.mostrarFormulario = true;
  }

  guardarTicket(): void {
    if (this.editando && this.idTicketEditando !== null) {
      // Operación PUT (Actualizar)
      this.ticketsService.actualizarTicket(this.idTicketEditando, this.nuevoTicket).subscribe({
        next: (res) => {
          console.log('Ticket actualizado con éxito:', res);
          this.resetearFormulario();
          this.cargarTickets();
        },
        error: (err) => console.error('Error al actualizar el ticket:', err)
      });
    } else {
      this.ticketsService.crearTicket(this.nuevoTicket).subscribe({
        next: (res) => {
          console.log('Ticket creado con éxito:', res);
          this.resetearFormulario();
          this.cargarTickets();
        },
        error: (err) => console.error('Error al crear ticket:', err)
      });
    }
  }
  alternarFormulario(): void {
  if (this.mostrarFormulario) {
    // Si estaba abierto, lo cerramos y limpiamos
    this.resetearFormulario();
  } else {
    // Si estaba cerrado, lo abrimos limpio para crear
    this.resetearFormulario();
    this.mostrarFormulario = true;
  }
}

  resetearFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.idTicketEditando = null;
    this.nuevoTicket = {
      asunto: '',
      solicitante: '',
      descripcion: '',
      categoria: 'Soporte Técnico',
      prioridad: 'Media',
      estado: 'Pendiente',
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
  }

  eliminarTicket(id: number): void {
    if (confirm('¿Estás segura de que deseas eliminar este ticket?')) {
      this.ticketsService.eliminarTicket(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(t => t.id !== id);
          localStorage.setItem('mis_tickets', JSON.stringify(this.tickets));
          console.log('Ticket eliminado correctamente');
        },
        error: (err) => console.error('Error al eliminar el ticket:', err)
      });
    }
  }
}
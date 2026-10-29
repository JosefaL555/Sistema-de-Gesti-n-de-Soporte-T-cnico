import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketsService.obtenerTickets().subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
      },
      error: (err: any) => {
        console.error('Error al obtener los tickets', err);
      }
    });
  }
  borrarTicket(id: number): void {
  if (confirm('¿Está seguro de que desea eliminar este ticket de soporte?')) {
    this.ticketsService.eliminarTicket(id).subscribe({
      next: () => {
        this.cargarTickets(); 
      },
      error: (err: any) => {
        console.error('Error al eliminar ticket:', err);
      }
    });
  }
}
}
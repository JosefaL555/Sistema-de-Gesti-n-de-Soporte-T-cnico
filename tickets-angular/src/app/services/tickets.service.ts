import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, TicketNuevo } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly apiUrl = 'http://localhost:3000/api/tickets';

  constructor(private http: HttpClient) {}

  obtenerTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  obtenerTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  crearTicket(ticket: TicketNuevo): Observable<any> {
    return this.http.post(this.apiUrl, ticket);
  }

  actualizarTicket(id: number, ticket: TicketNuevo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ticket);
  }

  eliminarTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
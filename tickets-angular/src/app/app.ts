import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets';

@Component({
  imports: [RouterOutlet, TicketsComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tickets-angular');
}
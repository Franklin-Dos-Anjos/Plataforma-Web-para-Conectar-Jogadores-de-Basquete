import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; // Para os botões bonitos
import { RouterLink } from '@angular/router'; // Para os botões funcionarem como links

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}

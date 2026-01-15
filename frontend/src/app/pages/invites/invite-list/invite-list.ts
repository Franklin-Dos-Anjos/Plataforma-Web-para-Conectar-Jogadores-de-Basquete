import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InviteService } from '../../../services/invite';

@Component({
  selector: 'app-invite-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './invite-list.html',
  styleUrl: './invite-list.scss',
})
export class InviteListComponent implements OnInit {
  invites: any[] = [];

  constructor(private inviteService: InviteService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadInvites();
  }

  loadInvites() {
    // Busca convites onde o DESTINATÁRIO sou eu (ID 1 - Franklin)
    this.inviteService.getReceivedInvites(1).subscribe({
      next: (data) => {
        this.invites = data;
        this.cd.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }

  aceitar(invite: any) {
    this.inviteService.acceptInvite(invite.id).subscribe({
      next: () => {
        alert(`Você aceitou o convite de ${invite.senderName}!`);
        invite.status = 'ACEITO';
        this.cd.detectChanges();
      },
      error: () => alert('Erro ao aceitar convite.'),
    });
  }
}

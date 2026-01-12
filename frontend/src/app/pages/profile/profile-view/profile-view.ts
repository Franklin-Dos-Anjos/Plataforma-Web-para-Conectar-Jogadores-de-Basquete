import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../../services/profile';
import { CommonModule } from '@angular/common'; // Para usar o *ngFor no HTML
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})
export class ProfileViewComponent implements OnInit {
  profile: any = null;
  isLoading: boolean = true;

  constructor(private profileService: ProfileService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Busca o perfil do usuário ID 1
    this.profileService.getProfileByUserId(1).subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('erro:', err);
        this.isLoading = false;
        this.cd.detectChanges();
      },
    });
  }
}

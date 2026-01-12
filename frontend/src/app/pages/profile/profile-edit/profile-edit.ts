import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // <--- NOVO: Para os Selects
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../../services/profile';
import { Position, Level, Availability } from '../../../models/enums'; // Importe seus Enums
import { CommonModule } from '@angular/common'; // Para usar o *ngFor no HTML
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.scss',
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  // Transformando os Enum em arrays para usar no HTML
  positions = Object.values(Position);
  levels = Object.values(Level);
  availabilities = Object.values(Availability);

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      id: [null],
      userId: [1], // Mockado: vamos supor que é o user 1 logado
      city: [''],
      position: [''],
      level: [''],
      availability: [''],
    });
  }

  ngOnInit() {
    // Carrega os dados atuais para o usuário não ter que digitar tudo de novo
    this.profileService.getProfileByUserId(1).subscribe((profile) => {
      if (profile) {
        this.profileForm.patchValue(profile);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileService.saveProfile(this.profileForm.value).subscribe({
        next: () => {
          alert('Perfil salvo!');
          // Redireciona de volta para a tela de visualização
          this.router.navigate(['/perfil']);
        },
        error: () => alert('Erro ao salvar.'),
      });
    }
  }

  onCancel() {
    this.router.navigate(['/perfil']);
  }
}

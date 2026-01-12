import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, // Essencial para formulários avançados
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  // Injetamos o FormBuilder para facilitar a criação do form
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]], // Nome obrigatório
      email: ['', [Validators.required, Validators.email]], // Email obrigatório e formato válido
      password: ['', [Validators.required, Validators.minLength(6)]], // Senha min 6 caracteres
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Dados do formulário:', this.registerForm.value);
      // Futuramente aqui chamaremos o AuthService.register()
    }
  }
}

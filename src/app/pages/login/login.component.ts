import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  typePassword = "password";

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.minLength(6)]]
    })
  }

  register() {
    this.router.navigate(['/register'])
  }

  seePassword() {
    this.typePassword = (this.typePassword == "password") ? "text" : "password";
  }

  login() {
    // const hashedPassword = sha256.update(this.loginForm.get('password')?.value).hex();

    const data = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this._loginService.login(data).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Login Exitoso",
          text: "A continuación entrará a la plataforma",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.router.navigate([''])
        });
      },
      error: () => {
        Swal.fire({
          title: "Error en la autenticación",
          text: "Datos incorrectos o Usuario no existente",
          icon: 'warning',
          confirmButtonText: 'Cerrar',
          showConfirmButton: true,
          showDenyButton: false
        })
      }
    })
  }
}

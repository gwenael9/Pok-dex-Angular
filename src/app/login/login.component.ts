import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})

export class LoginComponent implements OnInit {

  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    if(this.authService.isLoggedIn) {
      this.message = 'Vous êtes connecté.';
    }
    else {
      this.message = 'Identifiant ou mot de passe incorrect.';
    }
    
}

  login() {
    this.message = 'Tentative de connexion en cours ...';
    this.auth.login(this.name, this.password)
        .subscribe((isLoggedIn: boolean) => { this.setMessage();

            if (isLoggedIn) {
                // Redirige l'utilisateur
                this.router.navigate(['/pokemons']);
            } else {
                this.password = '';
                this.router.navigate(['/login']);
            }
    });
  }

  logout() {
    this.authService.logout();
    this.message = 'Vous êtes déconnecté.';
  }
}

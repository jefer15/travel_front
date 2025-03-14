import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedLanguage:string = 'es';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
  }

  logout() {
    this.loginService.logoutUser();
  }

  switchLanguage() {
    this.translate.use(this.selectedLanguage);
  }
}

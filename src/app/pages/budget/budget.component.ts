import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  country: number = 0;
  city: number = 0;
  budget: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.country = params['country'];
      this.city = params['city'];
    });
  }

  goToNextPage() {
    if (this.budget > 0) {
      this.router.navigate(['/summary'], {
        queryParams: { country: this.country, city: this.city, budget: this.budget }
      });
    } else {
      alert("Por favor ingresa un presupuesto válido.");
    }
  }
}

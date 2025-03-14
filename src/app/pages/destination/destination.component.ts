import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/services/travel/travel.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  countries: any = [];
  cities: any = [];
  selectedCountry: number = 0;
  selectedCity: number = 0;

  constructor(
    private travelService: TravelService,
     private router: Router
    ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.travelService.getCountries().subscribe({
      next: (res:any) => {
        this.countries = res;
      }
    })
  }

  getCitiesByCountry() {
    this.travelService.getCitiesByCountry(this.selectedCountry).subscribe({
      next: (res:any) => {
        this.cities = res;
      }
    })
  }

  goToNextPage() {
    console.log("country",this.selectedCountry);
    console.log("city",this.selectedCity);
    if (this.selectedCountry && this.selectedCity) {
      this.router.navigate(['/budget'], {
        queryParams: { country: this.selectedCountry, city: this.selectedCity }
      });
    } else {
      Swal.fire({
        title: "Error ",
        text: "Tiene que seleccionar un pais y una ciudad",
        icon: 'warning',
        confirmButtonText: 'Cerrar',
        showConfirmButton: true,
        showDenyButton: false
      })
    }
  }
}

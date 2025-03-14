import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelService } from 'src/app/services/travel/travel.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  country: number = 0;
  city: number = 0;
  budget: number = 0;
  weather: string = '';
  currencyName: string = '';
  currencySymbol: string = '';
  exchangeRate: number = 0;
  convertedAmount: number = 0;
  countries: any = [];
  cities: any = [];
  selectedCountry: any = {};
  selectedCity: any = {};

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.route.queryParams.subscribe(params => {
      this.country = params['country'];
      this.city = params['city'];
      this.budget = params['budget'];
      this.getCitiesByCountry();
    });
    this.storeHistory();
  }

  getWeather() {
    this.selectedCity = this.cities.find((c: any) => c.id === Number(this.city));
    this.travelService.getWeather(this.selectedCity.name).subscribe({
      next: (res:any) => {
        this.weather = res.temperature_c;
        this.storeHistory();
      }
    })
  }

  convertCurrency() {
    this.selectedCountry = this.countries.find((c: any) => c.id === Number(this.country));
    const data ={
      amount: this.budget,
      from_currency: "COP",
      to_currency: this.selectedCountry.currency
    }
    this.travelService.convertCurrency(data).subscribe({
      next: (res:any) => {
        this.currencySymbol = res.to_currency;
        this.exchangeRate = res.exchange_rate;
        this.convertedAmount = res.converted_amount;
        this.storeHistory();
      }
    });
  }

  getCountries() {
    this.travelService.getCountries().subscribe({
      next: (res: any) => {
        this.countries = res;
        this.convertCurrency();
      }
    })
  }

  getCitiesByCountry() {
    this.travelService.getCitiesByCountry(this.country).subscribe({
      next: (res: any) => {
        this.cities = res;
        this.getWeather();
      }
    })
  }

  storeHistory() {
    if(this.weather !== '' && this.convertedAmount !== 0){
      let data = {
        city_id: this.city,
        budget_cop: this.budget,
        exchange_rate_currency: this.exchangeRate.toString(),
        converted_amount: this.convertedAmount.toString(),
        weather: this.weather.toString()
      }

      this.travelService.storeHistory(data).subscribe({
        next: (res:any) => {
          console.log("Historial almacenado:", res);
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/services/travel/travel.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  constructor(
    private travelService: TravelService
  ) {}

  ngOnInit(): void {
    this.travelService.getHistory().subscribe({
      next: (data:any)=> {
        this.history = data;
      }
    })
  }
}

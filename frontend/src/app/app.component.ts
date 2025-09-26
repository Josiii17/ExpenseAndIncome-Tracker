import { Component } from '@angular/core';
import { StatsService } from './services/stats/stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  balance: number;

  constructor(private statsService: StatsService) {
    this.getStats();
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      this.balance = res.balance;
    })
  }

}

import { Component, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { StatsService } from 'src/app/services/stats/stats.service';
Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  expenses: any;
  incomes: any;
  balance: number;
  income: number;
  expense: number;
  minIncome: number;
  maxIncome: number;
  minExpense: number;
  maxExpense: number;
  latestIncome: any;
  latestExpense: any;
  @ViewChild('incomeLineChart') private incomeLineChartRef: ElementRef;
  @ViewChild('expenseLineChart') private expenseLineChartRef: ElementRef;

  constructor(private statsService: StatsService) {
    this.getChartData();
    this.getStats();
  }

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  ngAfterViewInit() {
    if (this.incomes && this.expenses) {
      this.createLineChart();
    }
  }

  createLineChart() {
    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map(data => data.date),
        datasets: [
          {
            label: 'Income',
            data: this.incomes.map(data => data.amount),
            fill: false,
            borderWidth: 1,
            backgroundColor: 'rgb(80, 200, 120)',
            borderColor: 'rgb(0, 100, 0)',
          },
          // {
          //   label: 'Expense',
          //   data: this.expenses.map(data => data.amount),
          //   fill: false,
          //   borderWidth: 1,
          //   backgroundColor: 'rgb(255,0,0)',
          //   borderColor: 'rgb(255,0,0)',
          // }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map(data => data.date),
        datasets: [
          {
            label: 'Income',
            data: this.expenses.map(data => data.amount),
            fill: false,
            borderWidth: 1,
            backgroundColor: 'rgb(255,0,0)',
            borderColor: 'rgb(255,0,0)',
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe((res) => {
      console.log(res);
      if (res.expenseDTOList != null && res.incomeDTOList != null) {
        this.incomes = res.incomeDTOList;
        this.expenses = res.expenseDTOList;
        if (this.incomeLineChartRef || this.expenseLineChartRef) {
          this.createLineChart();
        }
      }
    })
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      this.income = res.income;
      this.expense = res.expense;
      this.balance = res.balance;
      this.minIncome = res.minIncome;
      this.maxIncome = res.maxIncome;
      this.minExpense = res.minExpense;
      this.maxExpense = res.maxExpense;
      this.latestIncome = res.incomeDTO;
      this.latestExpense = res.expenseDTO;
    })
  }

}

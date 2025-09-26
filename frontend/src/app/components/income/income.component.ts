import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {

  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  income: number;
  incomes: any;
  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary", "Freelancing", "Investments", "Stocks", "Bitcoin", "Bank Transfer", "Youtube", "Other"];

  constructor(private fb: FormBuilder,
    private incomeService: IncomeService,
    private statsService: StatsService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getStats();
    this.getAllIncomes();
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      this.income = res.income;
    })
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe((res) => {
      this.incomes = res;
    })
  }

  submitForm(): void {
    this.incomeService.postIncome(this.incomeForm.value).subscribe((res) => {
      if (res.id != null) {
        this.message.success("Income posted successfully", { nzDuration: 5000 });
        this.getAllIncomes();
      } else {
        this.message.error("Error while posting income", { nzDuration: 5000 });
      }
    })
  }

  updateIncome(id: number): void {
    this.router.navigateByUrl(`/income/${id}/edit`);
  }

  deleteIncome(id: number): void {
    this.incomeService.deleteIncome(id).subscribe((res) => {
      this.message.success("Income deleted successfully", { nzDuration: 5000 });
      this.getAllIncomes();
    })
  }

}

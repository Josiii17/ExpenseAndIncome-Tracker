import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {

  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  expense: number;
  expenses: any;
  expenseForm!: FormGroup;
  listOfCategory: any[] = ["Education",
    "Groceries",
    "Health",
    "Subscriptions",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"];

  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private statsService: StatsService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getStats();
    this.getAllExpenses();
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      this.expense = res.expense;
    })
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe((res) => {
      this.expenses = res;
    })
  }

  submitForm(): void {
    this.expenseService.postExpense(this.expenseForm.value).subscribe((res) => {
      if (res.id != null) {
        this.message.success("Expense posted successfully", { nzDuration: 5000 });
        this.getAllExpenses();
      } else {
        this.message.error("Error while posting expense", { nzDuration: 5000 });
      }
    })
  }

  updateExpense(id: number): void {
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe((res) => {
      this.message.success("Expense deleted successfully", { nzDuration: 5000 });
      this.getAllExpenses();
    })
  }

}

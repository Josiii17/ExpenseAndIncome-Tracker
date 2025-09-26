import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from 'src/app/services/expense/expense.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss']
})
export class UpdateExpenseComponent {

  id: number = this.activatedRoute.snapshot.params['id'];
  expenseForm!: FormGroup;
  listOfCategory: any[] = [
    "Education",
    "Groceries",
    "Health",
    "Subscriptions",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"
  ];

  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getExpenseById();
  }

  getExpenseById() {
    this.expenseService.getExpenseById(this.id).subscribe((res) => {
      this.expenseForm.patchValue(res);
    })
  }

  submitForm(): void {
    this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe((res) => {
      if (res.id != null) {
        this.message.success("Expense updated successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/expense");
      } else {
        this.message.error("Error while updating expense", { nzDuration: 5000 });
      }
    })
  }

}

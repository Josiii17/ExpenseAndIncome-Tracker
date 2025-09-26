import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent {

  id: number = this.activatedRoute.snapshot.params['id'];
  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary", "Freelancing", "Investments", "Stocks", "Bitcoin", "Bank Transfer", "Youtube", "Other"];

  constructor(private fb: FormBuilder,
    private incomeService: IncomeService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getIncomeById();
  }

  getIncomeById() {
    this.incomeService.getIncomeById(this.id).subscribe((res) => {
      this.incomeForm.patchValue(res);
    })
  }

  submitForm(): void {
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe((res) => {
      if (res.id != null) {
        this.message.success("Income updated successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/income");
      } else {
        this.message.error("Error while updating income", { nzDuration: 5000 });
      }
    })
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "income", component: IncomeComponent },
  { path: "income/:id/edit", component: UpdateIncomeComponent },
  { path: "expense", component: ExpenseComponent },
  { path: "expense/:id/edit", component: UpdateExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

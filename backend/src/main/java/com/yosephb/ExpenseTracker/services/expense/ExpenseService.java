package com.yosephb.ExpenseTracker.services.expense;

import java.util.List;

import com.yosephb.ExpenseTracker.dto.ExpenseDTO;
import com.yosephb.ExpenseTracker.entity.Expense;

public interface ExpenseService {
	Expense postExpense(ExpenseDTO expenseDTO);
	
	List<Expense> getAllExpenses();
	
	 Expense getExpenseById(Long id);
	 
	 Expense updateExpense(Long id, ExpenseDTO expenseDTO);
	 
	 void deleteExpense(Long id);

}

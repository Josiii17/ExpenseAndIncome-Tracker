package com.yosephb.ExpenseTracker.services.income;

import java.util.List;

import com.yosephb.ExpenseTracker.dto.IncomeDTO;
import com.yosephb.ExpenseTracker.entity.Income;

public interface IncomeService {
	
	Income postIncome(IncomeDTO incomeDTO);
	
	List<IncomeDTO> getAllIncomes();
	
	Income updateIncome(Long id, IncomeDTO incomeDTO);
	
	IncomeDTO getIncomeById(Long id);
	
	void deleteIncome(Long id);

}

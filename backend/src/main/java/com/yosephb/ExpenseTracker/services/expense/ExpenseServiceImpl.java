package com.yosephb.ExpenseTracker.services.expense;

import com.yosephb.ExpenseTracker.dto.ExpenseDTO;
import com.yosephb.ExpenseTracker.entity.Expense;
import com.yosephb.ExpenseTracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
import jakarta.persistence.EntityNotFoundException;


@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense postExpense(ExpenseDTO dto) {
        return saveOrUpdateExpense(new Expense(), dto);
    }

    private Expense saveOrUpdateExpense(Expense expense, ExpenseDTO dto){
        expense.setTitle(dto.getTitle());
        expense.setDate(dto.getDate());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());
        expense.setDescription(dto.getDescription());
        return expenseRepository.save(expense);
    }
    @Override
    public Expense updateExpense(Long id, ExpenseDTO expenseDTO) {
    	Optional<Expense> optionalExpense = expenseRepository.findById(id);
    	if(optionalExpense.isPresent()) {
    		return saveOrUpdateExpense(optionalExpense.get(), expenseDTO);
    	}else {
    		throw new EntityNotFoundException("Expense is not present with id " + id);
    	}
    }

    @Override
    public List<Expense> getAllExpenses() {  
        return expenseRepository.findAll().stream()
                .sorted(Comparator.comparing(Expense::getDate).reversed())
                .collect(Collectors.toList());
    }
    
    @Override
    public Expense getExpenseById(Long id) {
    	Optional<Expense> optionalExpense = expenseRepository.findById(id);
    	if(optionalExpense.isPresent()) {
    		return optionalExpense.get();
    	}else {
    		throw new EntityNotFoundException("Expense is not present with id" + id);
    	}
    }
    @Override
    public void deleteExpense(Long id) {
    	Optional<Expense> optionalExpense = expenseRepository.findById(id);
    	if(optionalExpense.isPresent()) {
    		expenseRepository.deleteById(id);
    		
    	}else {
    		throw new EntityNotFoundException("Expense is not present with id" + id);
    		
    	}
    }
}

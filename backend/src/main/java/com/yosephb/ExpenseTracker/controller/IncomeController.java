package com.yosephb.ExpenseTracker.controller;

import com.yosephb.ExpenseTracker.dto.ExpenseDTO;
import com.yosephb.ExpenseTracker.dto.IncomeDTO;
import com.yosephb.ExpenseTracker.entity.Income;
import com.yosephb.ExpenseTracker.services.income.IncomeService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/income")
@CrossOrigin("*")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) { 
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<?> postIncome(@RequestBody IncomeDTO incomeDTO){
        Income created = incomeService.postIncome(incomeDTO);
        return (created != null)
                ? ResponseEntity.status(HttpStatus.CREATED).body(created)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllIncomes(){
    	return ResponseEntity.ok(incomeService.getAllIncomes());
    }
    
    
    @GetMapping("/{id}")
	public ResponseEntity<?> getIncomeById(@PathVariable Long id){
		try {
			return ResponseEntity.ok(incomeService.getIncomeById(id));
			
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
	}
    
    @PutMapping("/{id}")
	public ResponseEntity<?> updateIncome(@PathVariable Long id, @RequestBody IncomeDTO incomeDTO){
		try {
			return ResponseEntity.ok(incomeService.updateIncome(id, incomeDTO));
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
			
		}
	}
	
    @DeleteMapping("/{id}")
	public ResponseEntity<?> deleteIncome(@PathVariable Long id){
		try {
			incomeService.deleteIncome(id);
			return ResponseEntity.noContent().build();
		} catch (EntityNotFoundException ex) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
			
		}
	}


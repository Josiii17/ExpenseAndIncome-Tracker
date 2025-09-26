package com.yosephb.ExpenseTracker.controller;

import com.yosephb.ExpenseTracker.services.expense.ExpenseService;
import com.yosephb.ExpenseTracker.services.income.IncomeService;
import com.yosephb.ExpenseTracker.services.stats.StatsService; 
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin("*")
public class StatsController {

  private final ExpenseService expenseService;
  private final IncomeService incomeService;
  private final StatsService statsService; 

  public StatsController(ExpenseService expenseService,
                         IncomeService incomeService,
                         StatsService statsService) { 
    this.expenseService = expenseService;
    this.incomeService = incomeService;
    this.statsService = statsService; 
  }

  @GetMapping("/chart")
  public ResponseEntity<?> chart() {
    return ResponseEntity.ok(
      Map.of(
        "expenseList", expenseService.getAllExpenses(),
        "incomeList",  incomeService.getAllIncomes()
      )
    );
  }

  @GetMapping
  public ResponseEntity<?> getStats() {
    return ResponseEntity.ok(statsService.getStats());
  }
}

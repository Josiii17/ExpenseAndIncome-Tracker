package com.yosephb.ExpenseTracker.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.yosephb.ExpenseTracker.entity.Income;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
	
	List<Income> findByDateBetween(LocalDate startDate, LocalDate endDate);
	
	
	@Query("SELECT SUM(i.amount) FROM Income i")
	Double sumAllAmounts();
	
	Optional<Income> findFirstByOrderByDateDesc();
}

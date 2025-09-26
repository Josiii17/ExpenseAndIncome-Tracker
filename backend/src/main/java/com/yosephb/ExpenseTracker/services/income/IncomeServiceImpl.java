package com.yosephb.ExpenseTracker.services.income;

import com.yosephb.ExpenseTracker.dto.IncomeDTO;
import com.yosephb.ExpenseTracker.entity.Income;
import com.yosephb.ExpenseTracker.repository.IncomeRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeServiceImpl(IncomeRepository incomeRepository) {  
        this.incomeRepository = incomeRepository;
    }

    @Override
    public Income postIncome(IncomeDTO incomeDTO) {
        return saveOrUpdateIncome(new Income(), incomeDTO);
    }

    private Income saveOrUpdateIncome(Income income, IncomeDTO incomeDTO) {
        income.setTitle(incomeDTO.getTitle());
        income.setDate(incomeDTO.getDate());
        income.setAmount(incomeDTO.getAmount());
        income.setCategory(incomeDTO.getCategory());
        income.setDescription(incomeDTO.getDescription());
        return incomeRepository.save(income);
    }
    
    public Income updateIncome(Long id, IncomeDTO incomeDTO) {
    	Optional<Income> optionalIncome = incomeRepository.findById(id);
    	if(optionalIncome.isPresent()) {
    		return saveOrUpdateIncome(optionalIncome.get(), incomeDTO);
    	}else {
    		throw new EntityNotFoundException("Income is not present with id " + id);
    	}
    }
    
    @Override
    public List<IncomeDTO> getAllIncomes() {
        return incomeRepository.findAll().stream()
                .sorted(Comparator.comparing(Income::getDate).reversed())
                .map(this::toDto)                         // <-- replace here
                .collect(Collectors.toList());
    }
    
    @Override
    public IncomeDTO getIncomeById(Long id) {
        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Income is not present with id " + id));
        return toDto(income);         
    }

    public void deleteIncome(Long id) {
    	Optional<Income> optionalIncome = incomeRepository.findById(id);
    	if(optionalIncome.isPresent()) {
    		incomeRepository.deleteById(id);
    		
    	}else {
    		throw new EntityNotFoundException("Income is not present with id" + id);
    		
    	}
    }
    
    
    
    
    
    private IncomeDTO toDto(Income in) {
        IncomeDTO dto = new IncomeDTO();
        dto.setId(in.getId());
        dto.setTitle(in.getTitle());
        dto.setAmount(in.getAmount());
        dto.setDate(in.getDate());
        dto.setCategory(in.getCategory());
        dto.setDescription(in.getDescription());
        return dto;
    }

    }

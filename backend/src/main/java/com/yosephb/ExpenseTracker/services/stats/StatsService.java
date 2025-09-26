package com.yosephb.ExpenseTracker.services.stats;

import com.yosephb.ExpenseTracker.dto.GraphDTO;
import com.yosephb.ExpenseTracker.dto.StatsDTO;

public interface StatsService {
	
	GraphDTO getChartData();
	
	StatsDTO getStats();

}

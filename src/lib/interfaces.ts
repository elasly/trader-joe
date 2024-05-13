export interface Rule {
    ruleType: string;
    ruleAction: string;
    indicatorId: number;
    operator: string;
    value: number;
    sequence: number;
    logicalOperator: string;
    compareTo: string;
    compIndicatorId: number;
    slope: string;
    priceAction: string;
  }



  export interface ExitRules {
    exitRules: Rule[];
  }

  export interface EntryRules {
    entryRules: Rule[];
  }

  export interface RiskManagement {
    strategyId: number;
    maxDrawdown: number;
    stopLossType: string;
    stopLossValue: number;
    stopLossRuleId: number;
  }

  export interface Strategy {
    name: string;
    description: string;
  } 

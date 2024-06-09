//src/lib/queries.ts
"use server";
import  "server-only";
import { entryRules, exitRules, indicator, strategies, riskManagement,  } from "@/server/db/schema";
import type { Strategy, RiskManagement, EntryRule, ExitRule, Indicator } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth"; 
import { map } from "zod";


export const createIndicator = async (Indicator: Indicator) => {
  try {
    
    await db.insert(indicator).values(Indicator);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getindicatorOfGroup = async (group: string) => {
  try {
    console.log(
      "this is inside the getindicatorOfGroup function passed the group value",
      group,
    );
    const P1 =  db
      .select()
      .from(indicator)
      .where(eq(indicator.group, sql.placeholder('group')));
    const data = await P1.execute({ group: group });
    if (data) return { data };
    else return { data: null, error: "error" };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error` };
  }
};

export const getindicatorGroup = async () => {
  try {
    console.log("this is inside the getindicatorGroup function");
    const groups = await db
      .selectDistinct({ group: indicator.group })
      .from(indicator);
    if (groups)
      return  (groups);
    else
      return { error: "error" };
  } catch (error) {
    console.log(error);
    return { error: "error" };
  }
};

export const getindicatorDetails = async (selectedIndicator: string) => {
    try {
      const P1 =  db
        .select()
        .from(indicator)
        .where(eq(indicator.name, sql.placeholder('selectedIndicator')));
      const data = await P1.execute({ selectedIndicator: selectedIndicator });
      if (data) return { data };
      else return { data: null, error: "error" };
    } catch (error) {
      console.log(error);
      return { data: null, error: `Error` };
    }
  };

  // export const putEntryRule = async (data: Rule[]) => {
  //   const session = await getServerAuthSession();
  //   console.log(session?.user.id)
  //   console.log("entryRules", data);
  //   try {
  //     await Promise.all(
        
  //        db.insert(entryRules).values(data));
      
    
  //     return { data: null, error: null };
  //   } catch (error) {
  //     console.log("error from putEntryRule", error);
  //     return { data: null, error: "Error" };
  //   }
  // };

  export const putEntryRule = async (data: EntryRule[]) => {
    const session = await getServerAuthSession();
    console.log(session?.user.id);
    console.log("entryRules", data);
  
    try {
      await db.insert(entryRules).values(data);
      return { data: null, error: null };
    } catch (error) {
      console.error("Error in putEntryRule:", error);
      return { data: null, error: "An error occurred while inserting entry rules" };
    }
  };


//[{"ruleType":"exitRule","ruleAction":"long","indicatorId":"213","operator":"NA","value":0,"sequence":0,"logicalOperator":"NA","compareTo":"slope","compIndicatorId":0,"slope":"positiveOrZero","priceAction":"NA"},{"ruleType":"exitRule","ruleAction":"short","indicatorId":"220","operator":"=","value":0,"sequence":0,"logicalOperator":"NA","compareTo":"price","compIndicatorId":0,"slope":"NA","priceAction":"Close"}]
  export const putExitRule = async (data: ExitRule[]) => {
    try {
      const session = await getServerAuthSession();
      console.log(session?.user.id)
      console.log("exitRules", data);

      await Promise.all( 
      await db.insert(exitRules).values(data));
      return { data: null, error: null };
      } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };
 

  export const putStrategy = async (strategy: Strategy) => {
    try {
      await db.insert(strategies).values(strategy);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };

  export const getStrategy = async () => {
    try {
      const strategy = await db.select().from(strategies);
      return { data: strategy, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };


  interface Strategy {
    id: number;
    name: string;
    description: string;
  }
  
  // interface Rule {
  //   id: number;
  //   ruleType: string;
  //   indicatorId: number;
  //   operator: string;
  //   value: number;
  //   sequence: number;
  //   logicalOperator: string;
  //   compareTo: string;
  //   compIndicatorId: number;
  //   slope: string;
  //   priceAction: string;
  // }
  
  export interface StrategyRulesResponse {
    strategy: Strategy;
    entryRules: EntryRule[];
    exitRules: ExitRule[];
  }
  
  export type GetStrategyRulesResult =
    | { data: StrategyRulesResponse; error: null }
    | { data: null; error: string };
  
    export const getStrategyRules = async (strategyId: number) => {
      try {
        const strategy = await db
          .select()
          .from(strategies)
          .where(eq(strategies.id, strategyId))
          .limit(1)
          .execute();
    
        if (strategy.length === 0) {
          return { error: "Strategy not found" };
        }
    
        const entryRuleData = await db
          .select()
          .from(entryRules)
          .where(eq(entryRules.strategyId, strategyId))
          .execute();
    
        const exitRuleData = await db
          .select()
          .from(exitRules)
          .where(eq(exitRules.strategyId, strategyId))
          .execute();
    
        const response: JSON[] = [
          ...entryRuleData.map((rule) => ({
            ...strategy[0],
            ...rule,
          })),
          ...exitRuleData.map((rule) => ({
            ...strategy[0],
            ...rule,
          })),
        ];
    
        return { data: response, error: null };
      } catch (error) {
        console.error("Error in getStrategyRules:", error);
        return { data: null, error: "An error occurred while fetching strategy rules" };
      }
    };

  export const putRiskManagement = async (RiskManagement: RiskManagement) => {
    try {
      await db.insert(riskManagement).values(RiskManagement);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };
//src/lib/queries.ts
"use server";
import  "server-only";
import { entryRules, exitRules, indicator, strategies, riskManagement, EntryRule, ExitRule, Indicator, } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth"; 
import { Strategy, RiskManagement } from "@/lib/interfaces";
import { z } from 'zod';




export const createIndicator = async (Indicator: Indicator) => {
  try {
    
    const data = await db.insert(indicator).values(Indicator);
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

  export const putEntryRule = async (EntryRules: EntryRule[]) => {
    const session = await getServerAuthSession();
    console.log(session)
    console.log(EntryRules)
    
    try {
      await Promise.all(
        EntryRules
        .map(async (entryRule: EntryRule) => {
          console.log("data", entryRule.values);
        const data = await db.insert(entryRules).values(entryRule);
        
        })
      );
      return { data: null, error: null };
    } catch (error) {
      console.log("error from putEntryRule", error);
      return { data: null, error: "Error" };
    }
  };

  export const putExitRule = async (ExitRules: ExitRule[]) => {
    // console.log("exitRules", exitRules);
    try {
      await Promise.all(
        ExitRules
        .map(async (ExitRule: ExitRule) => {
          await db.insert(exitRules).values(ExitRule);
        })
      );
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };
 

  export const putStrategy = async (strategy: Strategy) => {
    try {
      const data = await db.insert(strategies).values(strategy);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };

  export const putRiskManagement = async (RiskManagement: RiskManagement) => {
    try {
      const data = await db.insert(riskManagement).values(RiskManagement);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };
//src/lib/queries.ts

import  "server-only";
import { entryRule, EntryRule, exitRules, ExitRule, indicator, strategies, riskManagement } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { getServerAuthSession } from "@/server/auth"; 
// import { EntryRule, ExitRule, Indicator, Strategy, RiskManagement } from "@/lib/interfaces";



export const createIndicator = async (indicator: indicator) => {
  try {
    
    const data = await db.insert(indicator).values(indicator);
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
    try {
      await Promise.all(
        EntryRules
        .map(async (EntryRule: EntryRule) => {
        const data = await db.insert(entryRule).values(EntryRule);
        // console.log("data", data);
        })
      );
      return { data: null, error: null };
    } catch (error) {
      console.log("error from putEntryRule", error);
      return { data: null, error: "Error" };
    }
  };

  export const putExitRule = async (exitRules: ExitRule[]) => {
    // console.log("exitRules", exitRules);
    try {
      await Promise.all(
        exitRules
        .map(async (exitRule: ExitRule) => {
          console.log("exitRule", exitRule);
          await db.insert(exitRules).values(exitRulse);
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
      const data = await db.insert(strategy).values(strategy);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };

  export const putRiskManagement = async (riskManagement: RiskManagement) => {
    try {
      const data = await db.insert(riskManagement).values(riskManagement);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: "Error" };
    }
  };
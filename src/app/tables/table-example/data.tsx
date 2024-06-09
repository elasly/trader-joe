"use client"
import { useEffect, useState } from "react";
// import { PaymentType } from "./schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getStrategyRules } from "@/server/db/queries";
import type { GetStrategyRulesResult } from "@/server/db/queries";

async function getData(): Promise<JSON> {
  // const res = await fetch(
  //   "https://my.api.mockaroo.com/payment_info.json?key=f0933e60"
  // );
  const res = await getStrategyRules(1);
  console.log(res);
  return res;
}

export default function TableExample() {
  const [stratData, setstratData] = useState<GetStrategyRulesResult[]>([]);
  useEffect(() => {
    const data = async () => {
      const result = await getData();
      console.log(result);
      setstratData(result);
    };
    data();
  }, []);
  return <DataTable columns={columns} data={stratData} />;
}

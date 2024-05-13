"use client"
// src/app/test/page.tsx
import React, { useState } from 'react';
import IndicatorCard from '@/components/indicatorcard';
import StrategyRules from '@/components/strategy-rules';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { putEntryRule, putExitRule, putStrategy, putRiskManagement } from '@/server/db/queries';

interface Rule {
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



function Page() {
  const [entryRules, setEntryRules] = useState<Rule[]>([]);
  const [exitRules, setExitRules] = useState<Rule[]>([]);
  const [selectedData, setSelectedData] = useState({});
  const [numIndicators, setNumIndicators] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleSubmit = (submittedEntryRules: Rule[], submittedExitRules: Rule[]) => {
    setEntryRules(submittedEntryRules);
    setExitRules(submittedExitRules);
    // Perform further actions with the submitted rules, e.g., save to database
  };

  const handleIndicatorData = (id, data) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [id]: data,
    }));
  };

  const sendDataToDatabase = async () => {
    try {
      // console.log("entryRules", JSON.stringify(entryRules));
      // console.log("exitRules", JSON.stringify(exitRules));
      await putEntryRule(JSON.stringify(entryRules));
      await putExitRule(JSON.stringify(exitRules));
      // await putStrategy(strategy);
      // await putRiskManagement(riskManagement);
      // const response = await fetch('/api/saveData', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(selectedData),
      // });
      console.log("selectedData", JSON.stringify(selectedData));
      if (0
        // response.ok
      ) {
        console.log('Data sent to the database successfully');
      } else {
        console.error('Error sending data to the database');
      }
    } catch (error) {
      console.error('Error sending data to the database:', error);
    }
  };

  const handleNumIndicatorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumIndicators(parseInt(e.target.value, 10));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-[#02276dab] to-[#0b14c5] text-white'>
      <div className='flex flex-col items-center gap-4 py-4'>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          This is a <span className='text-[hsl(123,91%,70%)]'>Testing</span> Page
        </h1>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Select how many indicators you want to use</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Enter Number of Indicators</DialogTitle>
          <DialogDescription>
            Please specify the number of indicators you want to generate.
          </DialogDescription>
          <Input type="number" value={numIndicators} onChange={handleNumIndicatorsChange} />
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDialogClose}>Confirm</Button>
            </DialogClose>
            </DialogFooter>
            </DialogContent>
            </Dialog>
            <div className='flex flex-wrap justify-center gap-4 py-8'>
    {Array.from({ length: numIndicators }, (_, index) => (
      <IndicatorCard key={index} id={`${index + 1}`} onIndicatorData={handleIndicatorData} />
    ))}
  </div>

  <div className='flex items-center'>
    <StrategyRules pageId={1} onSubmit={handleSubmit} indicatorData={selectedData}/>
  </div>

  <button onClick={sendDataToDatabase}>Send Data to Database</button>
</main>
);
}
export default Page;
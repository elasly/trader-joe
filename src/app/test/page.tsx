"use client"
// src/app/test/page.tsx
import React from 'react'
import  IndicatorCard  from '@/components/indicatorcard'
import IndicatorPicker from '@/components/indicatorPicker'
import { useState } from 'react'

function page() {
    // const [selectedGroup, setSelectedGroup] = useState("");
    // const [groups, setGroups] = useState([]);
    // const [indicators, setIndicators] = useState([]);
    // const [selectedIndicator, setSelectedIndicator] = useState("");
    const [indicatorDetails, setIndicatorDetails] = useState([]);

    const [selectedData, setSelectedData] = useState({});

  const handleIndicatorData = (id, data) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [id]: data,
    }));
  };

  const sendDataToDatabase = async () => {
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedData),
        
      });
      console.log("selectedData", JSON.stringify(selectedData));
      if (response.ok) {
        console.log('Data sent to the database successfully');
      } else {
        console.error('Error sending data to the database');
      }
    } catch (error) {
      console.error('Error sending data to the database:', error);
    }
  };


  return (
    <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-[#02276dab] to-[#0b14c5] text-white'>
        <div className='flex flex-col items-center gap-2'>
      <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
        This is a  <span className='text-[hsl(123,91%,70%)]'>Testing</span> Page
      </h1>
      </div>
      <div className='flex flex-col items-center gap-2 py-8'>
      </div>
      <div className='flex flex-col1-4 items-center gap-2 py-8'>
        <IndicatorCard id="1" onIndicatorData={handleIndicatorData} />
        <IndicatorCard id="2" onIndicatorData={handleIndicatorData}  />
        <IndicatorCard id="3" onIndicatorData={handleIndicatorData} />
        <IndicatorCard id="4" onIndicatorData={handleIndicatorData} />
      </div>
      <div className='flex flex-col1-4 items-center gap-2 py-8'>
          {indicatorDetails?.map((indicator) => (
            <div key={indicator.id}>
              <h2 className='text-2xl font-semibold'>{indicator.name}</h2>
              <p className='text-sm text-gray-500'>{indicator.description}</p>
            </div>
          ))}
      </div>
      <button onClick={sendDataToDatabase}>Send Data to Database</button>
    </main>
    
    
  )
}


export default page
// src/app/test/page.tsx
import React from 'react'
import  IndicatorCard  from '@/components/indicatorcard'
import IndicatorPicker from '@/components/indicatorPicker'

function page() {
  return (
    <main className='flex min-h-screen flex-col items-center bg-gradient-to-b from-[#02276dab] to-[#0b14c5] text-white'>
        <div className='flex flex-col items-center gap-2'>
      <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
        This is a  <span className='text-[hsl(123,91%,70%)]'>Testing</span> Page
      </h1>
      </div>
      <div className='flex flex-col items-center gap-2 py-8'>
        {/* <ul className='flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400'>
          {indicators?.map((indicator) => (
            <li key={indicator.id}>
              <a href={`#${indicator.id}`}>
                <span className='font-semibold'>{indicator.name}</span>
                <span className='text-gray-400'>{indicator.description}</span>
              </a>
            </li>
          )) }
          </ul> */}
      </div>
      <div className='flex flex-col1-4 items-center gap-2 py-8'>
        <IndicatorCard id="1" />
        <IndicatorPicker id="2" />
        <IndicatorPicker id="3" />
        <IndicatorPicker id="4" />
      </div>
    </main>
    
    
  )
}


export default page
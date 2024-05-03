// src/components/indicatorcard.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { getindicatorOfGroup , getindicatorGroup} from "@/lib/queries";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";



    

const IndicatorCard = ({  onIndicatorSelect }) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getindicatorGroup()
        setGroups(data);
        console.log("Fetched Groups:", groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);



  const fetchIndicators = useCallback(async () => {
    if (selectedGroup) {
      console.log("Fetching indicators for group:", selectedGroup);
      try {
        const response = await getindicatorOfGroup(selectedGroup);
        setIndicators(response.data);
        console.log("Fetched indicators:", response.data);

      } catch (error) {
        console.error("Error fetching indicators:", error);
      }
    }
  }, [selectedGroup]);

  useEffect(() => {
    fetchIndicators();
  }, [selectedGroup, fetchIndicators]);

  const handleGroupChange = (group) => {
    console.log("handleGroupChange called with group:", group);
    setSelectedGroup(group);
    // onIndicatorSelect(index, null);
    // Remove the direct call to fetchIndicators here
  };

  const handleIndicatorChange = async (indicator) => {
    console.log("handleIndicatorChange called with indicator:", indicator);
    onIndicatorSelect(indicator);

    if (indicator) {
      try {
        const data = await getindicatorOfGroup(group);
      } catch (error) {
        console.error("Error fetching indicator details:", error);
      }
    } else {
      updateIndicatorDetails(index, null);
    }
  };


  return (
    <div className="flex flex-col gap-4">
    <Card className="w-full max-w-xs">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">Indicator Card</CardTitle>
        <CardDescription className="items-center justify-between text-sm text-gray-500">
          Select the Group contaihning your desired indicator.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
      <Select onValueChange={handleGroupChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Group" />
        </SelectTrigger>
        <SelectContent className="w-64">
        {groups.map((groupObj, index) => (
            <SelectItem key={index} value={groupObj.group}>
            {groupObj.group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </CardContent>
      <CardContent>
      
        <Select onValueChange={handleIndicatorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Indicator" />
          </SelectTrigger>
          <SelectContent className="w-64">
            {indicators.map((indicatorObj) => (
              <SelectItem key={indicatorObj.id} value={indicatorObj.name}>
                {indicatorObj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
      </CardFooter>
    </Card>
    </div>
  );
}

export default  IndicatorCard;

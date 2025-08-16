import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["1 lakh to 5 lakh", "6 lakh to 10 lakh", "11 lakh to 15 lakh"],
  },
];

const FilterCard = ({ filters, setFilters }) => {
  const changeHandler = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="w-full bg-white p-3 rounded-md space-y-6">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg mb-2">{data.filterType}</h1>
          <RadioGroup
            value={filters[data.filterType]}
            onValueChange={(value) => changeHandler(data.filterType, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

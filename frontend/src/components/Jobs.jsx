import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const salaryRangeToNumbers = (rangeStr) => {
  // e.g. "1 lakh to 5 lakh" -> [1, 5]
  const parts = rangeStr.split("to").map((p) => p.trim());
  if (parts.length !== 2) return [0, Infinity];
  // parse number removing "lakh"
  const min = Number(parts[0].toLowerCase().replace("lakh", "").trim());
  const max = Number(parts[1].toLowerCase().replace("lakh", "").trim());
  return [min, max];
};

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  // We'll keep searchedQuery for text search (title, desc, location)
  const { searchedQuery } = useSelector((store) => store.job);

  // Add local state for filters from FilterCard
  const [filters, setFilters] = useState({
    Location: "",
    Industry: "",
    Salary: "",
  });

  const [filterJobs, setFilterJobs] = useState(allJobs);

  // Callback to update filters from FilterCard
  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const lowerQuery = searchedQuery.toLowerCase();

    const filteredJobs = allJobs.filter((job) => {
      // Text search on title, description, location
      const textMatch =
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery);

      // Location filter (exact match)
      const locationMatch = filters.Location
        ? job.location === filters.Location
        : true;

      // Industry filter (assuming job.title matches industry)
      const industryMatch = filters.Industry
        ? job.title === filters.Industry
        : true;

      // Salary filter
      let salaryMatch = true;
      if (filters.Salary) {
        const [minSalary, maxSalary] = salaryRangeToNumbers(filters.Salary);
        // Assume job.salary is number in LPA
        salaryMatch = job.salary >= minSalary && job.salary <= maxSalary;
      }

      return textMatch && locationMatch && industryMatch && salaryMatch;
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery, filters]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            {/* Pass filters and setter callback to FilterCard */}
            <FilterCard filters={filters} setFilters={setFilters} />
          </div>
          {filterJobs.length <= 0 ? (
            <span className="text-gray-600 text-lg">Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

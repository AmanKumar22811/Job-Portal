import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <Input
            className="w-full sm:w-64 px-4 py-3 rounded-lg border border-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 transition duration-300"
            placeholder="Filter by company name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;

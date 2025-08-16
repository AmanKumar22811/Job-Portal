import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-purple-200">
      <Table className="min-w-full">
        <TableCaption className="text-purple-700 font-semibold">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-purple-100">
            <TableHead className="text-purple-700">Logo</TableHead>
            <TableHead className="text-purple-700">Name</TableHead>
            <TableHead className="text-purple-700">Date</TableHead>
            <TableHead className="text-right text-purple-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-purple-50 cursor-default transition"
            >
              <TableCell className="py-3">
                <Avatar className="ring-2 ring-purple-300 shadow-sm">
                  <AvatarImage
                    src={company.logo}
                    alt={`${company.name} logo`}
                  />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {company.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <button
                      aria-label="Company actions"
                      className="text-gray-600 hover:text-purple-700 transition"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white rounded-lg shadow-lg border border-purple-200 p-2">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer text-purple-700 hover:bg-purple-100 rounded-md p-2 transition"
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter")
                          navigate(`/admin/companies/${company._id}`);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

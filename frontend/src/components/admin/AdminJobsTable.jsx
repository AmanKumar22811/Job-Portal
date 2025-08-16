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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-purple-200">
      <Table className="min-w-full">
        <TableCaption className="text-purple-700 font-semibold">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-purple-100">
            <TableHead className="text-purple-700">Company Name</TableHead>
            <TableHead className="text-purple-700">Role</TableHead>
            <TableHead className="text-purple-700">Date</TableHead>
            <TableHead className="text-right text-purple-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-purple-50 cursor-default transition"
            >
              <TableCell className="font-medium text-gray-900">
                {job?.company?.name}
              </TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell className="text-gray-600">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <button
                      aria-label="Job actions"
                      className="text-gray-600 hover:text-purple-700 transition"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white rounded-lg shadow-lg border border-purple-200 p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer text-purple-700 hover:bg-purple-100 rounded-md p-2 transition"
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter")
                          navigate(`/admin/companies/${job._id}`);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 cursor-pointer text-purple-700 hover:bg-purple-100 rounded-md p-2 mt-2 transition"
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter")
                          navigate(`/admin/jobs/${job._id}/applicants`);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Applicants</span>
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

export default AdminJobsTable;

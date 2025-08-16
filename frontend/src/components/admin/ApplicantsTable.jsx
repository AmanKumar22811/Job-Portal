import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-purple-200">
      <Table className="min-w-full">
        <TableCaption className="text-purple-700 font-semibold">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-purple-100">
            <TableHead className="text-purple-700">Full Name</TableHead>
            <TableHead className="text-purple-700">Email</TableHead>
            <TableHead className="text-purple-700">Contact</TableHead>
            <TableHead className="text-purple-700">Resume</TableHead>
            <TableHead className="text-purple-700">Date</TableHead>
            <TableHead className="text-right text-purple-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-purple-50 transition cursor-default"
            >
              <TableCell className="font-medium text-gray-900">
                {item?.applicant?.fullname || "N/A"}
              </TableCell>
              <TableCell>{item?.applicant?.email || "N/A"}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-purple-600 hover:underline break-words"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName || "Resume"}
                  </a>
                ) : (
                  <span className="text-gray-500">NA</span>
                )}
              </TableCell>
              <TableCell className="text-gray-600">
                {item?.applicant?.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <button
                      aria-label="Applicant actions"
                      className="text-gray-600 hover:text-purple-700 transition"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white rounded-lg shadow-lg border border-purple-200 p-2">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex items-center w-fit cursor-pointer text-purple-700 hover:bg-purple-100 rounded-md p-2 transition"
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === "Enter")
                            statusHandler(status, item?._id);
                        }}
                      >
                        <span>{status}</span>
                      </div>
                    ))}
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

export default ApplicantsTable;

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  console.log(singleJob);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-gray-900 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="font-extrabold text-3xl text-purple-700">
              {singleJob?.title || "Loading..."}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge
                variant="ghost"
                className="text-purple-700 font-semibold border border-purple-300"
              >
                {singleJob?.postion} Positions
              </Badge>
              <Badge
                variant="ghost"
                className="text-[#F83002] font-semibold border border-[#F83002]"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                variant="ghost"
                className="text-purple-800 font-semibold border border-purple-400"
              >
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-8 py-3 font-semibold text-white shadow-md transition duration-300 ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <h2 className="text-xl font-semibold border-b-2 border-purple-300 pb-3 mb-6 text-purple-700">
          Job Description
        </h2>

        <div className="space-y-4 text-gray-800">
          <DetailRow label="Role" value={singleJob?.title} />
          <DetailRow label="Location" value={singleJob?.location} />
          <DetailRow label="Description" value={singleJob?.description} />
          <DetailRow
            label="Experience"
            value={`${singleJob?.experienceLevel} yrs`}
          />
          <DetailRow label="Salary" value={`${singleJob?.salary} LPA`} />
          <DetailRow
            label="Total Applicants"
            value={singleJob?.applications?.length}
          />
          <DetailRow
            label="Posted Date"
            value={singleJob?.createdAt?.split("T")[0]}
          />
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex gap-4">
    <h3 className="font-bold w-36 text-purple-700">{label}:</h3>
    <p className="flex-1">{value || "N/A"}</p>
  </div>
);

export default JobDescription;

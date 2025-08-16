import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-12">
        <h1 className="font-extrabold text-2xl mb-6 text-purple-700">
          Applicants{" "}
          <span className="text-gray-600 font-normal">
            {applicants?.applications?.length || 0}
          </span>
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;

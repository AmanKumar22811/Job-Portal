import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white text-gray-900 pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-purple-200 rounded-2xl my-8 p-8 shadow-lg">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-purple-300 shadow-md">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-extrabold text-2xl text-purple-700">
                {user?.fullname || "User Name"}
              </h1>
              <p className="mt-1 text-gray-700 max-w-lg">
                {user?.profile?.bio || "No bio provided."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-purple-700 hover:text-white hover:bg-purple-700 transition rounded-lg p-2"
            aria-label="Edit Profile"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-6 space-y-4 text-gray-800">
          <div className="flex items-center gap-3">
            <Mail className="text-purple-600" />
            <span className="text-lg">
              {user?.email || "Email not available"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-purple-600" />
            <span className="text-lg">
              {user?.phoneNumber || "Phone number not available"}
            </span>
          </div>
        </div>

        <div className="my-6">
          <h2 className="font-semibold text-xl text-purple-700 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-purple-200 text-purple-800 font-semibold"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        <div className="max-w-sm mt-6">
          <Label className="text-purple-700 font-bold mb-2">Resume</Label>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className="text-purple-600 hover:underline break-words"
            >
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="font-extrabold text-2xl text-purple-700 mb-5">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

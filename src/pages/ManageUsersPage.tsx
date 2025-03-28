import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Select } from "@mantine/core";
import axiosRequest from "../utils/axiosConfig";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function ManageUsersPage() {
  const [users, setUsers] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const handleSelectSearch = (value: string) => {
    axiosRequest
      .post("/user/search", {
        search: value,
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  };
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-[700]">Manage Users</h1>
        <div className="flex gap-[20px] w-full">
          <div className="flex flex-col gap-[5px] w-full">
            <span>Users information</span>
            <div className="p-[15px] rounded-[15px] bg-[#D9D9D980] flex flex-col gap-[5px]">
              <span>Total Users: 296</span>
              <span>Active Users: 237</span>
              <span>Alerts: 72</span>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <span>Users information</span>
            <div className="p-[15px] rounded-[15px] bg-[#D9D9D980] flex flex-col gap-[5px]">
              <ul className="list-disc list-inside">
                <li>John Registered</li>
                <li>Andy sent an alert to caregiver</li>
                <li>Caregiver called Andy</li>
                <li>Andy detected 10 obstacles</li>
              </ul>
            </div>
          </div>
        </div>

        <Select
          label="Select a user"
          withAsterisk
          data={users.map((user) => ({
            value: user._id,
            label: `${user.firstName} ${user.lastName} - ${user.phoneNumber}`,
          }))}
          searchable
          placeholder="Select a user"
          onSearchChange={handleSelectSearch}
          onChange={(value) => {
            setSelectedUser(users.find((user) => user._id === value));
          }}
          value={selectedUser?._id}
        />

        {selectedUser && (
          <div className="flex gap-[10px]">
            <PrimaryButton
              onClick={() => {
                navigate("/activity-log/" + selectedUser._id);
              }}
            >
              User Activity log
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                navigate("/alert-log/" + selectedUser._id);
              }}
            >
              User Alerts
            </PrimaryButton>
          </div>
        )}
      </Container>
    </MainLayout>
  );
}

export default ManageUsersPage;

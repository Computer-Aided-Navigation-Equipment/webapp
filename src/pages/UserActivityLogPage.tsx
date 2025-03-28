import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import axiosRequest from "../utils/axiosConfig";

function UserActivityLogPage() {
  const { userId } = useParams();
  const [logs, setLogs] = useState<any[]>([]);
  const [user, setUser] = useState<any>();

  // Group logs by date and calculate total distance
  const groupLogsByDate = (logs: any[]) => {
    const groupedLogs = logs.reduce((groups, log) => {
      const date = new Date(log.createdAt).toLocaleDateString(); // Get the date as a string (you can customize the format if needed)
      if (!groups[date]) {
        groups[date] = { logs: [], totalDistance: 0 };
      }
      groups[date].logs.push(log);
      groups[date].totalDistance += log.miles;
      return groups;
    }, {} as Record<string, { logs: any[]; totalDistance: number }>);

    return groupedLogs;
  };

  useEffect(() => {
    axiosRequest.get(`/admin/get-user-logs/${userId}`).then((response) => {
      setLogs(response.data.logs);
    });
  }, [userId]);

  useEffect(() => {
    axiosRequest.get(`/user/get-one/${userId}`).then((response) => {
      setUser(response.data.user);
    });
  }, [userId]);

  const groupedLogs = groupLogsByDate(logs);

  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-[700]">User Activity Logs</h1>
        {user && (
          <div className="flex items-start flex-col self-start">
            <span>User Name:</span>
            <div className="bg-[#D9D9D980] rounded-[15px] px-[20px] py-[10px]">
              {user.firstName} {user.lastName} : {user.email}
            </div>
          </div>
        )}
        {Object.keys(groupedLogs).map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul className="list-disc ml-8">
              {groupedLogs[date].logs.map((log: any) => (
                <li key={log.id}>
                  {new Date(log.createdAt).toLocaleTimeString()} | Obstacles:{" "}
                  {log.numberOfObstacles} | {log.miles} miles
                </li> // Assuming each log has a unique 'id'
              ))}
            </ul>
            <p>Total Distance: {groupedLogs[date].totalDistance} miles</p>
          </div>
        ))}
      </Container>
    </MainLayout>
  );
}

export default UserActivityLogPage;

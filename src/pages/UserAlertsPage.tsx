import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import axiosRequest from "../utils/axiosConfig";

function UserAlertsPage() {
  const { userId } = useParams();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [user, setUser] = useState<any>();

  // Group alerts by date
  const groupAlertsByDate = (alerts: any[]) => {
    const groupedAlerts = alerts.reduce((groups, alert) => {
      const date = new Date(alert.createdAt).toLocaleDateString(); // Get the date as a string (you can customize the format if needed)
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(alert);
      return groups;
    }, {});

    return groupedAlerts;
  };

  useEffect(() => {
    axiosRequest.get(`/admin/get-user-alerts/${userId}`).then((response) => {
      setAlerts(response.data.alerts);
    });
  }, [userId]);

  useEffect(() => {
    axiosRequest.get(`/user/get-one/${userId}`).then((response) => {
      setUser(response.data.user);
    });
  }, [userId]);

  const groupedAlerts = groupAlertsByDate(alerts);

  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-[700]">User Activity Alerts</h1>
        {user && (
          <div className="flex items-start flex-col self-start">
            <span>User Name:</span>
            <div className="bg-[#D9D9D980] rounded-[15px] px-[20px] py-[10px]">
              {user.firstName} {user.lastName} : {user.email}
            </div>
          </div>
        )}
        {Object.keys(groupedAlerts).map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul className="list-disc ml-8">
              {groupedAlerts[date].map((alert: any) => (
                <li key={alert.id}>
                  {new Date(alert.createdAt).toLocaleTimeString()} |{" "}
                  {user.firstName} {user.lastName} sent an alert at{" "}
                  {alert.location}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </MainLayout>
  );
}

export default UserAlertsPage;

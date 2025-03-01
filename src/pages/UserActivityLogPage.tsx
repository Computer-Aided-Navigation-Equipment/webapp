import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { useParams } from "react-router-dom";

function UserActivityLogPage() {
  const { userId } = useParams();
  return (
    <MainLayout>
      <Container>{userId}</Container>
    </MainLayout>
  );
}

export default UserActivityLogPage;

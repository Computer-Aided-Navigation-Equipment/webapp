import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import axiosRequest from "../utils/axiosConfig";
import { Modal, Button, Rating } from "@mantine/core";

function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = React.useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = React.useState<any>(null);
  const [modalOpened, setModalOpened] = React.useState(false);

  React.useEffect(() => {
    axiosRequest.get("/feedback/get-all").then((response) => {
      setFeedbacks(response.data.feedbacks);
    });
  }, []);

  const handleViewClick = (feedback: any) => {
    setSelectedFeedback(feedback);
    setModalOpened(true);
  };

  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-[700]">Feedback Submissions</h1>
        <span>Feedback List:</span>
        <div className="h-[500px] overflow-y-auto bg-[#D9D9D980] rounded-[15px]">
          {feedbacks &&
            feedbacks.map((feedback: any) => (
              <div key={feedback.id} className="p-[15px]">
                {new Date(feedback.createdAt).toLocaleString()} |{" "}
                {feedback.userId?.firstName} {feedback.userId?.lastName} :{" "}
                {feedback.thoughts} |{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleViewClick(feedback)}
                >
                  [view]
                </span>
              </div>
            ))}
        </div>
      </Container>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Feedback Details"
      >
        {selectedFeedback && (
          <div>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedFeedback.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>User:</strong> {selectedFeedback.userId.firstName}{" "}
              {selectedFeedback.userId.lastName}
            </p>
            <p>
              <strong>Thoughts:</strong> {selectedFeedback.thoughts}
            </p>
            <p>
              <strong>Suggestions:</strong> {selectedFeedback.suggestions}
            </p>
            <p>
              <strong>Issues:</strong> {selectedFeedback.issues}
            </p>
            <p>
              <strong>Issues Description:</strong>{" "}
              {selectedFeedback.issuesDescription}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <Rating defaultValue={selectedFeedback.rating} />
            </p>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}

export default AdminFeedbacks;

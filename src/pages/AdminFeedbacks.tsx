import React from "react";
import MainLayout from "../layouts/MainLayout"; // Reuses the main layout for consistent page structure
import Container from "../components/Container"; // Wrapper component for consistent spacing/styling
import axiosRequest from "../utils/axiosConfig"; // Axios instance with base config
import { Modal, Button, Rating } from "@mantine/core"; // Mantine UI components

function AdminFeedbacks() {
  // State to hold the list of feedbacks
  const [feedbacks, setFeedbacks] = React.useState<any[]>([]);
  // State to track which feedback is selected for viewing in the modal
  const [selectedFeedback, setSelectedFeedback] = React.useState<any>(null);
  // State to control modal visibility
  const [modalOpened, setModalOpened] = React.useState(false);

  // Fetch feedbacks once on component mount
  React.useEffect(() => {
    axiosRequest.get("/feedback/get-all").then((response) => {
      setFeedbacks(response.data.feedbacks);
    });
  }, []);

  // Handle the click event to view full feedback details in modal
  const handleViewClick = (feedback: any) => {
    setSelectedFeedback(feedback);
    setModalOpened(true);
  };

  return (
    <MainLayout>
      <Container>
        {/* Page Title */}
        <h1 className="text-[36px] font-[700]">Feedback Submissions</h1>
        <span>Feedback List:</span>

        {/* Scrollable feedback list container */}
        <div className="h-[500px] overflow-y-auto bg-[#D9D9D980] rounded-[15px]">
          {feedbacks.map((feedback: any) => (
            <div key={feedback.id} className="p-[15px]">
              {/* Display date, user, and quick feedback summary */}
              {new Date(feedback.createdAt).toLocaleString()} |{" "}
              {feedback.userId.firstName} {feedback.userId.lastName} :{" "}
              {feedback.thoughts} |{" "}
              {/* Button to open modal */}
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleViewClick(feedback)}
              >
                [view]
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Modal to show full feedback details */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Feedback Details"
      >
        {/* Render modal content only if feedback is selected */}
        {selectedFeedback && (
          <div className="space-y-2">
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
              {/* Mantine rating component, displays value in stars */}
              <Rating defaultValue={selectedFeedback.rating} readOnly />
            </p>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}

export default AdminFeedbacks; // Export component for route usage

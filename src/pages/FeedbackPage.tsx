import React from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Input, Rating, SegmentedControl, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";

function FeedbackPage() {
  const form = useForm({
    initialValues: {
      rating: 2,
      thoughts: "",
      issues: "No",
      issuesDescription: "",
      suggestions: "",
    },
    validate: {
      rating: (value) => {
        if (!value) {
          return "Rating is required";
        }
      },
      thoughts: (value) => {
        if (!value) {
          return "Thoughts are required";
        }
      },
      issues: (value) => {
        if (!value) {
          return "Issues are required";
        }
      },
      issuesDescription: (value) => {
        if (form.values.issues === "Yes" && !value) {
          return "Issues description is required";
        }
      },
      suggestions: (value) => {
        if (!value) {
          return "Suggestions are required";
        }
      },
    },
  });
  return (
    <MainLayout>
      <Container>
        <h1 className="text-[36px] font-[700]">Feedback</h1>
        <form className="flex flex-col gap-[20px] w-full">
          <div className="flex gap-[20px] w-full">
            <div className="flex flex-col w-full gap-[10px]">
              <Input.Wrapper
                className="flex flex-col gap-[5px]"
                label="How would your rate the Smart Cane"
                withAsterisk
              >
                <Rating
                  defaultValue={2}
                  value={form.values.rating}
                  onChange={(val) => {
                    form.setFieldValue("rating", form.values.rating);
                  }}
                />
              </Input.Wrapper>
              <Textarea
                withAsterisk
                placeholder="Your feedback"
                label="Please share your thoughts"
                {...form.getInputProps("thoughts")}
              />
            </div>
            <div className="flex flex-col w-full gap-[10px]">
              <Input.Wrapper
                className="flex flex-col gap-[5px]"
                withAsterisk
                label="Did your encouter any issues?"
              >
                <SegmentedControl
                  data={["Yes", "No"]}
                  value={form.values.issues}
                  onChange={(value) => {
                    form.setFieldValue("issues", value);
                  }}
                />
              </Input.Wrapper>
              <Textarea
                placeholder="Your feedback"
                label="If yes describe the issues"
                {...form.getInputProps("issuesDescription")}
              />
              <Textarea
                placeholder="Your feedback"
                withAsterisk
                label="Suggestions for improvement"
                {...form.getInputProps("suggestions")}
              />
            </div>
          </div>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </form>
      </Container>
    </MainLayout>
  );
}

export default FeedbackPage;

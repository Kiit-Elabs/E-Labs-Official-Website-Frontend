import React, { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Slider,
  Button,
  Spinner,
  Form,
  addToast,
} from "@heroui/react";

const SubmitFeedback = () => {
  // const [rating, setRating] = React.useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedData) return;

    const sendRequest = async () => {
      setIsLoading(true);

      const jsonData = {
        user: submittedData.get("user"),
        feedback: submittedData.get("feedback"),
      };

      const data = await fetch(import.meta.env.VITE_ADD_FEEDBACK_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const parsedData = await data.json();

      if (data.status !== 200) {
        addToast({
          title: "Failed to submit. Please try again.",
          color: "danger",
          className: "dark",
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
          onClose: () => {
            window.location.reload();
          },
        });
        setSubmittedData(null);
      } else {
        addToast({
          title: "Thank you for submitting your feedback!",
          className: "dark",
          classNames: {
            title: "font-varela text-left",
          },
          radius: "lg",
          color: "success",
          timeout: 60000,
          onClose: () => {
            window.location.reload();
          },
        });
      }
      setIsLoading(false);
    };

    sendRequest();
  }, [submittedData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // data.append("rating", rating);
    setSubmittedData(data);
  };

  return (
    <div className="container mx-auto px-5 dark items-center justify-center flex flex-col">
      <div className="flex w-full items-center justify-center mt-8">
        <h1 className="text-textColor1 text-5xl tracking-tight font-bold text-center w-full">
          Submit Feedback
        </h1>
      </div>
      <div className="mt-10 mb-20 rounded-xl border-textColor1 border-2 p-8 lg:p-16 flex flex-col items-center justify-center gap-14 overflow-x-hidden w-full max-w-[1000px]">
        <Form
          className="flex max-w-[800px] w-full flex-col gap-8 items-start justify-center py-4"
          validationBehavior="native"
          onReset={() => {
            setSubmittedData(null);
          }}
          onSubmit={onSubmit}
        >
          {/* <Slider
            size="md"
            color="warning"
            label="Rating"
            showSteps={true}
            maxValue={10}
            minValue={1}
            onChangeEnd={(value) => setRating(value)}
            marks={[
              {
                value: 1,
                label: "1",
              },
              {
                value: 10,
                label: "10",
              },
            ]}
            classNames={{
              label: "text-md text-[#f5a524]",
              value: "text-md text-[#f5a524]",
              mark: "text-md text-[#f5a524]",
            }}
          /> */}
          <Input
            label="Your Name"
            variant="bordered"
            labelPlacement="outside"
            placeholder="John Doe"
            size="lg"
            isClearable
            name="user"
            color="warning"
            isRequired
            classNames={{
              label: "text-md",
              errorMessage: "text-left text-[13px]",
            }}
            className="w-full"
          ></Input>
          <Textarea
            label="Your feedback about the society"
            variant="bordered"
            color="warning"
            isRequired
            name="feedback"
            isClearable
            labelPlacement="outside"
            minRows={6}
            classNames={{
              label: "text-md",
              errorMessage: "text-left text-[13px]",
            }}
          ></Textarea>
          <div className="flex w-full items-center justify-center flex-wrap flex-row gap-8 pt-5">
            <Button
              className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
              type="submit"
              variant="shadow"
              isDisabled={isLoading}
              color="warning"
              radius="lg"
              size="lg"
              startContent={
                isLoading && <Spinner color="default" variant="gradient" />
              }
            >
              Submit
            </Button>
            <Button
              className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
              type="reset"
              variant="faded"
              radius="lg"
              isDisabled={isLoading}
              color="warning"
              size="lg"
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SubmitFeedback;

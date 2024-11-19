import { Box, Button, Card, InlineStack, Text } from "@shopify/polaris";
import { useEffect } from "react";
import { CommonInformation } from "./components/CommonInformation";
import { PersonalInformation } from "./components/PersonalInformation";
import { handleRace } from "./helper";
import { useFormState } from "./useFormState";

export default function TestPage() {
  const { fields, submit } = useFormState();

  useEffect(() => {
    // handleAll();
    // handleAllSettled();
    // handleAny();
    handleRace();
  }, []);

  return (
    <div className="container">
      <div className="w-[800px] max-w-full mt-10 mx-auto">
        <Card>
          <Text as="p" variant="bodyLg" fontWeight="semibold">
            Common Information
          </Text>
          <PersonalInformation name={fields.name} email={fields.email} />

          <Box paddingBlockStart="400" />
          <Text as="p" variant="bodyLg" fontWeight="semibold">
            Common Information
          </Text>
          <CommonInformation
            address={fields.address}
            jobTitle={fields.jobTitle}
          />

          <Box paddingBlockStart="400" />
          <InlineStack align="end">
            <Button variant="primary" onClick={submit}>
              Submit
            </Button>
          </InlineStack>
        </Card>
      </div>
    </div>
  );
}

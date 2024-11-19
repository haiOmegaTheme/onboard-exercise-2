import { TextField } from "@shopify/polaris";
import { Field } from "@shopify/react-form";

type Props = {
  address: Field<string>;
  jobTitle: Field<string>;
};

export const CommonInformation = ({ address, jobTitle }: Props) => {
  return (
    <div>
      <TextField label="Address" autoComplete="off" {...address} />
      <TextField label="Job Title" autoComplete="off" {...jobTitle} />
    </div>
  );
};

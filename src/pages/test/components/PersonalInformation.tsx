import { TextField } from "@shopify/polaris";
import { Field } from "@shopify/react-form";

type Props = {
  name: Field<string>;
  email: Field<string>;
};

export const PersonalInformation = ({ name, email }: Props) => {
  return (
    <div>
      <TextField label="Name" autoComplete="off" {...name} />
      <TextField label="Email" autoComplete="off" {...email} />
    </div>
  );
};

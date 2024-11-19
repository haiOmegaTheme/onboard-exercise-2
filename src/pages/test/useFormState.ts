import { notEmpty, useField, useForm } from "@shopify/react-form";

export const useFormState = () => {
  const nameField = useField({
    value: "",
    validates: [],
  });

  const emailField = useField(
    {
      value: "demo",
      validates: () => {
        console.log(nameField.value);
        return "";
      },
    },
    [nameField.value]
  );

  const { fields, submit } = useForm({
    fields: {
      name: nameField,
      email: emailField,
      address: useField({
        value: "",
        validates: [notEmpty("Name is required!")],
      }),
      jobTitle: useField({
        value: "",
        validates: [notEmpty("Name is required!")],
      }),
    },
    onSubmit: async (props) => {
      console.log(props);
      return { status: "success" };
    },
  });

  return {
    fields,
    submit,
  };
};

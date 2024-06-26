import { Spinner } from "@shopify/polaris";

export const Loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div>
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    </div>
  );
};

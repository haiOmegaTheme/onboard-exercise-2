import { Page } from "@shopify/polaris";
import { DemoTable } from "./DemoTabel";

export default function ContactPage() {
  return (
    <Page fullWidth={false}>
      <div>contact</div>
      <div className="mt-10">
        <DemoTable />
      </div>
    </Page>
  );
}

import { LayoutProps } from "@/types";
import { Text } from "@shopify/polaris";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-dvh">
      <div className="flex items-center justify-between py-2 px-5 bg-black">
        <Text as="h2">Demo</Text>
      </div>
      <div className="px-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 2xl:px-28 3xl:px-32 flex-1 overflow-y-scroll pb-[60px] pt-2.5">
        {children}
      </div>
    </div>
  );
}

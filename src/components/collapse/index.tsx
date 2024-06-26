import { useDisclosure } from "@/hooks";
import { Card, Collapsible, CollapsibleProps, Icon } from "@shopify/polaris";
import { ChevronRightIcon, ChevronDownIcon } from "@shopify/polaris-icons";

type ACollapseProps = CollapsibleProps & {
  children?: React.ReactNode;
  toggleTitle?: React.ReactNode;
};

export const ACollapse = (props: ACollapseProps) => {
  const { open: visible, children, toggleTitle, ...rest } = props;
  const { isOpen, toggle } = useDisclosure(visible);
  return (
    <div>
      <Card>
        <button
          className="w-full flex justify-between items-center cursor-pointer py-2"
          onClick={toggle}
        >
          <div className="text-pink font-bold">{toggleTitle}</div>
          <div className="!text-pink">
            <Icon
              source={!isOpen ? ChevronRightIcon : ChevronDownIcon}
              tone="inherit"
            />
          </div>
        </button>
        <Collapsible
          open={isOpen}
          transition={{ duration: "350ms", timingFunction: "ease-in-out" }}
          expandOnPrint
          {...rest}
        >
          <div>{children}</div>
        </Collapsible>
      </Card>
    </div>
  );
};

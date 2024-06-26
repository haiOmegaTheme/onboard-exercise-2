import { Suspense } from "react";
import { IRoute } from "@/types";
import { Loading } from "@/components/loading";

export const RouteComponent = (props: IRoute) => {
  const { layout: Layout, component: Component } = props;

  const RenderComponent = Layout ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Component />
  );

  return <Suspense fallback={<Loading />}>{RenderComponent}</Suspense>;
};

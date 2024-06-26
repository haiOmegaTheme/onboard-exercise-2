import { Route, Routes } from "react-router-dom";
import routeList from "./routes";
import { RouteComponent } from "./routes/render";

export default function App() {
  return (
    <Routes>
      {routeList.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RouteComponent {...route} />}
        />
      ))}
    </Routes>
  );
}

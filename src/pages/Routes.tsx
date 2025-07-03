/** @jsxImportSource react **/
import { Routes as ReactRoutes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Contest } from "./Contest";

export function Routes(props: any) {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/contest/:key" element={<Contest {...props} />} />
    </ReactRoutes>
  );
}
import { Routes as ReactRouterRoutes, Route } from "react-router";
import { Login, Register, UpdateUser } from "../../pages/";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="updateProfile" element={<UpdateUser />} />
      </Route>
    </ReactRouterRoutes>
  );
}

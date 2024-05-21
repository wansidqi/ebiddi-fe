import "./custom.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import {
  Contract,
  Events,
  Home,
  Live,
  Login,
  Policies,
  Profile,
  ReportCar,
  ReportMotor,
  TAC,
} from "@/pages";
import { Items } from "./sections";
import { useEffect } from "react";
import { TOKEN, getToken } from "./datasource/sessionStorage.datasource";
import { useStoreContext } from "./Context";

function App() {
  const { SET_USER } = useStoreContext();

  useEffect(() => {
    const userAuth = JSON.parse(getToken(TOKEN.user) as string);
    SET_USER(userAuth);
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/contract"} element={<Contract />} />
      <Route path={"/policy"} element={<Policies />} />
      <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
      <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
      <Route path={"/events"} element={<Events />} />
      <Route path={"/items/:eventId"} element={<Items />} />
      <Route path={"/live/:eventId"} element={<Live />} />

      <Route element={<Authenticated />}>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/tac"} element={<TAC />} />
      </Route>

      <Route element={<NotAuthenticated />}>
        <Route path={"/profile"} element={<Profile />} />
      </Route>
    </Routes>
  );
}

function Authenticated() {
  const { USER } = useStoreContext();

  if (USER) return <Navigate to="/events" />;
  return <Outlet />;
}

function NotAuthenticated() {
  const { USER } = useStoreContext();

  if (!USER) return <Navigate to="/" />;
  return <Outlet />;
}

export default App;

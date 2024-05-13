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
import "./custom.css";
import { useEffect } from "react";
import { TOKEN, getToken } from "./datasource/localstorage.datasource";
import { useStoreContext } from "./Context";

function App() {
  const { auction } = useStoreContext();
  const { SET_USER } = auction;

  useEffect(() => {
    const userAuth = JSON.parse(getToken(TOKEN.user) as string);
    SET_USER(userAuth);
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/contract"} element={<Contract />} />
      <Route path={"/policy"} element={<Policies />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
      <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
      <Route path={"/events"} element={<Events />} />
      <Route path={"/items/:eventId"} element={<Items />} />
      <Route path={"/live"} element={<Live />} />

      <Route element={<Authenticated />}>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/tac"} element={<TAC />} />
      </Route>
    </Routes>
  );
}

function Authenticated() {
  const { auction } = useStoreContext();
  const { USER } = auction;

  if (USER) return <Navigate to="/events" />;
  return <Outlet />;
}

export default App;

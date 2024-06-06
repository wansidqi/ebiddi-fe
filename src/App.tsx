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
import { AuctioneerContract, Items } from "./sections";
import { Fragment, useEffect } from "react";
import { TOKEN, getToken } from "./datasource/sessionStorage.datasource";
import { useStoreContext } from "./Context";
import { AlertDialog, WS } from "./components";

function App() {
  const { SET_USER } = useStoreContext();

  useEffect(() => {
    const userAuth = JSON.parse(getToken(TOKEN.user) as string);
    SET_USER(userAuth);
  }, []);

  return (
    <Fragment>
      <div className="flexcenter w-full">
        <AlertDialog />
      </div>
      <Routes>
        <Route element={<RequireVerificationToken />}>
          <Route path={"/tac"} element={<TAC />} />
        </Route>

        <Route element={<RequireNoAuth />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route>

        <Route path={"/ws"} element={<WS />} />
        <Route path={"/contract"} element={<Contract />} />
        <Route path={"/policy"} element={<Policies />} />
        <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
        <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
        <Route path={"/events"} element={<Events />} />
        <Route path={"/items/:eventId"} element={<Items />} />
        <Route path={"/live/:eventId"} element={<Live />} />

        <Route path={"/auctioneer/contract/:auctionId"} element={<AuctioneerContract />} />
      </Routes>
    </Fragment>
  );
}

function RequireNoAuth() {
  const { USER } = useStoreContext();
  return !USER ? <Outlet /> : <Navigate to="/events" />;
}

function RequireAuth() {
  const { USER } = useStoreContext();
  return USER ? <Outlet /> : <Navigate to="/login" />;
}

function RequireVerificationToken() {
  const token = getToken(TOKEN.auth);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default App;

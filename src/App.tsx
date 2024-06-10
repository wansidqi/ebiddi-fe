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
import { AuctContract, AuctList, Items } from "./sections";
import { Fragment, useEffect } from "react";
import { TOKEN, getToken } from "./datasource/sessionStorage.datasource";
import { useStoreContext } from "./Context";
import { AlertDialog } from "./components";
import { ROLE } from "./interfaces/enum";

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

        <Route element={<RequireBidderAuth />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/contract"} element={<Contract />} />
          <Route path={"/policy"} element={<Policies />} />
        </Route>

        <Route element={<RequireAuctioneerAuth />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/auctioneer/list/:eventId"} element={<AuctList />} />
          <Route path={"/contract/event/:eventId"} element={<AuctContract />} />
          <Route
            path={"/auctioneer/live/:eventId/:auctionId"}
            element={<Live />}
          />
        </Route>

        <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
        <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
        <Route path={"/events"} element={<Events />} />
        <Route path={"/items/:eventId"} element={<Items />} />
        <Route path={"/live/:eventId"} element={<Live />} />
      </Routes>
    </Fragment>
  );
}

function RequireNoAuth() {
  const { USER } = useStoreContext();
  return !USER ? <Outlet /> : <Navigate to="/events" />;
}

function RequireBidderAuth() {
  const { USER } = useStoreContext();
  return USER?.role === ROLE.BIDDER ? <Outlet /> : <Navigate to="/login" />;
}

function RequireAuctioneerAuth() {
  const { USER } = useStoreContext();
  return USER?.role === ROLE.AUCTIONEER ? <Outlet /> : <Navigate to="/login" />;
}

function RequireVerificationToken() {
  const token = getToken(TOKEN.auth);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default App;

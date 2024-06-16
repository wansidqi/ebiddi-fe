import "./custom.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { Fragment, useEffect, useState } from "react";
import { TOKEN, getToken } from "./datasource/sessionStorage.datasource";
import { useStoreContext } from "./Context";
import { AlertDialog } from "./components";
import { ROLE } from "./enum";
import { LoaderCircle } from "lucide-react";
import {
  TAC,
  Login,
  Profile,
  Contract,
  Policies,
  AuctioneerList,
  AuctContract,
  LivePage,
  ReportMotor,
  ReportCar,
  EventsPage,
  Items,
  Home,
} from "./sections";

function App() {
  const { SET_USER } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAuth = JSON.parse(getToken(TOKEN.user) as string);
    SET_USER(userAuth);
    setLoading(false);
  }, [SET_USER]);

  if (loading) {
    return <Spinner />;
  }

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
          <Route path={"/contract"} element={<Contract />} />
          <Route path={"/policy"} element={<Policies />} />
        </Route>

        <Route element={<RequireAuctioneerAuth />}>
          <Route path={"/auctioneer/list/:eventId"} element={<AuctioneerList />} />
          <Route path={"/contract/event/:eventId"} element={<AuctContract />} />
          <Route path={"/auctioneer/live/:eventId/:auctionId"} element={<LivePage />} />
        </Route>

        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
        <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
        <Route path={"/events"} element={<EventsPage />} />
        <Route path={"/items/:eventId"} element={<Items />} />
        <Route path={"/live/:eventId"} element={<LivePage />} />
      </Routes>
    </Fragment>
  );
}

function RequireNoAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <Spinner />;

  if (dev) {
    return <Outlet />;
  } else {
    return !USER ? <Outlet /> : <Navigate to="/events" />;
  }
}

function RequireBidderAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <Spinner />;

  if (dev) {
    return <Outlet />;
  } else {
    return USER?.role === ROLE.BIDDER ? <Outlet /> : <Navigate to="/login" />;
  }
}

function RequireAuctioneerAuth() {
  const { USER, dev } = useStoreContext();
  if (USER === undefined) return <Spinner />;

  if (dev) {
    return <Outlet />;
  } else {
    return USER?.role === ROLE.AUCTIONEER ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }
}

function RequireVerificationToken() {
  const { dev } = useStoreContext();
  const token = getToken(TOKEN.auth);
  if (token === undefined) return <Spinner />;

  if (dev) {
    return <Outlet />;
  } else {
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
}

function Spinner() {
  return (
    <div className="flexcenter h-screen">
      <LoaderCircle size={"100px"} className="animate-spin" />
    </div>
  );
}

export default App;

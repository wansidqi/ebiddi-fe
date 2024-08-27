import "./custom.css";
import { Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useStoreContext } from "./Context";
import { AlertDialog, LoadingPage } from "./components";
import {
  TAC,
  Login,
  // Profile,
  Contract,
  Policies,
  AuctioneerList,
  AuctContract,
  LivePage,
  ReportMotor,
  ReportCar,
  Items,
  Home,
  NewProfile,
  ReAuctioneerList,
  NewEventsPage,
} from "./sections";
import {
  RequireVerificationToken,
  RequireNoAuth,
  RequireBidderAuth,
  RequireAuctioneerAuth,
} from "./routes";
import { useAPIServices } from "./services";
import { User } from "./interfaces";

function App() {
  const { SET_USER } = useStoreContext();
  const { useGetUserDetail } = useAPIServices();
  const { data, isLoading } = useGetUserDetail();

  useEffect(() => {
    SET_USER(data as User);
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
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

        {/* prettier-ignore */}
        <Route element={<RequireAuctioneerAuth />}>
          <Route path={"/auctioneer/list/:eventId"} element={<AuctioneerList />} />
          <Route path={"/auctioneer/reauction-list/:eventId"} element={<ReAuctioneerList />} />
          <Route path={"/contract/event/:eventId"} element={<AuctContract />} />
          <Route path={"/auctioneer/live/:eventId/:auctionId"} element={<LivePage />} />
        </Route>

        <Route path={"/profile"} element={<NewProfile />} />
        <Route path={"/ireportmotor/:vehicle_id"} element={<ReportMotor />} />
        <Route path={"/ireportcar/:vehicle_id"} element={<ReportCar />} />
        <Route path={"/events"} element={<NewEventsPage />} />
        <Route path={"/items/:eventId"} element={<Items />} />
        <Route path={"/live/:eventId"} element={<LivePage />} />
      </Routes>
    </Fragment>
  );
}

export default App;

import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import {
  Events,
  Home,
  Live,
  Login,
  ReportCar,
  ReportMotor,
  TAC,
} from "@/pages";
import { Items } from "./sections";
import "./custom.css";

const routes = [
  { status: "public", component: <ReportMotor />, path: "/" },
  { status: "public", component: <ReportCar />, path: "/" },
  { status: "public", component: <Home />, path: "/" },
  { status: "public", component: <Events />, path: "/events" },
  { status: "public", component: <Items />, path: "/items/:eventId" },
  { status: "public", component: <Live />, path: "/live" },
  { status: "private", component: <Login />, path: "/login" },
  { status: "private", component: <TAC />, path: "/tac" },
];

function App() {
  return (
    <Routes>
      <Route element={<Authenticate />}>
        {routes.map((item, i) => (
          // item.status === "private" &&
          <Route key={i} path={item.path} element={item.component} />
        ))}
      </Route>
    </Routes>
  );
}

function Authenticate() {
  const isAuthenticate = true;
  if (!isAuthenticate) return <Navigate to="/" />;
  return <Outlet />;
}

export default App;

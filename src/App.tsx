import { Route, Routes } from "react-router-dom";
import { Events, Home, Live } from "./pages";
import { Header, Items } from "./sections";
import "./custom.css";

const routes = [
  {
    status: "view",
    path: "/",
    component: <Home />,
  },
  {
    status: "view",
    path: "/events",
    component: <Events />,
  },
  {
    status: "view",
    path: "/items/:eventId",
    component: <Items />,
  },
  {
    status: "view",
    path: "/live",
    component: <Live />,
  },
];

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((item, i) => (
          <Route key={i} path={item.path} element={item.component} />
        ))}
      </Routes>
    </>
  );
}

export default App;

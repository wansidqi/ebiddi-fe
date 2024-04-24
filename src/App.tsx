import { Route, Routes } from "react-router-dom";
import { Events, Home } from "./pages";
import { Header, Items } from "./sections";
import "./custom.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/items/:eventId" element={<Items />} />
      </Routes>
    </>
  );
}

export default App;

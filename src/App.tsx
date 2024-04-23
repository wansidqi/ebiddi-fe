import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import { ModeToggle } from "./Theme/ModeToggle";

function App() {
  return (
    <>
      <ModeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/event/detail/:id" element={<Home />} />
        <Route path="/bidding/event/:id" element={<Home />} />
        
        <Route path="/event/:id/items" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </>
  );
}

export default App;

const Hello = () => <div>e-Biddi</div>;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./page/Detail";
import Listing from "./page/Listing";
import { AirStation } from "./starport";
import { StarportProvider } from "./starport/starport-provider";

const App = () => {
  return (
    <StarportProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/detail/:filename" element={<Detail />} />
        </Routes>
      </BrowserRouter>
      <AirStation />
    </StarportProvider>
  );
};

export default App;

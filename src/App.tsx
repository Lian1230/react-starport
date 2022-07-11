import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./page/Detail";
import Listing from "./page/Listing";
import { SkyStation } from "./starport";
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
      <SkyStation />
    </StarportProvider>
  );
};

export default App;

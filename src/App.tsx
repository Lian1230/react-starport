import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./page/Detail";
import Listing from "./page/Listing";
import { SkyStation } from "./starport";
import { StarportProvider } from "./starport/starport-provider";

const App = () => {
  return (
    <StarportProvider>
      <BrowserRouter>
        <div className="max-w-1200px m-auto">
          <h1 className="text-light-900 text-6xl text-center my-14 italic">My Pokemon Collection</h1>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/detail/:filename" element={<Detail />} />
          </Routes>
        </div>
      </BrowserRouter>
      <SkyStation />
    </StarportProvider>
  );
};

export default App;

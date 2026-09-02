import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Dashboard from "./Dashboard";
import EventsPage from "./EventsPage";
import Attributes from "./Attributes";
import Categories from "./Categories";
import EventDetails from "./EventDetails";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/events" element={<EventsPage />}></Route>
          <Route path="/attributes" element={<Attributes />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/events/:eventtype" element={<EventDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;

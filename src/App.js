
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import EventsPage from './EventsPage';

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<EventsPage/>}></Route>
 </Routes>
 </BrowserRouter>
  );
}

export default App;

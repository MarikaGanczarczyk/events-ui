
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Dashboard from './Dashboard';
import EventsPage from './EventsPage';
import Atributes  from './Atributes'
import Categories from './Categories'
import EventDetails from './EventDetails';

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Dashboard/>}></Route>
    <Route path='/events' element={<EventsPage/>}></Route>
    <Route path='/atributes' element={<Atributes/>}></Route>
    <Route path='/categories' element={<Categories/>}></Route>
     <Route path='/events/:eventtype' element={<EventDetails/>}></Route>
 </Routes>
 </BrowserRouter>
  );
}

export default App;

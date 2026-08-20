
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Dashboard from './Dashboard';
import EventsPage from './EventsPage';
import Atributes  from './Atributes'
import Categories from './Categories'

function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Dashboard/>}></Route>
    <Route path='/events' element={<EventsPage/>}></Route>
    <Route path='/atributes' element={<Atributes/>}></Route>
    <Route path='/categories' element={<Categories/>}></Route>
 </Routes>
 </BrowserRouter>
  );
}

export default App;

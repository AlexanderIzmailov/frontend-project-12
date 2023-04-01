import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Layout } from './components/Layout.jsx';
import { Login } from './components/Login.jsx';
import { PageNotFound } from './components/PageNotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />}/>
          
          <Route path="login" element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

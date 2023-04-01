import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Layout } from './components/Layout.jsx';
import { Login } from './components/Login.jsx';
import { PageNotFound } from './components/PageNotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />}/>
          <Route index element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

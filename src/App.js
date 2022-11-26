import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PortalRoot } from './tools/portal/client';
import { CreateResource } from './tools/portal/client/components/CreateResource';

function App() {
  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path={"/res-management-portal/create-resource"} element={<CreateResource/>} />
            <Route path={"/res-management-portal"} element={<PortalRoot/>} />
            <Route path={"/"} element={<Navigate to={"/res-management-portal"} />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;

import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PortalRoot } from './tools/portal/client';
import { CreateResource } from './tools/portal/client/components/CreateResource';
import { PortalScreen } from './tools/portal/client/screens/PortalScreen';

function App() {
  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path={"/resource-management-portal/create-resource"} element={<CreateResource/>} />
            <Route path={"/resource-management-portal/home"} element={<PortalScreen/>} />
            <Route path={"/resource-management-portal"} element={<PortalRoot/>} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;

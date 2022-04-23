import { useEffect, useState } from 'react';
import 'react-datasheet-grid/dist/style.css'
import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Páginas
import Dashboard from "./pages/dashboard";
import UsersLogin from './pages/users-login';
import UsersRegister from './pages/users-register';
import UsersAccount from './pages/users-account';
import PartesAdd from './pages/partes-add';
import ClientsList from './pages/clients-list';
import UsersList from './pages/users-list';
import Contracts from './pages/contracts';
import EditContract from './pages/editcontract';
import RemitosList from './pages/remitos-list';
import RemitosCreate from './pages/remitos-create';
import ClientsEdit from './pages/clients-edit';
import RemitosTable from './pages/remitos-table';
import PartesTable from './pages/partes-table';



function App() {
const [user, setUser] = useState(null)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users-login" element={<UsersLogin/>} />
          <Route path="/users-register" element={<UsersRegister />} />
          <Route path="/users-account" element={<UsersAccount />} />
          <Route path="/partes-add" element={<PartesAdd />} />
          <Route path="/clients-list" element={<ClientsList />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/editcontract" element={<EditContract />} />
         
          <Route path="/remitoslist" element={<RemitosList />} />
          <Route path="/remitoscreate" element={<RemitosCreate />} />
          <Route path="/remitosedit/:id" element={<RemitosCreate />} />
          <Route path="/clientsedit/:id" element={<ClientsEdit />} />
          <Route path="/remitostable" element={<RemitosTable />} />
          <Route path="/partestable" element={<RemitosTable />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

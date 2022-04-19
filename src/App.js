import 'react-datasheet-grid/dist/style.css'
import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Páginas
import Dashboard from "./pages/dashboard";
import Login from './pages/login';
import Register from './pages/register';
import Account from './pages/account';
import CargarParteDiario from './pages/cargarparte';
import Clients from './pages/clients';
import Users from './pages/users';
import Contracts from './pages/contracts';
import EditContract from './pages/editcontract';


function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cargarparte" element={<CargarParteDiario />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/editcontract" element={<EditContract />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

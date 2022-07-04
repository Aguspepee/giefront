import { useEffect, useState, useContext } from 'react';
import 'react-datasheet-grid/dist/style.css'
import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from './context/userContext';

//Private Routes
import Private from './components/Private';

//Autenticación inicial
import { userWhoami } from './services/users';

//Páginas
import Inicio from './pages/inicio';
import Dashboard from "./pages/dashboard";
import UsersLogin from './pages/users-login';
import UsersAccount from './pages/users-account';
import PartesList from './pages/partes-list';
import ClientsList from './pages/clients-list';
import UsersList from './pages/users-list';
import ContractsList from './pages/contracts-list';
import ContractsEdit from './pages/contracts-edit';
import RemitosList from './pages/remitos-list';
import ClientsEdit from './pages/clients-edit';
//import RemitosTable from './pages/remitos-table';
//import PartesTable from './pages/partes-table';
import CertificadosList from './pages/certif-list';
import UsersCreate from './pages/users-create';
import ClientsCreate from './pages/clients-create';
import UsersEdit from './pages/users-edit';
import Loading from './pages/loading';
import SessionTimeout from './styled-components/alerts/session-timeout';
import Settings from './pages/settings';

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  const [user, setUser] = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(true)
  const [expirationTime, setExpirationTime] = useState(1000000)

  useEffect(() => {
    const Login = async () => {
      try {
        const { data: usuario } = await userWhoami()
        setExpirationTime(usuario.exp)
        setUser(usuario[0])
        setLoadingUser(false)
      } catch (e) {
        console.log(e)
        setLoadingUser(false)
      }
    }
    Login()
  }, []
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loadingUser === true &&
        <Loading />}
      {loadingUser === false &&
        <BrowserRouter>
          <Routes>

            {/* Inicio */}
            <Route path="/" element={<Private Component={Inicio} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/inicio" element={<Private Component={Inicio} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Private Component={Dashboard} user={user} roles={["Administrador", "Supervisor"]} />} />

            {/* Users */}
            <Route path="/users-account" element={<Private Component={UsersAccount} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/users-create" element={<Private Component={UsersCreate} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/users-edit/:id" element={<Private Component={UsersEdit} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/users-list" element={<Private Component={UsersList} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/users-login" element={<UsersLogin />} />

            {/* Partes */}
            <Route path="/partes-list" element={<Private Component={PartesList} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />

            {/* Contracts */}
            <Route path="/contracts-edit/:id" element={<Private Component={ContractsEdit} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/contracts-list" element={<Private Component={ContractsList} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />

            {/* Clients */}
            <Route path="/clients-edit/:id" element={<ClientsEdit />} />
            <Route path="/clients-list" element={<ClientsList />} />
            <Route path="/clients-create" element={<ClientsCreate />} />

            {/* Remitos */}
            <Route path="/remitos-list" element={<Private Component={RemitosList} user={user} roles={["Administrador"]} />} />

            {/* Certificados */}
            <Route path="/certif-list" element={<CertificadosList />} />

            {/* Loading */}
            <Route path="/loading" element={<Loading />} />

            {/* Settings*/}
            <Route path="/settings" element={<Private Component={Settings} user={user} roles={["Administrador"]} />} />

          </Routes>

          <SessionTimeout expirationTime={expirationTime} />
        </BrowserRouter>}

    </ThemeProvider>
  );
}

export default App;

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
import Dashboard from "./pages/dashboard";
import UsersLogin from './pages/users-login';
import UsersRegister from './pages/users-register';
import UsersAccount from './pages/users-account';
import PartesAdd from './pages/partes-add';
import PartesList from './pages/partes-list';
import ClientsList from './pages/clients-list';
import UsersList from './pages/users-list';
import ContractsList from './pages/contracts-list';
import ContractsEdit from './pages/contracts-edit';
import RemitosList from './pages/remitos-list';
import RemitosCreate from './pages/remitos-create';
import ClientsEdit from './pages/clients-edit';
//import RemitosTable from './pages/remitos-table';
//import PartesTable from './pages/partes-table';
import CertificacionesCreate from './pages/certif-create';
import CertificacionesList from './pages/certif-list';
import UsersCreate from './pages/users-create';
import ClientsCreate from './pages/clients-create';
import UsersEdit from './pages/users-edit';
import Loading from './pages/loading';
import SessionTimeout from './styled-components/alerts/session-timeout';



function App() {
  const [user, setUser] = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(true)
  const [expirationDialog, setExpirationDialog] = useState({ isOpen: false, title: "", subTitle: "", expired: false })
  let Now = new Date()
  let Difference = 100000000
  useEffect(() => {
    const Login = async () => {
      try {
        const { data: usuario } = await userWhoami()
        let Expiration = new Date(usuario.exp * 1000)
        Difference = Expiration - Now;
        setTimeout(() => {
          setExpirationDialog({
            title: "La sesión está por expirar",
            subTitle: "Su sesión vence en 5 minutos, guarde su trabajo e inicie sesión nuevamente.",
            isOpen: true,
            expired: false
          })
        }, Difference - (5 * 60000))
        setTimeout(() => {
          setExpirationDialog({
            title: "La sesión ha finalizado",
            subTitle: "Debe volver a iniciar sesión nuevamente.",
            isOpen: true,
            expired: true
          })
        }, Difference)
        //setTimeout(() => alert("Le quedan 5 minutos a la sesión, salga y vuelva a entrar"), Difference - (5 * 60000))
        //setTimeout(() => alert("La sesión ha terminado"), Difference)
        console.log(Difference / 60000)
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

            {/* Dashboard */}
            <Route path="/" element={<Private Component={Dashboard} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/dashboard" element={<Private Component={Dashboard} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />

            {/* Users */}
            <Route path="/users-account" element={<UsersAccount />} />
            <Route path="/users-create" element={<UsersCreate />} />
            <Route path="/users-edit/:id" element={<UsersEdit />} />
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/users-login" element={<UsersLogin />} />
            <Route path="/users-register" element={<UsersRegister />} />

            {/* Partes */}
            <Route path="/partes-add" element={<Private Component={PartesAdd} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/partes-list" element={<Private Component={PartesList} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            {/* <Route path="/partes-table" element={<RemitosTable />} /> */}

            {/* Contracts */}
            <Route path="/contracts-edit/:id" element={<Private Component={ContractsEdit} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />
            <Route path="/contracts-list" element={<Private Component={ContractsList} user={user} roles={["Administrador", "Supervisor", "Inspector", "Asistente"]} />} />

            {/* Clients */}
            <Route path="/clients-edit/:id" element={<ClientsEdit />} />
            <Route path="/clients-list" element={<ClientsList />} />
            <Route path="/clients-create" element={<ClientsCreate />} />

            {/* Remitos */}
            <Route path="/remitos-list" element={<Private Component={RemitosList} user={user} roles={["Administrador"]} />} />
            <Route path="/remitos-create" element={<RemitosCreate />} />
            {/* <Route path="/remitos-table" element={<RemitosTable />} /> */}
            <Route path="/remitos-edit/:id" element={<RemitosCreate />} />

            {/* Certificaciones */}
            <Route path="/certif-create" element={<CertificacionesCreate />} />
            <Route path="/certif-list" element={<CertificacionesList />} />

            {/* Loading */}
            <Route path="/loading" element={<Loading />} />

          </Routes>
          <SessionTimeout expirationDialog={expirationDialog} setExpirationDialog={setExpirationDialog} />
        </BrowserRouter>}

    </ThemeProvider>
  );
}

export default App;

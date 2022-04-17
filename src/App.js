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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

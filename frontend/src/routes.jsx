import { BrowserRouter, Route, Routes } from 'react-router';
import Inicio from './pages/inicio';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Admin from './pages/admin';
import AdicionarLocal from './pages/adicionarLocal';
import AdicionarLocalAdmin from './pages/adicionarLocalAdmin';
import AreaEnsino from './pages/areaEnsino';
import RelatarDesastre from './pages/relatarDesastre';
import ProtectedRoute from './components/ProtectedRoute';

export default function Navegacao() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/admin' element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
                <Route path='/adicionar-local' element={<ProtectedRoute adminOnly={false}><AdicionarLocal /></ProtectedRoute>} />
                <Route path='/adicionar-local-admin' element={<ProtectedRoute adminOnly={true}><AdicionarLocalAdmin /></ProtectedRoute>} />
                <Route path='/area-ensino' element={<ProtectedRoute><AreaEnsino /></ProtectedRoute>} />
                <Route path='/relatar-desastre' element={<RelatarDesastre />} />
            </Routes>
        </BrowserRouter>
    );
}

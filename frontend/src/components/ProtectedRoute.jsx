import { Navigate } from 'react-router';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const usuario = localStorage.getItem("USUARIO");
    const isAdmin = localStorage.getItem("ADMIN") === 'true';

    if (!usuario) {
        // Não logado, redirecionar para login
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        // Tentando acessar rota admin sem ser admin, redirecionar para inicio
        return <Navigate to="/" replace />;
    }

    // Verificar se admin está tentando acessar rota de usuário
    if (!adminOnly && isAdmin) {
        // Admin tentando acessar rota de usuário, redirecionar para admin
        return <Navigate to="/admin" replace />;
    }

    return children;
}

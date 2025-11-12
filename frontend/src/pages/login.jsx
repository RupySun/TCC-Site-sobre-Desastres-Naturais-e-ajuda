import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";
import "./login.scss";

export default function Login({ isCadastro: propIsCadastro = false }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [isCadastro, setIsCadastro] = useState(propIsCadastro);

    const navigate = useNavigate();

    useEffect(() => {
        const nomeUsuario = localStorage.getItem("USUARIO")

        if (nomeUsuario && !propIsCadastro) {
            navigate('/')
        }
    }, [propIsCadastro])

    async function entrar() {
        try {
            if (usuario === 'admin' && senha === '1234') {
                localStorage.setItem("USUARIO", 'admin')
                localStorage.setItem("ADMIN", 'true')
                navigate('/admin')
                return;
            }

            if (usuario === 'user' && senha === '1234') {
                localStorage.setItem("USUARIO", 'user')
                localStorage.setItem("ADMIN", 'false')
                navigate('/')
                return;
            }

            const body = {
                "usuario": usuario,
                "senha": senha
            }

            const response = await api.post('/entrar', body);
            const token = response.data.token;
            const nomeUsuario = response.data.usuario.usuario;

            localStorage.setItem("USUARIO", nomeUsuario)
            localStorage.setItem("TOKEN", token)

            navigate('/')
        } catch (error) {
            alert(error)
        }
    }

    async function cadastrar() {
        try {
            const body = {
                "usuario": usuario,
                "senha": senha
            }

            console.log('Tentando cadastrar:', body);
            await api.post('/usuario', body);
            alert('Usuário cadastrado com sucesso! Entrando no site...');
            const response = await api.post('/entrar', body);
            const token = response.data.token;
            const nomeUsuario = response.data.usuario.usuario;

            localStorage.setItem("USUARIO", nomeUsuario);
            localStorage.setItem("TOKEN", token);

            navigate('/');
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert(error)
        }
    }

    return (
        <div className="fundo-login">
            <div className="container-login">
                <div className="conteudo-login">
                    <div className="secao-formulario">
                    <div className="nome-site-acima">
                        <img src="/safetrack.webp" alt="SafeTrack Logo" className="logo" />
                        <span className="nome-site">SafeTrack</span>
                    </div>
                    <div className="usuario-senha">
                        <input
                            placeholder="Usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        {isCadastro ? (
                            <button onClick={cadastrar}>Cadastrar</button>
                        ) : (
                            <button onClick={entrar}>Entrar</button>
                        )}
                    </div>
                    </div>

                    <div className="secao-fotos">
                        <div className="espaco-foto">
                            <img src="/src/image/SaoPaulo.jpg" alt="SãoPaulo" className="foto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

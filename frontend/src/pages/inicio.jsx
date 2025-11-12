import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import './inicio.scss';

export default function Inicio() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [endereco, setEndereco] = useState("");
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097!2d-46.654!3d-23.550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1sen!2sbr!4v1234567890");
    const [locaisAprovados, setLocaisAprovados] = useState([]);




    useEffect(() => {
        const nomeUsuario = localStorage.getItem("USUARIO")
        const isAdmin = localStorage.getItem("ADMIN")

        if (nomeUsuario && isAdmin !== 'true') {
            setUsuario(nomeUsuario)
            setIsLoggedIn(true)
            carregarLocaisAprovados();
        } else if (isAdmin === 'true') {
            navigate('/admin')
        } else {
            setIsLoggedIn(false)
        }


    }, [])





    useEffect(() => {
        const handleFocus = () => {
            carregarLocaisAprovados();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    function carregarLocaisAprovados() {
        const locais = JSON.parse(localStorage.getItem('locaisAprovados') || '[]');
        setLocaisAprovados(locais);
    }

    async function pesquisarEndereco() {
        if (!endereco.trim()) return;

        try {
            let query = endereco.trim();

            query += ", São Paulo, SP, Brasil";

            const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
            setMapSrc(embedUrl);
            setEndereco(""); 
        } catch (error) {
            console.error("Erro na geocodificação:", error);
            alert("Erro ao pesquisar endereço. Verifique sua conexão.");
        }
    }

    async function obterLocalizacaoAtual() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
                    setMapSrc(embedUrl);
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                    alert("Erro ao obter localização. Verifique as permissões do navegador.");
                }
            );
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    }

    function adicionarLocal() {
        navigate('/adicionar-local');
    }

    function areaEnsino() {
        navigate('/area-ensino');
    }

    function navegarParaLocal(endereco) {
        const query = endereco + ", São Paulo, SP, Brasil";
        const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
        setMapSrc(embedUrl);
    }

    return (
        <div className="container-app">
            <header className="cabecalho">
                <div className="container-logo">
                    <img src="/src/image/safetrack.webp" alt="Logo SafeTrack" className="logo" />
                    <h1 className="titulo">SafeTrack<span className="r">®</span></h1>
                </div>
                <div className="pesquisa-e-botoes">
                    <div className="barra-pesquisa">
                        <input
                            type="text"
                            placeholder="  Digite o endereço (ex: Bairro, Rua - 99)"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            className="entrada-pesquisa"
                        />
                        <button onClick={pesquisarEndereco} className="botao-pesquisar">🔍</button>
                    </div>
                    <div className="botoes-acao">
                        <button onClick={obterLocalizacaoAtual} className="botao-acao">Sua localização</button>
                        <button onClick={adicionarLocal} className="botao-acao">Adicionar local</button>
                        <button onClick={areaEnsino} className="botao-acao">Área de ensino</button>
                    </div>
                </div>
                <div className="botoes-autenticacao">
                    {usuario ? (
                        <>
                            <button className="botao" onClick={() => {
                                localStorage.removeItem("USUARIO");
                                localStorage.removeItem("TOKEN");
                                setUsuario("");
                                setIsLoggedIn(false);
                                navigate('/');
                            }}>Sair da conta</button>
                            <span className="boas-vindas">Bem vindo, {usuario}</span>
                        </>
                    ) : (
                        <>
                            <button className="botao" onClick={() => navigate('/login')}>Login</button>
                            <button className="botao botao-perigo" onClick={() => navigate('/cadastro')}>Cadastrar</button>
                        </>
                    )}
                </div>
            </header>

            <div className="conteudo-principal">
                <div className="container-mapa" onWheel={(e) => e.preventDefault()}>
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </div>
            </div>

            <footer className="rodape">
                {locaisAprovados.length > 0 && (
                    <div className="barra-inferior">
                        <h4>Locais Disponíveis</h4>
                        <div className="lista-locais">
                            {locaisAprovados.map(local => (
                                <div key={local.id} className="item-local" onClick={() => navegarParaLocal(local.endereco)}>
                                    <img src={local.imagem} alt={local.nome} className="imagem-local" />
                                    <div className="info-local">
                                        <p><strong>{local.nome}</strong></p>
                                        <p>{local.endereco}</p>
                                        <p>{local.horario}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
}

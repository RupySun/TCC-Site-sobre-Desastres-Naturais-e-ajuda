import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import "./relatarDesastre.scss";

export default function RelatarDesastre() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(localStorage.getItem("USUARIO") || "");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("ADMIN") === 'true');
    const [desastreSelecionado, setDesastreSelecionado] = useState("");
    const [nivelSelecionado, setNivelSelecionado] = useState("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState("");
    const [dadosAgregados, setDadosAgregados] = useState([]);

    useEffect(() => {
        if (!usuario || !isAdmin) {
            navigate('/login');
        }
        carregarDadosAgregados();
    }, [usuario, isAdmin, navigate]);

    const carregarDadosAgregados = async () => {
        try {
            const response = await api.get('/relatar/agregados/');
            setDadosAgregados(response.data);
        } catch (error) {
            console.error("Erro ao carregar dados agregados:", error);
        }
    };

    const desastres = [
        "tornado",
        "tempestade",
        "deslizamento",
        "enchente",
        "furacão",
        "terremoto",
        "queimadas"
    ];

    const niveis = [20, 40, 60, 80, 100];

    const cidades = [
        "São Paulo",
        "Osasco",
        "Barueri",
        "Carapicuíba",
        "Cotia",
        "Diadema",
        "Embu das Artes",
        "Embu-Guaçu",
        "Ferraz de Vasconcelos",
        "Francisco Morato",
        "Franco da Rocha",
        "Guararema",
        "Guarulhos",
        "Itapecerica da Serra",
        "Itapevi",
        "Itaquaquecetuba",
        "Jandira",
        "Juquitiba",
        "Mairiporã",
        "Mauá",
        "Mogi das Cruzes",
        "Pirapora do Bom Jesus",
        "Poá",
        "Ribeirão Pires",
        "Rio Grande da Serra",
        "Salesópolis",
        "Santa Isabel",
        "Santana de Parnaíba",
        "Santo André",
        "São Bernardo do Campo",
        "São Caetano do Sul",
        "São Lourenço da Serra",
        "Suzano",
        "Taboão da Serra",
        "Vargem Grande Paulista"
    ];

    const handleRelatar = async () => {
        if (!desastreSelecionado || !nivelSelecionado || !cidadeSelecionada) {
            alert("Selecione todos os campos: desastre, nível de perigo e cidade.");
            return;
        }

        try {
            await api.post('/relatar/', {
                desastre: desastreSelecionado,
                nivel: nivelSelecionado,
                cidade: cidadeSelecionada
            });
            alert("Desastre relatado com sucesso!");
            setDesastreSelecionado("");
            setNivelSelecionado("");
            setCidadeSelecionada("");
            carregarDadosAgregados(); 
        } catch (error) {
            console.error("Erro ao relatar desastre:", error);
            alert("Erro ao relatar desastre. Tente novamente.");
        }
    };

    const handleDeletar = async (desastre, cidade) => {
        if (!confirm(`Tem certeza que deseja deletar todos os registros de ${desastre} em ${cidade}?`)) {
            return;
        }

        try {
            const response = await api.get('/relatar/');
            const registros = response.data.filter(r => r.relatar_desastre === desastre && r.cidade_ocorrido === cidade);
            for (const registro of registros) {
                await api.delete(`/relatar/${registro.id_relatardesastre}`);
            }
            alert("Registros deletados com sucesso!");
            carregarDadosAgregados(); 
        } catch (error) {
            console.error("Erro ao deletar registros:", error);
            alert("Erro ao deletar registros. Tente novamente.");
        }
    };

    return (
        <div className="container-area-ensino">
            <header className="cabecalho">
                <div className="container-logo">
                    <img src="/src/image/safetrack.webp" alt="Logo SafeTrack" className="logo" />
                    <h1 className="titulo">SafeTrack<span className="r">®</span></h1>
                </div>
                <div className="botoes-autenticacao">
                    <button onClick={() => navigate('/admin')} className="botao-acao">Voltar ao Admin</button>
                    <button className="botao" onClick={() => {
                        localStorage.removeItem("USUARIO");
                        localStorage.removeItem("TOKEN");
                        localStorage.removeItem("ADMIN");
                        setUsuario("");
                        setIsAdmin(false);
                        navigate('/login');
                    }}>Sair da conta</button>
                    <span className="boas-vindas">Bem vindo, {usuario} (Admin)</span>
                </div>
            </header>

            <div className="teaching-content">
                <div className="relatar-container">
                    <div className="secao-relatar">
                        <h3>Selecione o Desastre</h3>
                        <div className="opcoes-relatar">
                            {desastres.map(desastre => (
                                <button
                                    key={desastre}
                                    className={`botao-relatar ${desastreSelecionado === desastre ? 'selecionado' : ''}`}
                                    onClick={() => setDesastreSelecionado(desastre)}
                                >
                                    {desastre.charAt(0).toUpperCase() + desastre.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="secao-relatar">
                        <h3>Selecione o Nível de Perigo (%)</h3>
                        <div className="opcoes-relatar">
                            {niveis.map(nivel => (
                                <button
                                    key={nivel}
                                    className={`botao-relatar ${nivelSelecionado === nivel ? 'selecionado' : ''}`}
                                    onClick={() => setNivelSelecionado(nivel)}
                                >
                                    {nivel}%
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="secao-relatar">
                        <h3>Digite a Cidade</h3>
                        <input
                            type="text"
                            className="input-cidade"
                            placeholder="Digite a cidade"
                            value={cidadeSelecionada}
                            onChange={(e) => setCidadeSelecionada(e.target.value)}
                        />
                    </div>

                    <button onClick={handleRelatar} className="botao-relatar-principal">Relatar Desastre</button>
                </div>

                <div className="dados-agregados-secao">
                    <h4>Dados Agregados de Desastres</h4>
                    <div className="dados-agregados">
                        {dadosAgregados.length > 0 ? (
                            dadosAgregados.map((item, index) => (
                                <div key={index} className="item-agregado">
                                    <div className="item-conteudo">
                                        <strong>{item.desastre.charAt(0).toUpperCase() + item.desastre.slice(1)}:</strong> {item.cidade}, ocorreu {item.ocorrencias} vez(es), e com média de perigo de {Math.round(item.media_perigo)}%.
                                    </div>
                                    <button className="botao-deletar" onClick={() => handleDeletar(item.desastre, item.cidade)}>Deletar</button>
                                </div>
                            ))
                        ) : (
                            <p className="nenhum-dado">Nenhum dado disponível.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

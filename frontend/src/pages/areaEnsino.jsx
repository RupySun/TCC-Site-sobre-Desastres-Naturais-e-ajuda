import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import "./areaEnsino.scss";

export default function AreaEnsino() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(localStorage.getItem("USUARIO") || "");
    const [desastreSelecionado, setDesastreSelecionado] = useState("");
    const [expandido, setExpandido] = useState({});
    const [selectedDisaster, setSelectedDisaster] = useState("");

    const desastres = [
        "tornado",
        "tempestade",
        "deslizamento",
        "enchente",
        "furacão",
        "terremoto",
        "queimadas"
    ];

    const toggleExpandido = (chave) => {
        setExpandido(prev => ({
            ...prev,
            [chave]: !prev[chave]
        }));
    };

    const [dadosDesastre, setDadosDesastre] = useState({
        tornado: {
            dados: "Dados sobre tornados serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Um tornado é uma coluna de ar em rotação violenta que se estende do céu até o solo. Formado durante tempestades severas, pode causar danos devastadores.",
                foto: "/src/image/tornado.jpg"
            },
            ondeIr: ["Abrigos subterrâneos", "Edifícios reforçados", "Áreas abertas longe de estruturas"]
        },
        tempestade: {
            dados: "Dados sobre tempestades serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Tempestades envolvem ventos fortes, chuvas intensas e raios. Podem causar inundações e quedas de árvores.",
                foto: "/src/image/tempestade.jpg"
            },
            ondeIr: ["Locais elevados", "Edifícios seguros", "Centros de evacuação"]
        },
        deslizamento: {
            dados: "Dados sobre deslizamentos serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Deslizamentos ocorrem quando o solo se move devido à gravidade, frequentemente após chuvas intensas.",
                foto: "/src/image/deslizamento.webp"
            },
            ondeIr: ["Áreas planas", "Estruturas estáveis", "Pontos de evacuação designados"]
        },
        enchente: {
            dados: "Dados sobre enchentes serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Enchentes ocorrem quando rios transbordam ou chuvas excessivas inundam áreas.",
                foto: "/src/image/enchente.jpg"
            },
            ondeIr: ["Terrenos elevados", "Abrigos de emergência", "Centros comunitários"]
        },
        furacão: {
            dados: "Dados sobre furacões serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Furacões são tempestades tropicais com ventos fortes e chuvas torrenciais.",
                foto: "/src/image/furacao.jpg"
            },
            ondeIr: ["Abrigos reforçados", "Áreas interiores", "Centros de evacuação"]
        },
        terremoto: {
            dados: "Dados sobre terremotos serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Terremotos são vibrações da Terra causadas por movimento tectônico.",
                foto: "/src/image/terremoto.jpg"
            },
            ondeIr: ["Áreas abertas", "Estruturas resistentes", "Pontos de reunião designados"]
        },
        queimadas: {
            dados: "Dados sobre queimadas serão inseridos pelo administrador.",
            comoFunciona: {
                texto: "Queimadas são incêndios florestais que se espalham rapidamente.",
                foto: "/src/image/queimadas.jpg"
            },
            ondeIr: ["Áreas úmidas", "Estruturas à prova de fogo", "Centros de evacuação"]
        }
    });

    useEffect(() => {
        carregarDadosAgregados();
    }, []);

    const carregarDadosAgregados = async () => {
        try {
            const response = await api.get('/relatar/agregados/');
            const dadosAgregados = response.data;

            const novosDados = {
                tornado: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Um tornado é uma coluna de ar em rotação violenta que se estende do céu até o solo. Formado durante tempestades severas, pode causar danos devastadores.",
                        foto: "/src/image/tornado.jpg"
                    },
                    ondeIr: ["Abrigos subterrâneos", "Edifícios reforçados", "Áreas abertas longe de estruturas"]
                },
                tempestade: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Tempestades envolvem ventos fortes, chuvas intensas e raios. Podem causar inundações e quedas de árvores.",
                        foto: "/src/image/tempestade.jpg"
                    },
                    ondeIr: ["Locais elevados", "Edifícios seguros", "Centros de evacuação"]
                },
                deslizamento: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Deslizamentos ocorrem quando o solo se move devido à gravidade, frequentemente após chuvas intensas.",
                        foto: "/src/image/deslizamento.webp"
                    },
                    ondeIr: ["Áreas planas", "Estruturas estáveis", "Pontos de evacuação designados"]
                },
                enchente: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Enchentes ocorrem quando rios transbordam ou chuvas excessivas inundam áreas.",
                        foto: "/src/image/enchente.jpg"
                    },
                    ondeIr: ["Terrenos elevados", "Abrigos de emergência", "Centros comunitários"]
                },
                furacão: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Furacões são tempestades tropicais com ventos fortes e chuvas torrenciais.",
                        foto: "/src/image/furacao.jpg"
                    },
                    ondeIr: ["Abrigos reforçados", "Áreas interiores", "Centros de evacuação"]
                },
                terremoto: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Terremotos são vibrações da Terra causadas por movimento tectônico.",
                        foto: "/src/image/terremoto.jpg"
                    },
                    ondeIr: ["Áreas abertas", "Estruturas resistentes", "Pontos de reunião designados"]
                },
                queimadas: {
                    dados: new Set(),
                    comoFunciona: {
                        texto: "Queimadas são incêndios florestais que se espalham rapidamente.",
                        foto: "/src/image/queimadas.jpg"
                    },
                    ondeIr: ["Áreas úmidas", "Estruturas à prova de fogo", "Centros de evacuação"]
                }
            };

            dadosAgregados.forEach(item => {
                const desastre = item.desastre;
                const cidade = item.cidade;
                const ocorrencias = item.ocorrencias;
                const mediaPerigo = Math.round(item.media_perigo);

                if (novosDados[desastre]) {
                    const newData = `${desastre.charAt(0).toUpperCase() + desastre.slice(1)}: ${cidade}, ocorreu ${ocorrencias} vez(es), e com média de perigo de ${mediaPerigo}%.`;
                    novosDados[desastre].dados.add(newData);
                }
            });

            // Convert sets to arrays and set default if empty
            Object.keys(novosDados).forEach(desastre => {
                const dadosArray = Array.from(novosDados[desastre].dados);
                if (dadosArray.length === 0) {
                    novosDados[desastre].dados = ["Dados sobre " + desastre + "s serão inseridos pelo administrador."];
                } else {
                    novosDados[desastre].dados = dadosArray;
                }
            });

            setDadosDesastre(novosDados);
        } catch (error) {
            console.error("Erro ao carregar dados agregados:", error);
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
                    <button onClick={() => navigate('/')} className="botao-acao">Voltar ao Mapa</button>
                    {!usuario && (
                        <>
                            <button className="botao" onClick={() => navigate('/login')}>Login</button>
                            <button className="botao botao-perigo" onClick={() => navigate('/cadastro')}>Cadastrar</button>
                        </>
                    )}
                </div>
            </header>

            <footer className="teaching-footer">
                {true && (
                    <div className="teaching-bottom-bar">
                        <div className="lista-topicos">
                            <div className="item-topico">
                                <button className="botao-topico" onClick={() => toggleExpandido('desastre')}>
                                    Desastre
                                    <span className={`seta ${expandido.desastre ? 'baixo' : 'cima'}`}>▲</span>
                                </button>
                                {expandido.desastre && (
                                    <div className="conteudo-topico">
                                        <div className="subtopicos">
                                            {desastres.map(desastre => (
                                                <div key={desastre} className={`subtopico ${selectedDisaster === desastre ? 'selecionado' : ''}`}>
                                                    <button
                                                        className={`botao-subtopico ${selectedDisaster === desastre ? 'selecionado' : ''}`}
                                                        onClick={() => {
                                                            setSelectedDisaster(desastre);
                                                        }}
                                                    >
                                                        {desastre.charAt(0).toUpperCase() + desastre.slice(1)}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="item-topico">
                                <button className="botao-topico" onClick={() => {
                                    if (!selectedDisaster) {
                                        alert("Selecione um desastre primeiro.");
                                        return;
                                    }
                                    toggleExpandido('dados');
                                }}>
                                    Dados
                                    <span className={`seta ${expandido.dados ? 'baixo' : 'cima'}`}>▲</span>
                                </button>
                                {expandido.dados && selectedDisaster && (
                                    <div className="conteudo-topico">
                                        <p dangerouslySetInnerHTML={{ __html: Array.isArray(dadosDesastre[selectedDisaster].dados) ? dadosDesastre[selectedDisaster].dados.join('<br>') : dadosDesastre[selectedDisaster].dados }}></p>
                                    </div>
                                )}
                            </div>
                            <div className="item-topico">
                                <button className="botao-topico" onClick={() => {
                                    if (!selectedDisaster) {
                                        alert("Selecione um desastre primeiro.");
                                        return;
                                    }
                                    toggleExpandido('como-funciona');
                                }}>
                                    Como Funciona
                                    <span className={`seta ${expandido['como-funciona'] ? 'baixo' : 'cima'}`}>▲</span>
                                </button>
                                {expandido['como-funciona'] && selectedDisaster && (
                                    <div className="conteudo-topico">
                                        <div className="como-funciona">
                                            <img src={dadosDesastre[selectedDisaster].comoFunciona.foto} alt={selectedDisaster} className="foto-desastre" />
                                            <p>{dadosDesastre[selectedDisaster].comoFunciona.texto}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="item-topico">
                                <button className="botao-topico" onClick={() => {
                                    if (!selectedDisaster) {
                                        alert("Selecione um desastre primeiro.");
                                        return;
                                    }
                                    toggleExpandido('onde-ir');
                                }}>
                                    Onde Ir
                                    <span className={`seta ${expandido['onde-ir'] ? 'baixo' : 'cima'}`}>▲</span>
                                </button>
                                {expandido['onde-ir'] && selectedDisaster && (
                                    <div className="conteudo-topico">
                                        <ul>
                                            {dadosDesastre[selectedDisaster].ondeIr.map((local, index) => (
                                                <li key={index}>{local}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
}

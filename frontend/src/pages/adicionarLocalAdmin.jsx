import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './inicio.scss';
import './adicionarLocal.scss';

export default function AdicionarLocalAdmin() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [horario, setHorario] = useState("");
    const [imagem, setImagem] = useState(null);
    const [pedidosPendentes, setPedidosPendentes] = useState([]);
    const [locaisAprovados, setLocaisAprovados] = useState([]);

    useEffect(() => {
        const nomeUsuario = localStorage.getItem("USUARIO")
        const isAdmin = localStorage.getItem("ADMIN")

        if (nomeUsuario && isAdmin === 'true') {
            const pedidos = JSON.parse(localStorage.getItem('pedidosPendentes') || '[]');
            setPedidosPendentes(pedidos);
            const locais = JSON.parse(localStorage.getItem('locaisAprovados') || '[]');
            setLocaisAprovados(locais);
        } else {
            navigate('/login')
        }


    }, []);

    function handleImagemChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagem(reader.result);
            reader.readAsDataURL(file);
        }
    }

    function adicionarLocalDireto() {
        if (!nome || !endereco || !horario || !imagem) {
            alert("Preencha todos os campos!");
            return;
        }

        const local = {
            id: Date.now(),
            nome,
            endereco,
            horario,
            imagem
        };

        const locaisAprovados = JSON.parse(localStorage.getItem('locaisAprovados') || '[]');
        locaisAprovados.push(local);
        localStorage.setItem('locaisAprovados', JSON.stringify(locaisAprovados));

        alert("Local adicionado diretamente com sucesso!");
        navigate('/admin');
    }

    function aceitarPedido(id) {
        const pedidosPendentes = JSON.parse(localStorage.getItem('pedidosPendentes') || '[]');
        const locaisAprovados = JSON.parse(localStorage.getItem('locaisAprovados') || '[]');

        const pedidoIndex = pedidosPendentes.findIndex(p => p.id === id);
        if (pedidoIndex !== -1) {
            const pedido = pedidosPendentes.splice(pedidoIndex, 1)[0];
            locaisAprovados.push(pedido);
            localStorage.setItem('pedidosPendentes', JSON.stringify(pedidosPendentes));
            localStorage.setItem('locaisAprovados', JSON.stringify(locaisAprovados));
            setPedidosPendentes(pedidosPendentes);
            setLocaisAprovados(locaisAprovados);
            alert("Pedido aceito! O local foi adicionado à lista.");
        }
    }

    function deletarLocal(id) {
        const locaisAprovados = JSON.parse(localStorage.getItem('locaisAprovados') || '[]');
        const novosLocais = locaisAprovados.filter(local => local.id !== id);
        localStorage.setItem('locaisAprovados', JSON.stringify(novosLocais));
        setLocaisAprovados(novosLocais);
        alert("Local deletado com sucesso.");
    }

    return (
        <div className="adicionar-local-container">
            <header className="cabecalho">
                <div className="container-logo">
                    <img src="/src/image/safetrack.webp" alt="Logo SafeTrack" className="logo" />
                    <h1 className="titulo">SafeTrack<span className="r">®</span></h1>
                </div>
                <div className="botoes-autenticacao">
                    <button className="botao" onClick={() => navigate('/admin')}>Voltar</button>
                </div>
            </header>

            <div className="conteudo-adicionar">
                <div className="left-section">
                    <div className="photo-section">
                        <div className="photo-rectangle">
                            <input type="file" accept="image/*" onChange={handleImagemChange} id="imagem-input" />
                            <label htmlFor="imagem-input" className="photo-label">
                                {imagem ? <img src={imagem} alt="Preview" className="preview-imagem" /> : <span>Clique para adicionar imagem</span>}
                            </label>
                        </div>
                    </div>
                    <div className="contribuicao">
                        <h3>Adicionar Local Direto</h3>
                        <p>Como administrador, você pode adicionar locais diretamente sem aprovação.</p>
                    </div>
                </div>
                <div className="info-section">
                    <h2>Informações do Local</h2>
                    <div className="campo">
                        <label>Nome do Local:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do local"
                        />
                    </div>
                    <div className="campo">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            placeholder="Digite o endereço"
                        />
                    </div>
                    <div className="campo">
                        <label>Horário de Funcionamento:</label>
                        <input
                            type="text"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            placeholder="Ex: 08:00 - 18:00"
                        />
                    </div>
                    <button onClick={adicionarLocalDireto} className="botao-enviar">Adicionar Local</button>
                </div>

                <div className="admin-section">
                    <div className="pedidos-pendentes">
                        <h3>Pedidos Pendentes</h3>
                        {pedidosPendentes.length === 0 ? (
                            <p>Nenhum pedido pendente.</p>
                        ) : (
                            pedidosPendentes.map(pedido => (
                                <div key={pedido.id} className="pedido-item">
                                    <img src={pedido.imagem} alt={pedido.nome} className="pedido-imagem" />
                                    <div className="pedido-info">
                                        <p><strong>Nome:</strong> {pedido.nome}</p>
                                        <p><strong>Endereço:</strong> {pedido.endereco}</p>
                                        <p><strong>Horário:</strong> {pedido.horario}</p>
                                    </div>
                                    <button onClick={() => aceitarPedido(pedido.id)} className="botao-aceitar">Aceitar</button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="locais-aprovados">
                        <h3>Locais Aprovados</h3>
                        {locaisAprovados.length === 0 ? (
                            <p>Nenhum local aprovado.</p>
                        ) : (
                            locaisAprovados.map(local => (
                                <div key={local.id} className="local-item">
                                    <img src={local.imagem} alt={local.nome} className="local-imagem" />
                                    <div className="local-info">
                                        <p><strong>{local.nome}</strong></p>
                                        <p>{local.endereco}</p>
                                        <p>{local.horario}</p>
                                    </div>
                                    <button onClick={() => deletarLocal(local.id)} className="botao-deletar">Deletar</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

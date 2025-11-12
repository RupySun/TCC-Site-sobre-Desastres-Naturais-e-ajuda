import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './inicio.scss';
import './adicionarLocal.scss';

export default function AdicionarLocal() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [horario, setHorario] = useState("");
    const [imagem, setImagem] = useState(null);


    function handleImagemChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagem(reader.result);
            reader.readAsDataURL(file);
        }
    }

    function enviarPedido() {
        if (!nome || !endereco || !horario || !imagem) {
            alert("Preencha todos os campos!");
            return;
        }

        const pedido = {
            id: Date.now(),
            nome,
            endereco,
            horario,
            imagem
        };

        const pedidosPendentes = JSON.parse(localStorage.getItem('pedidosPendentes') || '[]');
        pedidosPendentes.push(pedido);
        localStorage.setItem('pedidosPendentes', JSON.stringify(pedidosPendentes));

        alert("Pedido enviado com sucesso! Aguarde aprovação do administrador.");
        navigate('/');
    }



    return (
        <div className="adicionar-local-container">
            <header className="cabecalho">
                <div className="container-logo">
                    <img src="/src/image/safetrack.webp" alt="Logo SafeTrack" className="logo" />
                    <h1 className="titulo">SafeTrack<span className="r">®</span></h1>
                </div>
                <div className="botoes-autenticacao">
                    <button className="botao" onClick={() => navigate('/')}>Voltar</button>
                </div>
            </header>

            <div className="conteudo-adicionar">
                <div className="left-section">
                    <div className="photo-section">
                        <div className="photo-rectangle">
                            <input type="file" accept="image/*" onChange={handleImagemChange} id="imagem-input" />
                            <label htmlFor="imagem-input" className="photo-label">
                                <span>Clique para adicionar imagem</span>
                            </label>
                        </div>
                    </div>
                    <div className="contribuicao">
                        <h3>Contribuição</h3>
                        <p><br></br>Somos uma ONG onde visamos ajudar a população, essa contribuição será uma maneira de mantermos nossos serviços ativos.</p>
                        <div className="valores">
                            <p>Mensal: R$ 19,99</p>
                            <p>Anual: R$ 199,99</p>
                            <p>PIX: 123456789</p>
                        </div>
                    </div>
                </div>
                <div className="info-section">
                    <h2>Informações</h2>
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
                    <button onClick={enviarPedido} className="botao-enviar">Enviar Pedido</button>
                </div>


            </div>
        </div>
    );
}

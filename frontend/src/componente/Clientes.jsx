import { useEffect, useState } from "react";
import './Clientes.css'

function Clientes() {

    //estado -> valor atual, funcao que altera o valor
    //renderizar tabela clientes
    const [clientes, setClientes] = useState([]);
    // renderizar form edicao dados do registro tabela
    const [editandoId, setEditandoId] = useState(null);
    // buscar um unico registro
    const [clientePesquisado, setClientePesquisado] = useState([])
    //estado que aloca o dado que sera alterado(funcao editar)
    const [form, setForm] = useState({
        //parametros do obj sao em maiscula, servidor recebe no corpo da requisicao Maiscula
        Nome: "",
        Idade: "",
        UF: ""
    });


    const API_URL = import.meta.env.VITE_API_URL;

    //useEffect roda automaticamente, quem controla é array =>[]
    useEffect(() => {
        buscarClientes();
    }, []);

    //toda vez que carregar o componente
    async function buscarClientes() {
        try {
            //enviando req para o servidor
            const res = await fetch(`${API_URL}clientes`);
            const data = await res.json();

            //pegando a resposta em formato json
            //mudando valor do estado clientes -> armazena todos os dados da tabela
            //valor do estado muda, react atualiza auto
            setClientes(data);
        } catch (error) {
            //erro no servidor
            console.error("Erro ao buscar clientes:", error);
        };
    };


    async function buscarCliente(e) {
        try {
            e.preventDefault();

            // form data pega valores dos inputs de um form e armazena como chave=valor
            const obj = new FormData(e.target);
            // = o valor da chave registro dentro do FormData
            const registroId = obj.get("registro");

            const res = await fetch(`${API_URL}cliente/${registroId}`)

            //se nao encontrar registro
            if (!res.ok) {
                e.target.reset();
                alert(`Cliente ID ${registroId} não encontrado`);
                return;
            };

            //retorno sucesso
            const data = await res.json()

            e.target.reset();
            console.log(data)
            //atualizando valor do estado, colocando obj retornado
            setClientePesquisado([data])
        } catch (error) {
            console.error("Erro ao buscar o cliente:", error);
        };
    };


    //pegando dados do cliente que sera editado /preparando form de edicao
    async function iniciarEdicao(cliente) {
        //alterando editandoID liberar form edição
        setEditandoId(cliente.ID);
        //preparando dados para serem passados ao servidor
        setForm({
            Nome: cliente.Nome,
            Idade: cliente.Idade,
            UF: cliente.UF
        });
    };
    //envar novos dados ao servidor (atualizar)
    async function atualizarDados(e) {
        try {
            e.preventDefault();

            const res = await fetch(`${API_URL}atualizar/${editandoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                //parametros do obj sao em maiscula, servidor recebe no corpo da requisicao Maiscula
                body: JSON.stringify(form)
            });
            const data = await res.json()

            // fecha edição
            setEditandoId(null);
            //fechando janela de resultado da pesquias do cliente
            setClientePesquisado([])
            await buscarClientes(); // atualiza lista
        } catch (error) {
            console.error("Erro ao atualizar o registro:", error);
        };
    };


    async function criarRegistro(e) {
        try {
            // evita reload da página
            e.preventDefault();

            // FormData cria um objeto com os valores dos inputs do formulário
            const formData = new FormData(e.target);

            //obj body que ira passar os dados do novo registro
            const body = {
                //pegue o valor do campo nome enviado do form
                 nome: formData.get("nome"),
                uf: formData.get("uf"),
                idade: formData.get("idade")
            };

            //contruindo a req 
            const res = await fetch(`${API_URL}criar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });


            if (!res.ok) {
                throw new Error('Erro');
            };

            //limpar campos do inputs
            e.target.reset();
            await buscarClientes();
        } catch (error) {
            console.error("Erro ao criar o registro:", error);
        };
    };


    //deletar registro
    async function deletar(cliente) {
        try {
            const res = await fetch(`${API_URL}deletar/${cliente.ID}`,
                { method: "DELETE" }
            );

            // registro nao encontrado
            if (!res.ok) {
                alert('Erro ao deletar cliente');
                return;
            };

            // res.ok
            await buscarClientes();
            setClientePesquisado([])
        } catch (error) {
            //erro no servidor
            console.error("Erro ao deletar o registro:", error);
        };
    };


    return (
        <div>
            <h1 className="titulo-principal">Clientes</h1>

            <div className="criar-registro-container">
                <form className="form-criar" onSubmit={criarRegistro}>
                    <input type="text" name="nome" placeholder="nome" />
                    <input type="text" name="uf" placeholder="Estado" />
                    <input type="number" name="idade" placeholder="idade" />

                    {/*padrao type submit*/}
                    <button>Criar</button>
                </form>
            </div>

            {/*PESQUISA RENDERIZA 1 CLIENTE */}
            <div className="container-pesquisa-cliente">

                <form onSubmit={buscarCliente} action="">
                    <label htmlFor="">ID Regsitro</label>
                    <input type="text" name="registro" />
                    <button>Pesquisar</button>
                </form>

                {clientePesquisado.map((c) => (
                    <div key={c.data.ID} className="cliente-encontrado-center">
                        <div className="card-header">
                            <h3 className="nome-registro">{c.data.Nome}</h3>
                        </div>

                        <div className="card-details">
                            <p className="detail-item">
                                <span className="detail-label">📅 Idade:</span>
                                <span className="detail-value">{c.data.Idade} anos</span>
                            </p>
                            <p className="detail-item">
                                <span className="detail-label">📍 UF:</span>
                                <span className="detail-value">{c.data.UF}</span>
                            </p>
                        </div>

                        <div className="card-actions">
                            <button onClick={() => iniciarEdicao(c)} className="btn-editar">✏️ Editar</button>
                            <button onClick={() => deletar(c)} className="btn-deletar">🗑️ Deletar</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FORM DE EDIÇÃO SOMENTE NO RETORNO DA PESQUISA */}
            {editandoId && (
                <form className="form-editar" onSubmit={atualizarDados}>
                    <h1 className="titulo-registro">Editar Registro</h1>

                    {/* 
                        '...' => spread operator do JavaScript
                        form = estado do react
                        juntos → atualizam estado corretamente 
                        
                        setForm atualiza o estado criando um novo objeto,
                        copiando os valores atuais e alterando o campo desejado*/}
                    <input type="text" placeholder="Nome" value={form.Nome} onChange={(e) => setForm({ ...form, Nome: e.target.value })} />
                    <input type="number" placeholder="Idade" value={form.Idade} onChange={(e) => setForm({ ...form, Idade: e.target.value })} />
                    <input type="text" placeholder="UF" maxLength={2} value={form.UF} onChange={(e) => setForm({ ...form, UF: e.target.value })} />
                    <button>Salvar</button>
                </form>
            )}


            {/* LISTA DE CLIENTES */}
            <div className="list">

                {/*Lista Todos os Clientes */}
                {clientes.length === 0 ? (
                    <div className="vazio">
                        <p className="titulo">Sem clientes</p>
                        <p className="sub">Adicione um cliente</p>
                    </div>) : (
                    clientes.map((c) => (
                        <div key={c.ID} className="card">
                            {/* Dados do Cliente */}
                            <div className="card-header">
                                <h3 className="nome-registro">{c.Nome}</h3>
                            </div>

                            <div className="card-details">
                                <p className="detail-item">
                                    <span className="detail-label">📅 Idade:</span>
                                    <span className="detail-value">{c.Idade} anos</span>
                                </p>
                                <p className="detail-item">
                                    <span className="detail-label">📍 UF:</span>
                                    <span className="detail-value">{c.UF}</span>
                                </p>
                            </div>
                        </div>
                    ))
                )};
            </div>

        </div>

    );
};

export default Clientes;

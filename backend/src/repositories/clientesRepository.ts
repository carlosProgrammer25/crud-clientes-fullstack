//  Carregando configuracoes do .env
import "dotenv/config";
/*
    =>MariaDB é um sistema de gerenciamento de banco de dados relacional
    =>PrismaMariaDb ele serve para substituir o driver nativo do Prisma por um driver JavaScript puro chamado mariadb
*/
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
//  O Prisma Client foi gerado a partir do schema.prisma por meio do comando generate, onde ele utiliza os models para gerar a conexão com o banco de dados.
import { PrismaClient } from "@prisma/client";


/*
    new PrismaMariaDb() é criado um client completo de acesso ao banco
    url serve só pra conexão (host, usuário, senha, banco, etc.)

    A DATABASE_URL fornece os dados de conexão (host, usuário, senha, banco), e o Prisma Client usa essas informações para se conectar ao banco.
    A estrutura do client (métodos, models, etc.) vem do schema.prisma.
*/
const adapter = new PrismaMariaDb(`${process.env.DATABASE_URL}`);
//  O prisma possui a configuração de conexão com o banco de dados, enquanto o PrismaMariaDb fornece os dados de conexão por meio do adapter,
const prisma = new PrismaClient({ adapter });


// Buscar varios registros
export async function getClientes() {
    try {
        //se nao encontrar valor da tabela, retorna vazio
        return await prisma.clientes.findMany();
    }
    catch (error) {
        //erro na busca com o banco
        throw error;
    };
};


// Buscar somente 1 registro
export async function getCliente(id: number) {
    //consultando
    try {
        const resultado = await prisma.clientes.findUnique({
            where: { ID: id }
        });

        //se nao existir registro com id
        if (!resultado) {
            return null
        };

        //se existir
        return resultado;
    }
    catch (error) {
        throw error;
    };
};


//  Atualizar
//type = criar um model
//Molde de um objeto que será usado como parâmetro
type atualizar = {
    Nome?: string;
    Idade?: number;
    UF?: string;
};
//  Se usar a tipagem criada pelo prisma, tera que obeceder os campos gerados pelo model
export async function UpdateCliente(id: number, novoDado: atualizar) {
    try {
        //consultando se existe o registro com o id, se nao encontrar retorna null
        const clienteExiste = await prisma.clientes.findUnique({
            where: { ID: id }
        });

        //PREVENÇÃO DE ERRO
        //se nao existir o id na tabela retorna null, nao quebra o codigo
        if (clienteExiste == null) {
            return null;
        };

        //se existir
        return await prisma.clientes.update({
            where: { ID: id },
            data: novoDado
        });
    } catch (error) {
        //se nao atualizar  update retorna erro
        throw error;
    };
};


// Criar novo registro
//Molde de um objeto que será usado como parâmetro
type Cliente = {
    Nome: string;
    Idade: number;
    UF: string;
};
export async function addCliente(newCustomer: Cliente) {
    try {
        //create do prisma nunca retorna null
        const consulta = await prisma.clientes.create({
            data: newCustomer
        });

        //sucesso
        return consulta;
    }
    catch (error) {
        // falha ao inserir dados (validação, conexão ou constraint(restrição/regra))
        throw error;
    };
};


// Deletar registro
export async function deleteCliente(id: number) {
    //verificando se id existe
    try {
        const clienteExiste = await prisma.clientes.findUnique({
            where: { ID: id }
        })

        //PREVENÇÃO DE ERRO
        //se nao existir registro findUnique retorna null, if nao quebra o codigo
        if (clienteExiste === null) {
            return null;
        };

        //se existir
        return await prisma.clientes.delete({
            where: { ID: id }
        });
    }
    catch (error) {
        throw error;
    };
};

declare namespace Projeto {

    type EstoqueProduto = {
        id?: number | null;
        nomeProduto: string;
        precoProduto: number;
        fornecedor: string;
        quantidadeEstoque: number;
        dataCompra: string;
    }
}
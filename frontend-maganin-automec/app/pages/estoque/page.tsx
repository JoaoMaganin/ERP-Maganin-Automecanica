"use client";
import { Button } from "primereact/button";
import { useRouter } from 'next/navigation';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useMemo, useRef, useState } from "react";
import { EstoqueProdutoService } from "../../../service/EstoqueProdutoService";


const estoquePage = () => {
    let produtoVazio: Projeto.EstoqueProduto = {
        id: null,
        nomeProduto: "",
        precoProduto: 0,
        fornecedor: "",
        quantidadeEstoque: 0,
        dataCompra: "01-01-01"
    }

    const router = useRouter();
    const [produtos, setProdutos] = useState<Projeto.EstoqueProduto[] | null>(null);
    const dt = useRef<DataTable<any>>(null);
    const estoqueProdutoService = useMemo(() => new EstoqueProdutoService(), []);

    useEffect(() => {
        if(!produtos) {
            estoqueProdutoService.listarTodos().then((response) => {
                console.log(response.data);
                setProdutos(response.data);
            }).catch((erro) => {
                console.log(erro)
            })
        }
    }, [])

    const idBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        )
    }

    const produtoBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Produto</span>
                {rowData.nomeProduto}
            </>
        )
    }
    const precoBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Preço</span>
                {rowData.precoProduto}
            </>
        )
    }
    const fornecedorBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Fornecedor</span>
                {rowData.fornecedor}
            </>
        )
    }
    const quantidadeBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Quantidade</span>
                {rowData.quantidadeEstoque}
            </>
        )
    }
    const dataCompraBodyTemplate = (rowData: Projeto.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Data da compra</span>
                {rowData.dataCompra}
            </>
        )
    }

    return (
        <div className="tabelaProdutos">
            <h1 className="text-3x1 font-bold">Página em construção</h1>
            <Button label="Voltar" severity="warning" onClick={() => { router.push('/') }} />
            <DataTable ref={dt} value={produtos} tableStyle={{ minWidth: '50rem' }} className="datatable-responsive">
                <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                <Column field="id" header="Produto" sortable body={produtoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                <Column field="id" header="Preço" sortable body={precoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                <Column field="id" header="Fornecedor" sortable body={fornecedorBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                <Column field="id" header="Quantidade" sortable body={quantidadeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                <Column field="id" header="Data de compra" sortable body={dataCompraBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            </DataTable>
        </div>
    )
}

export default estoquePage;
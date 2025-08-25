"use client";
import { useEffect, useMemo, useState } from "react";
import { EstoqueProdutoService } from '../../../service/EstoqueProdutoService';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const estoquePage = () => {
    let produtoVazio: Oficina.EstoqueProduto = {
        id: null,
        nomeProduto: "",
        precoProduto: 0,
        fornecedor: "",
        quantidadeEstoque: 0,
        dataCompra: "01-01-01"
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nomeProduto', headerName: 'Nome', width: 130 },
        { field: 'fornecedor', headerName: 'Fornecedor', width: 130 },
        {
            field: 'preco',
            headerName: 'Preço',
            type: 'number',
            width: 90,
        },
        {
            field: 'quantidadeEstoque',
            headerName: 'Quantidade',
            type: 'number',
            width: 90,
        },
        { field: 'dataCompra', headerName: 'Data da compra', width: 130 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const [produtos, setProdutos] = useState<Oficina.EstoqueProduto[] | undefined>(undefined);
    const estoqueProdutoService = useMemo(() => new EstoqueProdutoService(), []);

    useEffect(() => {
        if (!produtos) {
            estoqueProdutoService.listarTodos().then((response) => {
                console.log(response.data);
                setProdutos(response.data);
            }).catch((erro) => {
                console.log(erro)
            })
        }
    }, [])

    return (
        <div className="tabelaProdutos">
            <h1>Estoque</h1>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={produtos}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 50 }}
                />
            </Paper>
        </div>
    )
}

export default estoquePage;
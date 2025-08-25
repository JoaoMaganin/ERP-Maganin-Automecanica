/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';
import { EstoqueProdutoService } from '@/demo/service/EstoqueProdutoService';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const EstoquePage = () => {
    let produtoVazio: ERP.EstoqueProduto = {
        id: null,
        nomeProduto: '',
        precoProduto: 0,
        fornecedor: '',
        quantidadeEstoque: 0,
        dataCompra: ''
    };

    const [produtos, setProdutos] = useState(null);
    const [produtoDialog, setProdutoDialog] = useState(false);
    const [deleteProdutoDialog, setDeleteProdutoDialog] = useState(false);
    const [deleteProdutosDialog, setDeleteProdutosDialog] = useState(false);
    const [produto, setProduto] = useState<ERP.EstoqueProduto>(produtoVazio);
    const [produtosSelecionados, setProdutosSelecionados] = useState<ERP.EstoqueProduto[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
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
    }, [produtos]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const openNew = () => {
        setProduto(produtoVazio);
        setSubmitted(false);
        setProdutoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProdutoDialog(false);
    };

    const hideDeleteProdutoDialog = () => {
        setDeleteProdutoDialog(false);
    };

    const hideDeleteProdutosDialog = () => {
        setDeleteProdutosDialog(false);
    };

    const saveProduto = () => {
        setSubmitted(true);

        if (!produto.id) {
            estoqueProdutoService.criar(produto)
                .then((response) => {
                    setProdutoDialog(false);
                    setProduto(produtoVazio);
                    setProdutos(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Sucesso',
                        detail: 'Produto registrado com sucesso!'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: error
                    });
                })
        } else {
            estoqueProdutoService.atualizar(produto)
                .then((response) => {
                    setProdutoDialog(false);
                    setProduto(produtoVazio);
                    setProdutos(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Success',
                        detail: 'Produto atualizado com sucesso'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Change error: ' + error.message
                    });
                })
        }
    };

    const editProduto = (produto: ERP.EstoqueProduto) => {
        setProduto({ ...produto });
        setProdutoDialog(true);
    };

    const confirmDeleteProduto = (produto: ERP.EstoqueProduto) => {
        setProduto(produto);
        setDeleteProdutoDialog(true);
    };

    const deleteProduto = () => {
        if (produto.id) {
            estoqueProdutoService.deletar(produto.id)
                .then((response) => {
                    setProduto(produtoVazio);
                    setDeleteProdutoDialog(false);
                    setProdutos(null);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful!',
                        detail: 'Produto deletado',
                        life: 3000
                    });
                }).catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Erro ao deletar produto',
                        life: 3000
                    });
                })
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProdutosDialog(true);
    };

    const deleteSelectedProdutos = () => {
        Promise.all(
            produtosSelecionados.map(async (_produto: ERP.EstoqueProduto) => {
                if (_produto.id) {
                    await estoqueProdutoService.deletar(_produto.id);
                }
            })
        ).then((response) => {
            setProdutos(null);
            setProdutosSelecionados([]);
            setDeleteProdutosDialog(false);
            toast.current?.show({
                severity: 'success',
                summary: 'Successful!',
                detail: 'Produtos deletados',
                life: 3000
            })
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Error!',
                detail: 'Erro ao deletar produtos',
                life: 3000
            });
        })
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        nomeProduto: keyof typeof produto // <- chave válida do objeto
    ) => {
        const val = e.target.value || '';
        let _produto = { ...produto };
        _produto[nomeProduto] = val as never; // pode precisar de cast
        setProduto(_produto);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, nomeProduto: keyof typeof produto) => {
        const val = e.value || 0;
        let _produto = { ...produto };
        _produto[nomeProduto] = val as never;
        setProduto(_produto);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!produtosSelecionados || !(produtosSelecionados as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nomeProduto}
            </>
        );
    };

    const precoBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Preço</span>
                {rowData.precoProduto}
            </>
        );
    };

    const fornecedorBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Fornecedor</span>
                {rowData.fornecedor}
            </>
        );
    };

    const quantidadeBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Quantidade em estoque</span>
                {rowData.quantidadeEstoque}
            </>
        );
    };

    const dataCompraBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <span className="p-column-title">Data de compra</span>
                {rowData.dataCompra}
            </>
        );
    };

    const actionBodyTemplate = (rowData: ERP.EstoqueProduto) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduto(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduto(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const produtoDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduto} />
        </>
    );

    const deleteProdutoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteProdutoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteProduto} />
        </>
    );

    const deleteProdutosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProdutosDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProdutos} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={produtos}
                        selection={produtosSelecionados}
                        onSelectionChange={(e) => setProdutosSelecionados(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nomeProduto" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="precoProduto" header="Prreço" body={precoBodyTemplate} sortable></Column>
                        <Column field="fornecedor" header="Fornecedor" sortable body={fornecedorBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="quantidadeEstoque" header="Quantidade em estoque" body={quantidadeBodyTemplate} sortable></Column>
                        <Column field="dataCompra" header="Status" body={dataCompraBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={produtoDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={produtoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nomeProduto">Nome</label>
                            <InputText
                                id="nomeProduto"
                                value={produto.nomeProduto}
                                onChange={(e) => onInputChange(e, 'nomeProduto')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !produto.nomeProduto
                                })}
                            />
                            {submitted && !produto.nomeProduto && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="precoProduto">Price</label>
                            <InputNumber id="precoProduto" value={produto.precoProduto} onValueChange={(e) => onInputNumberChange(e, 'precoProduto')} />
                            {submitted && !produto.nomeProduto && <small className="p-invalid">Preço é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="fornecedor">Fornecedor</label>
                            <InputText
                                id="fornecedor"
                                value={produto.fornecedor}
                                onChange={(e) => onInputChange(e, 'fornecedor')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !produto.fornecedor
                                })}
                            />
                            {submitted && !produto.fornecedor && <small className="p-invalid">Fornecedor é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="quantidadeEstoque">Quantidade em estoque</label>
                            <InputNumber id="quantidadeEstoque" value={produto.quantidadeEstoque} onValueChange={(e) => onInputNumberChange(e, 'quantidadeEstoque')} />
                            {submitted && !produto.quantidadeEstoque && <small className="p-invalid">Quantidade é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="dataCompra">Data de compra</label>
                            <InputText
                                id="dataCompra"
                                value={produto.dataCompra}
                                onChange={(e) => onInputChange(e, 'dataCompra')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !produto.dataCompra
                                })}
                            />
                            {submitted && !produto.dataCompra && <small className="p-invalid">Data de compra é obrigatório.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProdutoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProdutoDialogFooter} onHide={hideDeleteProdutoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {produto && (
                                <span>
                                    Are you sure you want to delete <b>{produto.nomeProduto}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProdutosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProdutosDialogFooter} onHide={hideDeleteProdutosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {produto && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default EstoquePage;

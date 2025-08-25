package br.com.maganinautomec.erp.dto;

import br.com.maganinautomec.erp.entity.EstoqueProdutoEntity;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

public class EstoqueProdutoDTO {

    private Long id;
    private String nomeProduto;
    private float precoProduto;
    private String fornecedor;
    private int quantidadeEstoque;
    private LocalDate dataCompra;

    public EstoqueProdutoDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public float getPrecoProduto() {
        return precoProduto;
    }

    public void setPrecoProduto(float precoProduto) {
        this.precoProduto = precoProduto;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public LocalDate getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(LocalDate dataCompra) {
        this.dataCompra = dataCompra;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EstoqueProdutoDTO that = (EstoqueProdutoDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    public EstoqueProdutoDTO(EstoqueProdutoEntity estoqueProduto) {
        BeanUtils.copyProperties(estoqueProduto, this);
    }
}

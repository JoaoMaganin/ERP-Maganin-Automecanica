package br.com.maganinautomec.erp.dto;

import br.com.maganinautomec.erp.entity.EstoqueProdutoEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class EstoqueProdutoDTO {

    private Long id;
    private String nome_produto;
    private int preco_produto;
    private String fornecedor;
    private int quantidade_estoque;
    private Date data_compra;

    public EstoqueProdutoDTO(EstoqueProdutoEntity estoqueProduto) {
        BeanUtils.copyProperties(estoqueProduto, this);
    }
}

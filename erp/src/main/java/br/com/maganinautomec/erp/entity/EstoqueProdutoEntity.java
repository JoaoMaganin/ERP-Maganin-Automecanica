package br.com.maganinautomec.erp.entity;

import br.com.maganinautomec.erp.dto.EstoqueProdutoDTO;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Entity
@Table(name="ERP_ESTOQUEPRODUTO")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class EstoqueProdutoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome_produto;

    @Column(nullable = false)
    private int preco_produto;

    @Column(nullable = false)
    private String fornecedor;

    @Column(nullable = false)
    private int quantidade_estoque;

    @Column(nullable = false)
    private Date data_compra;

    public EstoqueProdutoEntity(EstoqueProdutoDTO estoqueProduto) {
        BeanUtils.copyProperties(estoqueProduto, this);
    }
}

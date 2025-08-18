package br.com.maganinautomec.erp.service;

import br.com.maganinautomec.erp.dto.EstoqueProdutoDTO;
import br.com.maganinautomec.erp.entity.EstoqueProdutoEntity;
import br.com.maganinautomec.erp.repository.EstoqueProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstoqueProdutoService {

    @Autowired
    private EstoqueProdutoRepository estoqueProdutoRepository;

    public List<EstoqueProdutoDTO> listarProdutos() {
        List<EstoqueProdutoEntity> produtos = estoqueProdutoRepository.findAll();
        return produtos.stream().map(EstoqueProdutoDTO::new).toList();
    }
}

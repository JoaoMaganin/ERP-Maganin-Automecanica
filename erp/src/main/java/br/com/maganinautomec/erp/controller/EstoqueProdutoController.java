package br.com.maganinautomec.erp.controller;

import br.com.maganinautomec.erp.dto.EstoqueProdutoDTO;
import br.com.maganinautomec.erp.service.EstoqueProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/estoqueProduto")
@CrossOrigin
public class EstoqueProdutoController {

    @Autowired
    public EstoqueProdutoService estoqueProdutoService;

    public List<EstoqueProdutoDTO> listarProdutos() {
        return estoqueProdutoService.listarProdutos();
    }
}

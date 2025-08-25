import { BaseService } from './BaseService';

export class EstoqueProdutoService extends BaseService{

    constructor() {
        super("/estoqueProduto");
    }
    
}
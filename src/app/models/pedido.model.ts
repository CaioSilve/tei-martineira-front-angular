import { Cliente } from "./cliente.model";
import { Produto } from "./produto.model";

export class Pedido{
    cliente: Cliente
    precoTotal: number
    produtos: Array<Produto>
    data: Date
}
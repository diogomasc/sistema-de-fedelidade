import { Carteira } from './Carteira.js';

/**
 * Classe Cliente
 * Representa um cliente do sistema de fidelidade
 * Encapsula as regras de negócio relacionadas ao cliente
 */
export class Cliente {
  constructor(nome, tipoCliente) {
    this.nome = nome;
    this.tipoCliente = tipoCliente;
    this.carteira = new Carteira(tipoCliente);
  }

  /**
   * Registra uma compra e adiciona pontos à carteira
   * @param {number} valorCompra - Valor da compra em reais
   */
  registrarCompra(valorCompra) {
    this.carteira.adicionarPontos(valorCompra);
  }

  /**
   * Consulta o total de pontos do cliente
   * @returns {number} Total de pontos acumulados
   */
  consultarPontos() {
    return this.carteira.consultarPontos();
  }

  /**
   * Resgata pontos para desconto
   * @param {number} pontosResgatar - Quantidade de pontos a resgatar
   * @returns {number} Pontos efetivamente resgatados
   */
  resgatarPontos(pontosResgatar) {
    return this.carteira.resgatarPontos(pontosResgatar);
  }
}


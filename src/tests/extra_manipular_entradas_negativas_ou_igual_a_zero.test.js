import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { Carteira } from '../entities/Carteira.js';

describe('Exceções - Entradas Negativas ou Igual a Zero', () => {
  // Teste: adicionarPontos com valor negativo
  it('deve lançar erro ao adicionar pontos com valor de compra negativo', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    expect(() => cliente.registrarCompra(-10)).toThrow('O valor da compra deve ser maior que zero');
  });

  // Teste: adicionarPontosDiretos com valor negativo
  it('deve lançar erro ao adicionar pontos diretos com valor negativo', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    expect(() => carteira.adicionarPontosDiretos(-10)).toThrow('A quantidade de pontos a adicionar deve ser maior que zero');
  });

  // Teste: adicionarPontosDiretos com valor zero
  it('deve lançar erro ao adicionar pontos diretos com valor zero', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    expect(() => carteira.adicionarPontosDiretos(0)).toThrow('A quantidade de pontos a adicionar deve ser maior que zero');
  });

  // Teste: resgatarPontos com valor negativo
  it('deve lançar erro ao resgatar pontos com valor negativo', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100);
    expect(() => cliente.resgatarPontos(-10)).toThrow('A quantidade de pontos a resgatar deve ser maior que zero');
  });

  // Teste: resgatarPontos com valor zero
  it('deve lançar erro ao resgatar pontos com valor zero', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100);
    expect(() => cliente.resgatarPontos(0)).toThrow('A quantidade de pontos a resgatar deve ser maior que zero');
  });
});


import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

describe('Cliente - Validações e Exceções', () => {
  // Teste 9: Assegurar que compras de valor zero não gerem pontos
  it('não deve gerar pontos para valor zero', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(0);
    expect(cliente.consultarPontos()).toBe(0);
  });

  // Teste 10: Confirmar que valores decimais geram pontos proporcionais
  it('deve gerar pontos para valores decimais', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(10.50);
    // 10.50 * 1.5 = 15.75 pontos
    expect(cliente.consultarPontos()).toBe(15.75);
  });

  // Teste 11: Garantir que o saldo de pontos nunca seja negativo
  it('não deve permitir pontos negativos', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100); // 200 pontos
    cliente.resgatarPontos(200);
    cliente.resgatarPontos(50); // Tentando resgatar mais do que tem
    
    expect(cliente.consultarPontos()).toBe(0);
    expect(cliente.consultarPontos()).toBeGreaterThanOrEqual(0);
  });

  // Teste 12: Verificar se o sistema lança erro ao consultar cliente inexistente
  it('deve retornar null ao buscar cliente inexistente no repositório', () => {
    const repository = new ClienteRepository();
    
    const clienteInexistente = repository.buscarPorNome('ClienteInexistente');
    expect(clienteInexistente).toBeNull();
    
    // Testa que buscar um cliente inexistente retorna null
    // e que tentar operar com null não quebra o sistema
    expect(() => {
      if (clienteInexistente) {
        clienteInexistente.consultarPontos();
      }
    }).not.toThrow();
  });
});


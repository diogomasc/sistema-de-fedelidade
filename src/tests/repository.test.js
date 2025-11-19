import { describe, it, expect, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

describe('ClienteRepository - Operações em Listas', () => {
  let repository;

  beforeEach(() => {
    repository = new ClienteRepository();
  });

  // Teste 16: Validar a inserção de múltiplos clientes em uma lista
  it('deve registrar vários clientes em lista', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    expect(repository.listarTodos().length).toBe(3);
  });

  // Teste 17: Calcular pontos para todos os clientes de uma lista
  it('deve calcular pontos para lista de clientes', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    
    cliente1.registrarCompra(100);
    cliente2.registrarCompra(100);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    expect(cliente1.consultarPontos()).toBe(100);
    expect(cliente2.consultarPontos()).toBe(150);
  });

  // Teste 18: Filtrar clientes cujo saldo de pontos é superior a determinado valor
  it('deve filtrar clientes com pontos acima de limite', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(50);  // 50 pontos
    cliente2.registrarCompra(100);  // 150 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const clientesFiltrados = repository.filtrarPorPontosAcimaDe(100);
    expect(clientesFiltrados.length).toBe(2);
    expect(clientesFiltrados).toContain(cliente2);
    expect(clientesFiltrados).toContain(cliente3);
  });

  // Teste 19: Ordenar clientes conforme o total de pontos acumulados
  it('deve ordenar clientes por pontos', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(50);   // 75 pontos
    cliente3.registrarCompra(100);   // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const ordenados = repository.ordenarPorPontos();
    expect(ordenados[0]).toBe(cliente3); // 200 pontos
    expect(ordenados[1]).toBe(cliente1);  // 100 pontos
    expect(ordenados[2]).toBe(cliente2);  // 75 pontos
  });

  // Teste 20: Remover da lista os clientes que possuem saldo de pontos igual a zero
  it('deve remover clientes com saldo zero', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);
    cliente2.registrarCompra(0);  // 0 pontos
    cliente3.registrarCompra(0);  // 0 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const removidos = repository.removerComSaldoZero();
    expect(removidos).toBe(2);
    expect(repository.listarTodos().length).toBe(1);
    expect(repository.listarTodos()[0]).toBe(cliente1);
  });

  // Teste 21: Pesquisar cliente pelo nome em uma lista de clientes
  it('deve buscar cliente por nome', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    const encontrado = repository.buscarPorNome('Maria');
    expect(encontrado).toBe(cliente2);
    expect(encontrado.nome).toBe('Maria');

    const naoEncontrado = repository.buscarPorNome('Pedro');
    expect(naoEncontrado).toBeNull();
  });

  // Teste 22: Calcular o total de pontos de todos os clientes da lista
  it('deve somar total de pontos da lista', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(100);  // 150 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const total = repository.somarTotalPontos();
    expect(total).toBe(450); // 100 + 150 + 200
  });

  // Teste 23: Gerar ranking dos clientes ordenado por pontuação decrescente
  it('deve gerar ranking de clientes por pontos', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(50);   // 75 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const ranking = repository.gerarRanking();
    expect(ranking.length).toBe(3);
    expect(ranking[0].cliente).toBe(cliente3);
    expect(ranking[0].pontos).toBe(200);
    expect(ranking[0].posicao).toBe(1);
    expect(ranking[1].cliente).toBe(cliente1);
    expect(ranking[1].pontos).toBe(100);
    expect(ranking[1].posicao).toBe(2);
    expect(ranking[2].cliente).toBe(cliente2);
    expect(ranking[2].pontos).toBe(75);
    expect(ranking[2].posicao).toBe(3);
  });

  // Teste adicional: Remover cliente do repositório
  it('deve remover cliente do repositório', () => {
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    const removido = repository.remover(cliente1);
    expect(removido).toBe(true);
    expect(repository.listarTodos().length).toBe(1);
    expect(repository.listarTodos()[0]).toBe(cliente2);

    const naoRemovido = repository.remover(cliente1);
    expect(naoRemovido).toBe(false);
  });

  // Teste adicional: Resgatar pontos com valor zero ou negativo
  it('não deve resgatar pontos com valor zero ou negativo', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100);

    const pontosResgatadosZero = cliente.resgatarPontos(0);
    expect(pontosResgatadosZero).toBe(0);
    expect(cliente.consultarPontos()).toBe(100);

    const pontosResgatadosNegativo = cliente.resgatarPontos(-10);
    expect(pontosResgatadosNegativo).toBe(0);
    expect(cliente.consultarPontos()).toBe(100);
  });
});


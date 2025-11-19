import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 17: Calcular pontos para todos os clientes de uma lista
describe('test_calcular_pontos_lista_clientes', () => {
  it('deve calcular pontos para lista de clientes', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    
    cliente1.registrarCompra(100);
    cliente2.registrarCompra(100);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    const listaClientes = repository.listarTodos();
    const resultado = repository.calcularPontosListaClientes(listaClientes);

    expect(resultado.length).toBe(2);
    expect(resultado[0].cliente).toBe(cliente1);
    expect(resultado[0].pontos).toBe(100);
    expect(resultado[1].cliente).toBe(cliente2);
    expect(resultado[1].pontos).toBe(150);
  });
});


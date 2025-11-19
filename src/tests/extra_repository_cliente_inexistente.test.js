import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

describe('Exceções - Repository - Cliente Inexistente', () => {
  it('deve lançar erro ao remover cliente inexistente do repositório', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    
    repository.adicionar(cliente1);
    
    // Tentar remover cliente que não está no repositório
    expect(() => repository.remover(cliente2)).toThrow('Cliente não encontrado no repositório');
  });

  it('deve lançar erro ao remover cliente null', () => {
    const repository = new ClienteRepository();
    
    expect(() => repository.remover(null)).toThrow('Cliente não pode ser removido: cliente inválido');
  });
});


import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Carteira } from '../entities/Carteira.js';

describe('Exceções - Aplicar Bônus com Multiplicador Inválido', () => {
  it('deve lançar erro ao aplicar bônus com multiplicador inválido', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    carteira.adicionarPontos(100); // 100 pontos
    
    // Multiplicador inválido (não está nas constantes)
    expect(() => carteira.aplicarBonus(3.0)).toThrow('Multiplicador inválido');
  });

  it('deve permitir aplicar bônus com multiplicador válido', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    carteira.adicionarPontos(100); // 100 pontos
    
    // Multiplicador válido (1.0 está nas constantes)
    carteira.aplicarBonus(1.0);
    expect(carteira.consultarPontos()).toBe(100);
  });
});


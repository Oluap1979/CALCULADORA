import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <div className="mt-16 border-t border-slate-700 pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-white">Entendendo os Juros Compostos</h2>
      
      <div className="mt-6 grid gap-8 text-slate-400 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-rose-500">O que são?</h3>
          <p className="mt-2">
            Juros compostos são "juros sobre juros". Diferente dos juros simples, onde o rendimento é calculado apenas sobre o valor principal, nos juros compostos o rendimento de cada período é somado ao montante para o cálculo do próximo período.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-rose-500">A Fórmula</h3>
          <p className="mt-2 font-mono text-sm bg-slate-800 p-2 rounded border border-slate-700">
            M = C (1 + i)^t
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><strong className="text-slate-300">M:</strong> Montante final</li>
            <li><strong className="text-slate-300">C:</strong> Capital inicial</li>
            <li><strong className="text-slate-300">i:</strong> Taxa de juros (fixa)</li>
            <li><strong className="text-slate-300">t:</strong> Tempo</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-rose-500">O Poder do Tempo</h3>
          <p className="mt-2">
            O fator tempo é exponencial na fórmula. Isso significa que começar a investir cedo, mesmo que com pouco dinheiro, pode gerar resultados muito maiores no longo prazo do que começar tarde com valores maiores.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-rose-500">Aportes Mensais</h3>
          <p className="mt-2">
            Fazer aportes regulares (mensais) acelera drasticamente o crescimento do patrimônio, pois você aumenta a base de cálculo dos juros constantemente.
          </p>
        </div>
      </div>
    </div>
  );
};
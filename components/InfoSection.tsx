import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <div className="mt-12 w-full space-y-12 text-slate-400">
      <div className="prose prose-invert prose-p:text-slate-400 prose-headings:text-slate-200 prose-h2:border-b prose-h2:border-rose-600 prose-h2:pb-2 max-w-none">
        <h2>Como Utilizar a Calculadora de Juros Compostos</h2>
        <p>Simular o crescimento do seu dinheiro é simples e intuitivo. Siga estes passos para projetar seu futuro financeiro:</p>
        <ol>
          <li><strong>Valor Inicial:</strong> Insira a quantia que você já possui para começar o investimento. Se for começar do zero, pode deixar como 0.</li>
          <li><strong>Valor Mensal:</strong> Adicione o montante que planeja investir regularmente a cada mês. A consistência é a chave para o crescimento.</li>
          <li><strong>Taxa de Juros:</strong> Informe a rentabilidade esperada do seu investimento. Lembre-se de selecionar se a taxa é mensal ou anual para um cálculo preciso.</li>
          <li><strong>Período:</strong> Defina por quanto tempo você pretende manter o investimento. Escolha entre meses ou anos.</li>
          <li><strong>Calcular:</strong> Com todos os campos preenchidos, clique em "Calcular" para ver a mágica dos juros compostos acontecer.</li>
        </ol>

        <h2>Entendendo a Fórmula dos Juros Compostos</h2>
        <p>A força por trás do crescimento exponencial dos seus investimentos é a fórmula dos juros compostos:</p>
        <blockquote className="border-l-4 border-rose-600 bg-slate-800 p-4">
          <p className="font-mono text-lg text-white">M = C (1 + i) ^ t</p>
        </blockquote>
        <ul>
          <li><strong>M:</strong> Montante — o valor total que você terá ao final do período.</li>
          <li><strong>C:</strong> Capital — o valor inicial que você investiu.</li>
          <li><strong>i:</strong> Taxa de juros — a rentabilidade da sua aplicação, convertida para o mesmo período de tempo (ex: taxa mensal para período em meses).</li>
          <li><strong>t:</strong> Tempo — a duração da aplicação.</li>
        </ul>
        <p>Essa fórmula demonstra como seu rendimento gera mais rendimento, criando uma "bola de neve" de crescimento. Quanto maior o tempo, mais poderoso se torna esse efeito.</p>

        <h2>Juros Simples vs. Juros Compostos: Qual a Diferença?</h2>
        <p>A principal distinção reside em como os juros são calculados:</p>
        <ul>
          <li><strong>Juros Simples:</strong> A taxa incide sempre sobre o capital inicial. O rendimento é constante e linear ao longo do tempo.</li>
          <li><strong>Juros Compostos:</strong> A taxa incide sobre o capital inicial somado aos juros acumulados de períodos anteriores. O crescimento é exponencial, sendo muito mais vantajoso para investimentos de longo prazo.</li>
        </ul>
        <p>Como disse Albert Einstein: "Os juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha. Aquele que não entende, paga."</p>

        <h2>Onde os Juros Compostos Atuam?</h2>
        <p>Os juros compostos, ou "juros sobre juros", são um conceito fundamental nas finanças e estão presentes em diversas áreas:</p>
        <ol>
            <li><strong>Investimentos:</strong> É o motor da maioria dos investimentos de renda fixa (CDBs, Tesouro Direto) e variável (ao reinvestir dividendos de ações). É o seu maior aliado na construção de patrimônio.</li>
            <li><strong>Financiamentos e Empréstimos:</strong> Instituições financeiras utilizam juros compostos para calcular o custo de empréstimos. Nesse cenário, eles trabalham contra você, aumentando o valor total da dívida.</li>
            <li><strong>Dívidas de Cartão de Crédito:</strong> O rotativo do cartão de crédito é um exemplo perigoso do poder dos juros compostos, transformando pequenas dívidas em valores expressivos rapidamente.</li>
        </ol>
        <p>Compreender seu funcionamento é crucial para tomar decisões financeiras inteligentes, seja para potencializar seus ganhos ou para evitar dívidas que crescem descontroladamente.</p>
      </div>
    </div>
  );
};

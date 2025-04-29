function page() {
  return (
    <div className="flex flex-col items-center px-4 py-12 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-8">Sobre o Projeto</h1>

  {/* O que é o projeto */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">📌 O que é este projeto?</h2>
    <p className="text-gray-700">
      Esta aplicação foi criada para filtrar e exibir os melhores Fundos Imobiliários (FIIs) com base em indicadores como DY, P/VP, liquidez e segmento. Ela ajuda investidores a tomar decisões mais informadas de forma simples e rápida.
    </p>
  </section>

  {/* Função do projeto */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">🎯 Qual a função do projeto?</h2>
    <p className="text-gray-700">
      Ajudar investidores a encontrarem oportunidades de investimento em FIIs através de filtros personalizados e dados atualizados de diferentes fontes confiáveis.
    </p>
  </section>

  {/* Gratuidade */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">💰 É gratuito?</h2>
    <p className="text-gray-700">
      Sim. O projeto é totalmente gratuito. Futuramente, pode haver uma opção de doação ou monetização com anúncios leves (sem poluição visual), mas nunca será obrigatório.
    </p>
  </section>

  {/* Fontes dos dados */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">📊 De onde vêm os dados?</h2>
    <p className="text-gray-700">
      Os dados são coletados automaticamente de fontes públicas como o site Fundamentus e o ClubeFII. Eles são cruzados e organizados para exibir as informações mais relevantes.
    </p>
  </section>

  {/* Atualização */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">⏰ Com que frequência os dados são atualizados?</h2>
    <p className="text-gray-700">
      Os dados são atualizados diariamente de 30 em 30 minutos, de forma automática para garantir que os investidores estejam sempre bem informados.
    </p>
  </section>

  {/* Contribuições */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">🤝 Como posso contribuir?</h2>
    <p className="text-gray-700">
      Você pode contribuir com ideias, feedbacks ou até código (através do Github). Em breve adicionarei um link para contato e repositório.
    </p>
  </section>

  {/* Sobre o autor */}
  <section className="max-w-3xl w-full mb-8">
    <h2 className="text-xl font-semibold mb-2">👨‍💻 Quem desenvolveu?</h2>
    <p className="text-gray-700">
      Este projeto foi idealizado e desenvolvido por Victor Herison. É um projeto pessoal, voltado à comunidade de investidores que desejam uma ferramenta simples e poderosa.
    </p>
  </section>
</div>

  )
}

export default page


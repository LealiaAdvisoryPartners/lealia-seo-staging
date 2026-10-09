import type { Language } from "@/contexts/language-context";

export type FaqCategory = { titulo: string; itens: { q: string; a: string }[] };
export type FaqCopy = { eyebrow: string; heading: string; lead: string; categorias: FaqCategory[] };

export const faqCopy: Record<Language, FaqCopy> = {
  pt: {
    eyebrow: "Perguntas frequentes",
    heading: "Tudo o que precisa de saber",
    lead: "Respostas diretas sobre venda, compra e avaliação de empresas em Portugal e Espanha.",
    categorias: [
      {
        titulo: "Sobre nós",
        itens: [
          { q: "O que é a Lealia Advisory Partners?", a: "Somos uma boutique independente de assessoria M&A e consultoria estratégica, sediada em Lisboa. Ajudamos empresários, famílias e investidores a vender, comprar e avaliar empresas em Portugal e Espanha, em qualquer setor de atividade." },
          { q: "Que serviços de assessoria M&A prestam?", a: "Prestamos assessoria na venda de empresas (sell-side) e na compra de empresas (buy-side), avaliação de empresas, business plans, modelos financeiros, estruturação de transações, coordenação de due diligence e apoio à negociação até ao fecho." },
          { q: "Em que setores atuam?", a: "Em todos. Assessoramos empresas de qualquer setor, incluindo saúde (hospitais, clínicas, laboratórios, medicina dentária, apoio a seniores), indústria (metalomecânica, plásticos, moldes, têxtil, calçado, embalagem, automóvel, químico), energia e renováveis (solar, eólica, biomassa, eficiência energética), infraestruturas e construção, tecnologia e software, serviços empresariais, distribuição e retalho, logística e transportes, agroalimentar, vinhos e bebidas, turismo e hotelaria, restauração, educação, ambiente, resíduos e água, imobiliário, telecomunicações, media, farmacêutico, seguros e fintech. Se o seu setor não está na lista, fale connosco." },
          { q: "Só trabalham com empresas de um certo tamanho?", a: "Focamo-nos em PMEs e no lower mid-market, onde conseguimos maximizar o valor acrescentado da nossa assessoria, mas avaliamos cada caso individualmente." },
          { q: "Atuam apenas em Portugal?", a: "Não. Atuamos em Portugal e Espanha, incluindo operações transfronteiriças na Península Ibérica, com compradores e investidores nacionais e internacionais." },
          { q: "Qual a diferença entre uma boutique M&A e uma grande consultora?", a: "Numa boutique, os sócios acompanham o mandato de ponta a ponta, com menos intermediários, mais proximidade e maior foco em cada operação. É assim que trabalhamos, entregando a máxima atenção a cada processo." },
        ],
      },
      {
        titulo: "Vender a empresa",
        itens: [
          { q: "Como vender a minha empresa em Portugal?", a: "O processo tem seis passos: preparação e avaliação, materiais de venda (teaser e memorando de informação), identificação e contacto com compradores, ofertas não vinculativas, due diligence e negociação do contrato de compra e venda (SPA) até ao fecho. Na Lealia conduzimos todas as fases, sempre em estreita coordenação com os nossos clientes." },
          { q: "Quando é a altura certa para vender a empresa?", a: "Quando os resultados são sólidos ou crescem, a dependência do fundador é baixa e a informação financeira está organizada. Também é comum vender por sucessão, reforma, falta de sucessor, necessidade de capital ou entrada de um parceiro estratégico. Cada processo tem as suas características únicas e as \"alturas certas\" muitas vezes dependem do contexto macroeconómico." },
          { q: "Quanto tempo demora a venda de uma empresa?", a: "O prazo depende sempre da complexidade, da qualidade da informação e do interesse dos compradores. Os processos mais comuns demoram entre 6 meses e 1 ano." },
          { q: "Quem compra empresas em Portugal e Espanha?", a: "Grupos estratégicos do mesmo setor, fundos de private equity, family offices, empresas em consolidação (buy-and-build) e investidores internacionais. Selecionamos os compradores mais adequados ao perfil e ao setor da sua empresa." },
          { q: "A venda da empresa é confidencial?", a: "Sim. A empresa é apresentada de forma anónima, e a identidade só é revelada depois de o comprador assinar um acordo de confidencialidade (NDA). Colaboradores, clientes e concorrentes só sabem quando decidir." },
          { q: "Posso vender só uma parte da empresa?", a: "Sim. É possível vender uma participação minoritária ou maioritária, receber um sócio financeiro ou fazer uma reorganização societária. A estrutura depende dos seus objetivos." },
          { q: "O que é um teaser e um memorando de informação?", a: "O teaser é um resumo anónimo de uma a duas páginas que apresenta a oportunidade. O memorando de informação (IM) é o documento detalhado, partilhado só com compradores qualificados após o NDA." },
          { q: "O que é a due diligence na venda de uma empresa?", a: "É a análise que o comprador faz à empresa (financeira, fiscal, legal, comercial, operacional) antes de fechar. Preparar bem a informação com antecedência evita atrasos e cortes no preço." },
          { q: "Que documentos preciso para vender a empresa?", a: "Contas dos últimos exercícios, balancetes recentes, plano de negócios, lista de clientes e fornecedores principais, contratos relevantes, informação laboral e fiscal e a estrutura societária. Ajudamos a organizar tudo de forma a que o processo não perturbe as operações." },
          { q: "Como se paga a venda? Recebo tudo no fecho?", a: "Depende do contrato. O preço pode ser pago na totalidade no fecho ou incluir componentes diferidas, earn-out ou retenção. Estes mecanismos negociam-se no SPA." },
          { q: "Preciso de um assessor para vender a minha empresa?", a: "Não é obrigatório, mas um assessor alarga o universo de compradores, preserva a confidencialidade, cria concorrência entre ofertas, defende o preço e garante melhores condições na negociação." },
          { q: "Que erros devo evitar ao vender uma empresa?", a: "Vender sem preparar a informação, depender de um só comprador, divulgar o processo cedo demais, aceitar o primeiro preço sem concorrência e descurar a estrutura fiscal e contratual da operação." },
        ],
      },
      {
        titulo: "Comprar empresas",
        itens: [
          { q: "Ajudam a comprar empresas?", a: "Sim. Apoiamos na definição da estratégia de aquisição, na identificação e abordagem de empresas-alvo, na avaliação, no modelo financeiro, na negociação e na coordenação da due diligence." },
          { q: "Podem encontrar empresas para eu adquirir?", a: "Sim, através de screening de mercado e abordagem direta e confidencial aos proprietários, mesmo quando a empresa não está à venda." },
        ],
      },
      {
        titulo: "Avaliação e corporate finance",
        itens: [
          { q: "Quanto vale a minha empresa?", a: "Depende sobretudo do EBITDA e da sua qualidade, do crescimento, da recorrência das receitas, da dependência do fundador, da concentração de clientes, do setor e do endividamento. Para um valor indicativo, peça o relatório preliminar gratuito." },
          { q: "Que métodos se usam para avaliar uma empresa?", a: "Os mais comuns são o DCF (fluxos de caixa descontados), os múltiplos de mercado (p. ex. EV/EBITDA) e as transações comparáveis. Costuma usar-se mais de um método." },
          { q: "Qual a diferença entre enterprise value e equity value?", a: "O enterprise value é o valor do negócio. O equity value é o que cabe aos sócios, ou seja, o enterprise value menos a dívida líquida e outros ajustamentos aplicáveis." },
        ],
      },
      {
        titulo: "Avaliação online e relatórios",
        itens: [
          { q: "Como saber quanto vale a minha empresa?", a: "Com uma avaliação que combine DCF, múltiplos de mercado e transações comparáveis. Oferecemos um relatório preliminar gratuito com um intervalo de valor indicativo e os principais fatores que o influenciam. Para uma análise mais detalhada, existe o relatório completo." },
          { q: "O relatório preliminar é mesmo gratuito?", a: "Sim, é gratuito e sem compromisso." },
          { q: "O que inclui o relatório preliminar gratuito?", a: "Um intervalo de valor indicativo, o perfil da empresa, o âmbito e o método de avaliação por múltiplos, os ajustamentos ao EBITDA e os próximos passos do processo. É uma primeira referência, não vinculativa." },
          { q: "O que inclui o relatório completo?", a: "Todas as secções do relatório: sumário executivo, cenários de valor, equity bridge, drivers de valor e riscos, avaliação por DCF com projeções e WACC, matriz de sensibilidades e plano de preparação para o mercado." },
          { q: "Quanto custa o relatório completo?", a: "O relatório completo custa 299 €, com IVA incluído. A fatura é enviada para o e-mail indicado no prazo máximo de 3 dias úteis." },
          { q: "Qual a diferença entre o relatório preliminar e o completo?", a: "O preliminar é gratuito e dá um intervalo de valor indicativo, para decidir os próximos passos. O completo é pago e mais detalhado, com análise e pressupostos documentados." },
          { q: "Que informação preciso de fornecer?", a: "Setor e atividade, faturação, EBITDA, depreciações e amortizações, caixa e dívida financeira, imóveis afetos à atividade, concentração de clientes e o contexto e motivação da operação. O questionário tem sete passos curtos e demora menos de 5 minutos." },
          { q: "Quanto tempo demora?", a: "A nossa equipa valida os dados e envia o relatório preliminar em menos de 3 dias úteis. O relatório completo é enviado pela equipa assim que possível após a confirmação do pagamento." },
          { q: "A avaliação serve para qualquer setor?", a: "Sim. Avaliamos empresas de todos os setores, da saúde à indústria, energia, tecnologia, distribuição, turismo, agroalimentar, serviços e outros. Os múltiplos e os drivers de valor ajustam-se a cada um." },
          { q: "Os meus dados são confidenciais?", a: "Sim. São tratados com confidencialidade e de acordo com a nossa política de privacidade. Pode pedir um NDA antes de partilhar dados sensíveis." },
          { q: "Os relatórios são avaliações formais ou certificadas?", a: "Não. Tanto o relatório preliminar como o completo são análises indicativas de apoio à decisão, não pareceres formais para fins específicos como litígios, operações societárias ou fiscais." },
          { q: "Valor de uma empresa e preço de venda são o mesmo?", a: "Não. O valor é uma estimativa técnica. O preço final resulta da negociação, do interesse dos compradores, da estrutura do negócio e do mercado." },
          { q: "Devo avaliar a empresa antes de a vender?", a: "Sim. Saber o intervalo de valor permite definir expectativas, perceber o que melhorar e decidir o momento da venda." },
          { q: "Posso pedir a avaliação se ainda não decidi vender?", a: "Sim. Muitos empresários avaliam para planear sucessão, trazer um sócio, negociar com a banca ou simplesmente conhecer o valor." },
          { q: "A avaliação serve para pequenas empresas e microempresas?", a: "A avaliação online requer uma faturação anual mínima de 50 000 € e um EBITDA de pelo menos 10 000 €. Focamo-nos em PMEs e lower mid-market, mas analisamos cada caso." },
        ],
      },
      {
        titulo: "Honorários e contacto",
        itens: [
          { q: "Quanto custa uma assessoria M&A?", a: "Os honorários são definidos em proposta, antes do início do mandato, e estão ligados ao âmbito e à dimensão da operação." },
          { q: "Como posso falar convosco?", a: "Pelo formulário de contacto, por email (geral@lealiaap.com) ou por LinkedIn. A primeira conversa é confidencial e sem compromisso." },
        ],
      },
    ],
  },
  en: {
    eyebrow: "Frequently asked questions",
    heading: "Everything you need to know",
    lead: "Straight answers on selling, buying and valuing companies in Portugal and Spain.",
    categorias: [
      {
        titulo: "About us",
        itens: [
          { q: "What is Lealia Advisory Partners?", a: "We are an independent M&A advisory and strategy consulting boutique based in Lisbon. We help business owners, families and investors sell, buy and value companies in Portugal and Spain, in any sector." },
          { q: "What M&A advisory services do you provide?", a: "We advise on company sales (sell-side) and acquisitions (buy-side), company valuation, business plans, financial models, transaction structuring, due diligence coordination and negotiation support through to closing." },
          { q: "Which sectors do you cover?", a: "All of them. We advise companies in any sector, including healthcare (hospitals, clinics, laboratories, dental care, senior care), industry (metalworking, plastics, moulds, textiles, footwear, packaging, automotive, chemicals), energy and renewables (solar, wind, biomass, energy efficiency), infrastructure and construction, technology and software, business services, distribution and retail, logistics and transport, agri-food, wine and beverages, tourism and hospitality, restaurants, education, environment, waste and water, real estate, telecoms, media, pharma, insurance and fintech. If your sector is not listed, talk to us." },
          { q: "Do you only work with companies of a certain size?", a: "We focus on SMEs and the lower mid-market, where our advice adds the most value, but we assess each case individually." },
          { q: "Do you only operate in Portugal?", a: "No. We operate in Portugal and Spain, including cross-border deals across the Iberian Peninsula, with domestic and international buyers and investors." },
          { q: "What is the difference between an M&A boutique and a large consultancy?", a: "In a boutique, the partners lead the mandate end to end, with fewer intermediaries, closer contact and greater focus on each deal. That is how we work, giving every process our full attention." },
        ],
      },
      {
        titulo: "Selling your company",
        itens: [
          { q: "How do I sell my company in Portugal?", a: "The process has six steps: preparation and valuation, sale materials (teaser and information memorandum), identifying and contacting buyers, non-binding offers, due diligence and negotiation of the share purchase agreement (SPA) through to closing. At Lealia we run every phase in close coordination with our clients." },
          { q: "When is the right time to sell a company?", a: "When results are solid or growing, founder dependence is low and financial information is well organised. Companies are also often sold for succession, retirement, lack of a successor, capital needs or the entry of a strategic partner. Every process is unique and the \"right time\" often depends on the macroeconomic context." },
          { q: "How long does it take to sell a company?", a: "It always depends on complexity, information quality and buyer interest. Most processes take between 6 months and 1 year." },
          { q: "Who buys companies in Portugal and Spain?", a: "Strategic groups in the same sector, private equity funds, family offices, consolidators (buy-and-build) and international investors. We select the buyers best suited to your company's profile and sector." },
          { q: "Is the sale of the company confidential?", a: "Yes. The company is presented anonymously and its identity is only disclosed once the buyer signs a non-disclosure agreement (NDA). Employees, clients and competitors only find out when you decide." },
          { q: "Can I sell only part of my company?", a: "Yes. You can sell a minority or majority stake, bring in a financial partner or carry out a corporate reorganisation. The structure depends on your goals." },
          { q: "What are a teaser and an information memorandum?", a: "The teaser is an anonymous one-to-two-page summary presenting the opportunity. The information memorandum (IM) is the detailed document, shared only with qualified buyers after the NDA." },
          { q: "What is due diligence in a company sale?", a: "It is the buyer's review of the company (financial, tax, legal, commercial, operational) before closing. Preparing information well in advance avoids delays and price cuts." },
          { q: "What documents do I need to sell my company?", a: "Accounts for recent years, recent trial balances, business plan, list of main clients and suppliers, relevant contracts, employment and tax information and the corporate structure. We help organise everything so the process does not disrupt operations." },
          { q: "How is the sale paid? Do I receive everything at closing?", a: "It depends on the contract. The price may be paid in full at closing or include deferred components, earn-outs or retentions. These mechanisms are negotiated in the SPA." },
          { q: "Do I need an advisor to sell my company?", a: "It is not mandatory, but an advisor widens the pool of buyers, protects confidentiality, creates competition between offers, defends the price and secures better negotiating terms." },
          { q: "What mistakes should I avoid when selling a company?", a: "Selling without preparing the information, relying on a single buyer, disclosing the process too early, accepting the first price without competition and neglecting the tax and contractual structure of the deal." },
        ],
      },
      {
        titulo: "Buying companies",
        itens: [
          { q: "Do you help buy companies?", a: "Yes. We support defining the acquisition strategy, identifying and approaching targets, valuation, financial modelling, negotiation and due diligence coordination." },
          { q: "Can you find companies for me to acquire?", a: "Yes, through market screening and direct, confidential approaches to owners, even when the company is not for sale." },
        ],
      },
      {
        titulo: "Valuation and corporate finance",
        itens: [
          { q: "How much is my company worth?", a: "It depends mainly on EBITDA and its quality, growth, revenue recurrence, founder dependence, client concentration, sector and debt. For an indicative value, request the free preliminary report." },
          { q: "Which methods are used to value a company?", a: "The most common are DCF (discounted cash flows), market multiples (e.g. EV/EBITDA) and comparable transactions. More than one method is usually used." },
          { q: "What is the difference between enterprise value and equity value?", a: "Enterprise value is the value of the business. Equity value is what belongs to the shareholders, i.e. enterprise value minus net debt and other applicable adjustments." },
        ],
      },
      {
        titulo: "Online valuation and reports",
        itens: [
          { q: "How can I find out what my company is worth?", a: "With a valuation combining DCF, market multiples and comparable transactions. We offer a free preliminary report with an indicative value range and the main factors driving it. For a more detailed analysis, there is the full report." },
          { q: "Is the preliminary report really free?", a: "Yes, it is free and without obligation." },
          { q: "What does the free preliminary report include?", a: "An indicative value range, the company profile, the scope and multiples-based valuation method, EBITDA adjustments and the next steps of the process. It is a first, non-binding reference." },
          { q: "What does the full report include?", a: "Every section of the report: executive summary, value scenarios, equity bridge, value drivers and risks, DCF valuation with projections and WACC, sensitivity matrix and market-readiness plan." },
          { q: "How much does the full report cost?", a: "The full report costs €299, VAT included. The invoice is sent to the email provided within 3 business days at most." },
          { q: "What is the difference between the preliminary and the full report?", a: "The preliminary report is free and gives an indicative value range to decide next steps. The full report is paid and more detailed, with documented analysis and assumptions." },
          { q: "What information do I need to provide?", a: "Sector and activity, revenue, EBITDA, depreciation and amortisation, cash and financial debt, operating real estate, client concentration and the context and motivation for the deal. The questionnaire has seven short steps and takes under 5 minutes." },
          { q: "How long does it take?", a: "Our team validates the data and sends the preliminary report in under 3 business days. The full report is sent by the team as soon as possible after payment is confirmed." },
          { q: "Does the valuation work for any sector?", a: "Yes. We value companies in every sector, from healthcare to industry, energy, technology, distribution, tourism, agri-food, services and more. Multiples and value drivers are adjusted to each one." },
          { q: "Is my data confidential?", a: "Yes. It is handled confidentially and in line with our privacy policy. You can request an NDA before sharing sensitive data." },
          { q: "Are the reports formal or certified valuations?", a: "No. Both the preliminary and the full report are indicative decision-support analyses, not formal opinions for specific purposes such as litigation, corporate or tax transactions." },
          { q: "Are company value and sale price the same?", a: "No. Value is a technical estimate. The final price results from negotiation, buyer interest, deal structure and the market." },
          { q: "Should I value my company before selling it?", a: "Yes. Knowing the value range lets you set expectations, see what to improve and decide when to sell." },
          { q: "Can I request a valuation if I have not decided to sell?", a: "Yes. Many owners value their company to plan succession, bring in a partner, negotiate with banks or simply know its worth." },
          { q: "Is the valuation suitable for small and micro companies?", a: "The online valuation requires minimum annual revenue of €50,000 and EBITDA of at least €10,000. We focus on SMEs and the lower mid-market, but we review each case." },
        ],
      },
      {
        titulo: "Fees and contact",
        itens: [
          { q: "How much does M&A advisory cost?", a: "Fees are set out in a proposal before the mandate starts and are tied to the scope and size of the deal." },
          { q: "How can I contact you?", a: "Through the contact form, by email (geral@lealiaap.com) or on LinkedIn. The first conversation is confidential and without obligation." },
        ],
      },
    ],
  },
  es: {
    eyebrow: "Preguntas frecuentes",
    heading: "Todo lo que necesita saber",
    lead: "Respuestas directas sobre la venta, compra y valoración de empresas en Portugal y España.",
    categorias: [
      {
        titulo: "Sobre nosotros",
        itens: [
          { q: "¿Qué es Lealia Advisory Partners?", a: "Somos una boutique independiente de asesoramiento M&A y consultoría estratégica, con sede en Lisboa. Ayudamos a empresarios, familias e inversores a vender, comprar y valorar empresas en Portugal y España, en cualquier sector." },
          { q: "¿Qué servicios de asesoramiento M&A prestan?", a: "Asesoramos en la venta de empresas (sell-side) y en la compra de empresas (buy-side), valoración de empresas, planes de negocio, modelos financieros, estructuración de operaciones, coordinación de due diligence y apoyo en la negociación hasta el cierre." },
          { q: "¿En qué sectores trabajan?", a: "En todos. Asesoramos a empresas de cualquier sector, incluidos salud (hospitales, clínicas, laboratorios, odontología, atención a mayores), industria (metalmecánica, plásticos, moldes, textil, calzado, embalaje, automoción, químico), energía y renovables (solar, eólica, biomasa, eficiencia energética), infraestructuras y construcción, tecnología y software, servicios empresariales, distribución y retail, logística y transporte, agroalimentario, vinos y bebidas, turismo y hostelería, restauración, educación, medio ambiente, residuos y agua, inmobiliario, telecomunicaciones, medios, farmacéutico, seguros y fintech. Si su sector no está en la lista, hable con nosotros." },
          { q: "¿Solo trabajan con empresas de cierto tamaño?", a: "Nos centramos en pymes y en el lower mid-market, donde maximizamos el valor añadido de nuestro asesoramiento, pero analizamos cada caso individualmente." },
          { q: "¿Operan solo en Portugal?", a: "No. Operamos en Portugal y España, incluidas operaciones transfronterizas en la Península Ibérica, con compradores e inversores nacionales e internacionales." },
          { q: "¿Qué diferencia hay entre una boutique M&A y una gran consultora?", a: "En una boutique, los socios acompañan el mandato de principio a fin, con menos intermediarios, más cercanía y mayor foco en cada operación. Así trabajamos, dedicando la máxima atención a cada proceso." },
        ],
      },
      {
        titulo: "Vender la empresa",
        itens: [
          { q: "¿Cómo vender mi empresa?", a: "El proceso tiene seis pasos: preparación y valoración, materiales de venta (teaser y cuaderno de venta), identificación y contacto con compradores, ofertas no vinculantes, due diligence y negociación del contrato de compraventa (SPA) hasta el cierre. En Lealia dirigimos todas las fases, en estrecha coordinación con nuestros clientes." },
          { q: "¿Cuándo es el momento adecuado para vender la empresa?", a: "Cuando los resultados son sólidos o crecen, la dependencia del fundador es baja y la información financiera está organizada. También es habitual vender por sucesión, jubilación, falta de sucesor, necesidad de capital o entrada de un socio estratégico. Cada proceso es único y el \"momento adecuado\" depende a menudo del contexto macroeconómico." },
          { q: "¿Cuánto tarda la venta de una empresa?", a: "Depende siempre de la complejidad, de la calidad de la información y del interés de los compradores. Los procesos más habituales duran entre 6 meses y 1 año." },
          { q: "¿Quién compra empresas en Portugal y España?", a: "Grupos estratégicos del mismo sector, fondos de private equity, family offices, empresas en consolidación (buy-and-build) e inversores internacionales. Seleccionamos los compradores más adecuados al perfil y al sector de su empresa." },
          { q: "¿La venta de la empresa es confidencial?", a: "Sí. La empresa se presenta de forma anónima y su identidad solo se revela después de que el comprador firme un acuerdo de confidencialidad (NDA). Empleados, clientes y competidores solo lo saben cuando usted lo decida." },
          { q: "¿Puedo vender solo una parte de la empresa?", a: "Sí. Puede vender una participación minoritaria o mayoritaria, incorporar un socio financiero o realizar una reorganización societaria. La estructura depende de sus objetivos." },
          { q: "¿Qué son un teaser y un cuaderno de venta?", a: "El teaser es un resumen anónimo de una o dos páginas que presenta la oportunidad. El cuaderno de venta (IM) es el documento detallado, compartido solo con compradores cualificados tras el NDA." },
          { q: "¿Qué es la due diligence en la venta de una empresa?", a: "Es el análisis que el comprador hace de la empresa (financiero, fiscal, legal, comercial, operativo) antes del cierre. Preparar bien la información con antelación evita retrasos y rebajas de precio." },
          { q: "¿Qué documentos necesito para vender la empresa?", a: "Cuentas de los últimos ejercicios, balances recientes, plan de negocio, lista de clientes y proveedores principales, contratos relevantes, información laboral y fiscal y la estructura societaria. Ayudamos a organizarlo todo para que el proceso no afecte a las operaciones." },
          { q: "¿Cómo se paga la venta? ¿Lo recibo todo en el cierre?", a: "Depende del contrato. El precio puede pagarse íntegramente en el cierre o incluir componentes diferidos, earn-out o retenciones. Estos mecanismos se negocian en el SPA." },
          { q: "¿Necesito un asesor para vender mi empresa?", a: "No es obligatorio, pero un asesor amplía el universo de compradores, preserva la confidencialidad, genera competencia entre ofertas, defiende el precio y garantiza mejores condiciones en la negociación." },
          { q: "¿Qué errores debo evitar al vender una empresa?", a: "Vender sin preparar la información, depender de un solo comprador, divulgar el proceso demasiado pronto, aceptar el primer precio sin competencia y descuidar la estructura fiscal y contractual de la operación." },
        ],
      },
      {
        titulo: "Comprar empresas",
        itens: [
          { q: "¿Ayudan a comprar empresas?", a: "Sí. Apoyamos en la definición de la estrategia de adquisición, la identificación y aproximación a empresas objetivo, la valoración, el modelo financiero, la negociación y la coordinación de la due diligence." },
          { q: "¿Pueden encontrar empresas para que yo las adquiera?", a: "Sí, mediante screening de mercado y aproximación directa y confidencial a los propietarios, incluso cuando la empresa no está en venta." },
        ],
      },
      {
        titulo: "Valoración y corporate finance",
        itens: [
          { q: "¿Cuánto vale mi empresa?", a: "Depende sobre todo del EBITDA y su calidad, del crecimiento, de la recurrencia de los ingresos, de la dependencia del fundador, de la concentración de clientes, del sector y del endeudamiento. Para un valor indicativo, solicite el informe preliminar gratuito." },
          { q: "¿Qué métodos se usan para valorar una empresa?", a: "Los más comunes son el DCF (flujos de caja descontados), los múltiplos de mercado (p. ej. EV/EBITDA) y las transacciones comparables. Suele usarse más de un método." },
          { q: "¿Qué diferencia hay entre enterprise value y equity value?", a: "El enterprise value es el valor del negocio. El equity value es lo que corresponde a los socios, es decir, el enterprise value menos la deuda neta y otros ajustes aplicables." },
        ],
      },
      {
        titulo: "Valoración online e informes",
        itens: [
          { q: "¿Cómo saber cuánto vale mi empresa?", a: "Con una valoración que combine DCF, múltiplos de mercado y transacciones comparables. Ofrecemos un informe preliminar gratuito con un rango de valor indicativo y los principales factores que lo influyen. Para un análisis más detallado, existe el informe completo." },
          { q: "¿El informe preliminar es realmente gratuito?", a: "Sí, es gratuito y sin compromiso." },
          { q: "¿Qué incluye el informe preliminar gratuito?", a: "Un rango de valor indicativo, el perfil de la empresa, el alcance y el método de valoración por múltiplos, los ajustes al EBITDA y los próximos pasos del proceso. Es una primera referencia, no vinculante." },
          { q: "¿Qué incluye el informe completo?", a: "Todas las secciones del informe: resumen ejecutivo, escenarios de valor, equity bridge, drivers de valor y riesgos, valoración por DCF con proyecciones y WACC, matriz de sensibilidades y plan de preparación para el mercado." },
          { q: "¿Cuánto cuesta el informe completo?", a: "El informe completo cuesta 299 €, IVA incluido. La factura se envía al correo indicado en un plazo máximo de 3 días hábiles." },
          { q: "¿Qué diferencia hay entre el informe preliminar y el completo?", a: "El preliminar es gratuito y ofrece un rango de valor indicativo para decidir los próximos pasos. El completo es de pago y más detallado, con análisis y supuestos documentados." },
          { q: "¿Qué información debo facilitar?", a: "Sector y actividad, facturación, EBITDA, amortizaciones, caja y deuda financiera, inmuebles afectos a la actividad, concentración de clientes y el contexto y motivación de la operación. El cuestionario tiene siete pasos cortos y se completa en menos de 5 minutos." },
          { q: "¿Cuánto tarda?", a: "Nuestro equipo valida los datos y envía el informe preliminar en menos de 3 días hábiles. El informe completo lo envía el equipo lo antes posible tras confirmarse el pago." },
          { q: "¿La valoración sirve para cualquier sector?", a: "Sí. Valoramos empresas de todos los sectores, desde la salud a la industria, energía, tecnología, distribución, turismo, agroalimentario, servicios y otros. Los múltiplos y los drivers de valor se ajustan a cada uno." },
          { q: "¿Mis datos son confidenciales?", a: "Sí. Se tratan con confidencialidad y de acuerdo con nuestra política de privacidad. Puede solicitar un NDA antes de compartir datos sensibles." },
          { q: "¿Los informes son valoraciones formales o certificadas?", a: "No. Tanto el informe preliminar como el completo son análisis indicativos de apoyo a la decisión, no dictámenes formales para fines específicos como litigios, operaciones societarias o fiscales." },
          { q: "¿El valor de una empresa y el precio de venta son lo mismo?", a: "No. El valor es una estimación técnica. El precio final resulta de la negociación, del interés de los compradores, de la estructura de la operación y del mercado." },
          { q: "¿Debo valorar la empresa antes de venderla?", a: "Sí. Conocer el rango de valor permite fijar expectativas, entender qué mejorar y decidir el momento de la venta." },
          { q: "¿Puedo solicitar la valoración si aún no he decidido vender?", a: "Sí. Muchos empresarios valoran su empresa para planificar la sucesión, incorporar un socio, negociar con la banca o simplemente conocer su valor." },
          { q: "¿La valoración sirve para pequeñas empresas y microempresas?", a: "La valoración online requiere una facturación anual mínima de 50 000 € y un EBITDA de al menos 10 000 €. Nos centramos en pymes y lower mid-market, pero analizamos cada caso." },
        ],
      },
      {
        titulo: "Honorarios y contacto",
        itens: [
          { q: "¿Cuánto cuesta un asesoramiento M&A?", a: "Los honorarios se definen en una propuesta antes del inicio del mandato y dependen del alcance y la dimensión de la operación." },
          { q: "¿Cómo puedo contactar con ustedes?", a: "Mediante el formulario de contacto, por correo (geral@lealiaap.com) o por LinkedIn. La primera conversación es confidencial y sin compromiso." },
        ],
      },
    ],
  },
};

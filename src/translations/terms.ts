import type { Language } from "@/contexts/language-context";

export interface TermsSection {
  title: string;
  paragraphs: string[];
  details?: string[];
  afterDetails?: string[];
  privacyLink?: boolean;
}

interface TermsContent {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  sections: TermsSection[];
}

const pt: TermsContent = {
  title: "Termos e Condições",
  eyebrow: "Legal",
  lastUpdated: "Última atualização: Setembro de 2026",
  sections: [
    {
      title: "Identificação do Prestador de Serviços",
      paragraphs: [],
      details: [
        "Lealia Advisory Partners, Lda.",
        "NIF/NIPC: 519 187 334",
        "Sede: Calçada da Picheleira, 40, 1.º Piso, 1900-371 Lisboa",
        "Contacto: geral@lealiaap.com",
      ],
    },
    {
      title: "Objeto e Descrição do Serviço",
      paragraphs: [
        'Os presentes Termos e Condições regulam a contratação e prestação, através do site lealiaap.com, de serviços de avaliação de empresas ("Serviço"), prestados pela Lealia Advisory Partners, Lda. mediante pagamento online.',
        "O Serviço consiste na elaboração de um relatório de avaliação da empresa indicada pelo Cliente, com base na informação e documentação por este fornecida, utilizando metodologias de avaliação financeira reconhecidas (por exemplo, múltiplos de mercado, DCF - fluxos de caixa descontados, ou outras aplicáveis ao caso concreto).",
      ],
    },
    {
      title: "Processo de Contratação",
      paragraphs: [
        "3.1. O Cliente seleciona o serviço pretendido no site, preenche os dados e a informação solicitada sobre a empresa a avaliar e procede ao pagamento através dos meios disponibilizados.",
        "3.2. O contrato considera-se celebrado no momento da confirmação do pagamento, momento em que o Cliente recebe uma confirmação por email.",
        "3.3. O Cliente é responsável por assegurar que a informação e documentação fornecidas são verdadeiras, completas e atualizadas. A Lealia Advisory Partners não valida de forma independente a veracidade dos dados fornecidos, salvo indicação em contrário.",
      ],
    },
    {
      title: "Preço e Pagamento",
      paragraphs: [
        "4.1. Os preços de cada serviço são os apresentados no site no momento da contratação e incluem IVA à taxa legal em vigor, quando aplicável.",
        "4.2. O pagamento é processado de forma segura pela Stripe Payments Europe, Ltd., instituição de moeda eletrónica autorizada e supervisionada pelo Banco Central da Irlanda, através de cartão de crédito/débito e carteiras digitais compatíveis (Apple Pay, Google Pay).",
        "4.3. O Serviço só é iniciado após confirmação do pagamento.",
        "4.4. Será emitida fatura ou fatura-recibo eletrónica, enviada para o email indicado pelo Cliente.",
      ],
    },
    {
      title: "Prazo de Entrega do Serviço",
      paragraphs: [
        "5.1. O relatório de avaliação é entregue por via eletrónica (email e/ou área de cliente), no prazo indicado no site para o serviço contratado, a contar da data de confirmação do pagamento e da receção de toda a informação ou documentação necessária fornecida pelo Cliente. Na ausência de prazo indicado, a Lealia Advisory Partners compromete-se a entregar o relatório num prazo razoável, tendo em conta a complexidade da avaliação solicitada.",
        "5.2. Caso a informação fornecida esteja incompleta, o prazo referido no ponto anterior só começa a contar a partir da data de receção da informação completa. O Cliente será notificado por email de qualquer necessidade de informação adicional ou de atraso previsível.",
        "5.3. Este prazo aplica-se a qualquer Cliente ou destinatário, independentemente da sua localização geográfica, dado tratar-se de um serviço prestado inteiramente à distância e por via eletrónica.",
      ],
    },
    {
      title: "Direito de Livre Resolução",
      paragraphs: [
        "6.1. Nos termos do artigo 10.º do Decreto-Lei n.º 24/2014, de 14 de fevereiro, o Cliente que atue como consumidor dispõe de um prazo de 14 dias seguidos, a contar da data de celebração do contrato, para resolver livremente o contrato, sem necessidade de indicar o motivo e sem incorrer em quaisquer custos, para além dos previstos nos artigos 12.º a 15.º do referido diploma.",
        "6.2. Início da prestação do Serviço antes do fim do prazo de livre resolução: caso o Cliente solicite expressamente, através de declaração inequívoca, que a execução do Serviço se inicie antes de decorrido o prazo de 14 dias, aplica-se o disposto no artigo 13.º, n.º 2, do Decreto-Lei n.º 24/2014:",
        "a) Se o Serviço for integralmente executado dentro do prazo de livre resolução, mediante pedido expresso do Cliente nesse sentido, o Cliente perde o direito de livre resolução assim que o Serviço esteja concluído;",
        "b) Se o Cliente resolver o contrato antes da conclusão do Serviço, mas depois de este ter tido início a seu pedido expresso, deve pagar um montante proporcional à parte do Serviço já prestada até ao momento em que informou a Lealia Advisory Partners do exercício do direito de resolução.",
        "6.3. Ao contratar o Serviço com início imediato, o Cliente é convidado a confirmar expressamente, no processo de encomenda, que solicita o início da execução antes do termo do prazo de livre resolução e que compreende as consequências descritas no ponto 6.2.",
        "6.4. Para exercer o direito de livre resolução, o Cliente deve comunicar a sua decisão através de uma declaração inequívoca, enviada através do formulário de contacto disponível no site, podendo utilizar o modelo de formulário de livre resolução previsto no Anexo do Decreto-Lei n.º 24/2014.",
        "6.5. Este direito não se aplica a Clientes que contratem o Serviço no âmbito da sua atividade profissional ou empresarial (B2B), aos quais não é aplicável o regime de proteção do consumidor previsto no Decreto-Lei n.º 24/2014.",
      ],
    },
    {
      title: "Confidencialidade",
      paragraphs: [
        "A Lealia Advisory Partners, Lda. compromete-se a tratar de forma confidencial toda a informação e documentação relativa à empresa objeto de avaliação, não a divulgando a terceiros sem consentimento do Cliente, exceto quando exigido por lei ou autoridade competente.",
      ],
    },
    {
      title: "Limitação de Responsabilidade",
      paragraphs: [
        "8.1. O relatório de avaliação constitui uma opinião técnica sobre o valor da empresa, elaborada com base na informação e documentação fornecidas pelo Cliente e em pressupostos e metodologias identificados no próprio relatório.",
        "8.2. O relatório não constitui garantia de valor de transação, auditoria, due diligence, parecer jurídico, fiscal ou contabilístico, nem substitui aconselhamento profissional especializado nessas áreas.",
        "8.3. A Lealia Advisory Partners não se responsabiliza por decisões tomadas com base no relatório, nem por inexatidões decorrentes de informação incompleta, incorreta ou não atualizada fornecida pelo Cliente.",
      ],
    },
    {
      title: "Propriedade Intelectual",
      paragraphs: [
        "O relatório entregue destina-se ao uso exclusivo do Cliente para os fins identificados no momento da contratação, não podendo ser reproduzido, distribuído ou utilizado para outros fins sem autorização escrita da Lealia Advisory Partners, Lda., salvo acordo em contrário.",
      ],
    },
    {
      title: "Reclamações",
      paragraphs: [
        "Em caso de reclamação, o Cliente pode contactar-nos através do formulário disponível no site, ou recorrer ao Livro de Reclamações Eletrónico (ver secção 12) e/ou às entidades RAL indicadas na secção 11.",
      ],
    },
    {
      title: "Resolução Alternativa de Litígios de Consumo (RAL)",
      paragraphs: [
        "11.1. Nos termos da Lei n.º 144/2015, de 8 de setembro, em caso de litígio de consumo que não seja resolvido diretamente entre as partes, o Cliente consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo.",
        "11.2. Face à localização da sede da Lealia Advisory Partners, Lda., a entidade territorialmente competente é:",
      ],
      details: [
        "Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL) - Rua dos Douradores, 116 – 2.º, 1100-207 Lisboa - Tel.: 218 807 030 - Email: juridico@centroarbitragemlisboa.pt - www.centroarbitragemlisboa.pt",
        "11.3. Em alternativa, ou caso não seja aplicável, pode recorrer-se ao CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de Consumo - www.cniacc.pt",
      ],
      afterDetails: [
        "11.4. Lista completa das entidades RAL disponível em: www.consumidor.gov.pt",
        "11.5. Para litígios resultantes de compras online, o Cliente pode ainda recorrer à Plataforma Europeia de Resolução de Litígios em Linha: https://ec.europa.eu/consumers/odr",
      ],
    },
    {
      title: "Livro de Reclamações",
      paragraphs: [
        "O Cliente pode aceder ao Livro de Reclamações Eletrónico através do link disponibilizado no site, ou diretamente em: www.livroreclamacoes.pt",
      ],
    },
    {
      title: "Proteção de Dados",
      paragraphs: [
        "O tratamento de dados pessoais no âmbito da contratação e prestação do Serviço rege-se pela nossa Política de Privacidade.",
      ],
      privacyLink: true,
    },
    {
      title: "Alterações aos Termos",
      paragraphs: [
        "A Lealia Advisory Partners, Lda. reserva-se o direito de atualizar estes Termos e Condições a qualquer momento, sendo a versão aplicável a que estiver em vigor no site à data da contratação do Serviço.",
      ],
    },
    {
      title: "Lei Aplicável e Foro",
      paragraphs: [
        "15.1. Os presentes Termos e Condições regem-se pela lei portuguesa.",
        "15.2. Para a resolução de qualquer litígio emergente do presente contrato que não seja resolvido por via de RAL, é competente o tribunal da comarca de Lisboa, sem prejuízo das normas legais de proteção do consumidor que atribuam competência a outro tribunal.",
      ],
    },
  ],
};

const en: TermsContent = {
  title: "Terms and Conditions",
  eyebrow: "Legal",
  lastUpdated: "Last updated: September 2026",
  sections: [
    {
      title: "Service Provider Identification",
      paragraphs: [],
      details: [
        "Lealia Advisory Partners, Lda.",
        "Tax/Company no.: 519 187 334",
        "Registered office: Calçada da Picheleira, 40, 1st Floor, 1900-371 Lisbon, Portugal",
        "Contact: geral@lealiaap.com",
      ],
    },
    {
      title: "Purpose and Description of the Service",
      paragraphs: [
        "These Terms and Conditions govern the purchase and provision, through lealiaap.com, of business valuation services (the “Service”) supplied by Lealia Advisory Partners, Lda. against online payment.",
        "The Service consists of preparing a valuation report for the company identified by the Client, based on the information and documentation supplied by the Client and using recognised financial valuation methodologies (for example, market multiples, DCF - discounted cash flows, or other methods applicable to the specific circumstances).",
      ],
    },
    {
      title: "Contracting Process",
      paragraphs: [
        "3.1. The Client selects the desired service on the website, completes the requested data and information concerning the company to be valued, and makes payment using the available methods.",
        "3.2. The contract is deemed concluded when payment is confirmed, at which time the Client receives confirmation by email.",
        "3.3. The Client is responsible for ensuring that the information and documentation supplied is true, complete and up to date. Unless otherwise stated, Lealia Advisory Partners does not independently verify the accuracy of the data supplied.",
      ],
    },
    {
      title: "Price and Payment",
      paragraphs: [
        "4.1. The price of each service is the price displayed on the website at the time of purchase and includes VAT at the statutory rate in force, where applicable.",
        "4.2. Payment is securely processed by Stripe Payments Europe, Ltd., an electronic money institution authorised and supervised by the Central Bank of Ireland, by credit/debit card and supported digital wallets (Apple Pay, Google Pay).",
        "4.3. The Service only begins after payment has been confirmed.",
        "4.4. An electronic invoice or invoice-receipt will be issued and sent to the email address supplied by the Client.",
      ],
    },
    {
      title: "Service Delivery Period",
      paragraphs: [
        "5.1. The valuation report is delivered electronically (by email and/or through the client area) within the period stated on the website for the contracted service, starting from confirmation of payment and receipt of all necessary information or documentation from the Client. Where no period is stated, Lealia Advisory Partners undertakes to deliver the report within a reasonable period, taking into account the complexity of the requested valuation.",
        "5.2. If the information supplied is incomplete, the period referred to above only begins once the complete information has been received. The Client will be notified by email of any additional information required or foreseeable delay.",
        "5.3. This period applies to every Client or recipient regardless of geographical location, as the Service is provided entirely remotely and electronically.",
      ],
    },
    {
      title: "Right of Withdrawal",
      paragraphs: [
        "6.1. Under Article 10 of Portuguese Decree-Law no. 24/2014 of 14 February, a Client acting as a consumer has 14 consecutive days from the date the contract is concluded to withdraw from it without giving a reason and without incurring costs other than those provided for in Articles 12 to 15 of that legislation.",
        "6.2. Performance of the Service before the withdrawal period ends: where the Client expressly requests, by an unequivocal statement, that performance begin before the 14-day period has elapsed, Article 13(2) of Portuguese Decree-Law no. 24/2014 applies:",
        "a) If the Service is fully performed during the withdrawal period following the Client’s express request, the Client loses the right of withdrawal once the Service has been completed;",
        "b) If the Client withdraws before the Service is completed but after performance began at the Client’s express request, the Client must pay an amount proportionate to the part of the Service provided before Lealia Advisory Partners was informed of the withdrawal.",
        "6.3. When purchasing the Service for immediate commencement, the Client is asked to expressly confirm during checkout that performance should begin before the withdrawal period ends and that the Client understands the consequences described in clause 6.2.",
        "6.4. To exercise the right of withdrawal, the Client must communicate the decision through an unequivocal statement sent via the contact form on the website and may use the model withdrawal form in the Annex to Portuguese Decree-Law no. 24/2014.",
        "6.5. This right does not apply to Clients purchasing the Service as part of their professional or business activity (B2B), to whom the consumer protection regime under Portuguese Decree-Law no. 24/2014 does not apply.",
      ],
    },
    {
      title: "Confidentiality",
      paragraphs: [
        "Lealia Advisory Partners, Lda. undertakes to treat all information and documentation concerning the company being valued as confidential and not to disclose it to third parties without the Client’s consent, except where required by law or a competent authority.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "8.1. The valuation report constitutes a technical opinion on the value of the company, prepared on the basis of the information and documentation supplied by the Client and the assumptions and methodologies identified in the report itself.",
        "8.2. The report does not constitute a guarantee of transaction value, an audit, due diligence, or a legal, tax or accounting opinion, nor does it replace specialist professional advice in those areas.",
        "8.3. Lealia Advisory Partners is not liable for decisions made on the basis of the report or for inaccuracies arising from incomplete, incorrect or outdated information supplied by the Client.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "The report is delivered for the Client’s exclusive use for the purposes identified at the time of purchase and may not be reproduced, distributed or used for other purposes without the written authorisation of Lealia Advisory Partners, Lda., unless otherwise agreed.",
      ],
    },
    {
      title: "Complaints",
      paragraphs: [
        "To make a complaint, the Client may contact us through the form available on the website, use the Electronic Complaints Book (see section 12), and/or contact the alternative consumer dispute resolution bodies identified in section 11.",
      ],
    },
    {
      title: "Alternative Consumer Dispute Resolution (ADR)",
      paragraphs: [
        "11.1. Under Portuguese Law no. 144/2015 of 8 September, where a consumer dispute cannot be resolved directly between the parties, a consumer Client may refer it to an Alternative Consumer Dispute Resolution body.",
        "11.2. Given the location of the registered office of Lealia Advisory Partners, Lda., the body with territorial jurisdiction is:",
      ],
      details: [
        "Lisbon Consumer Conflict Arbitration Centre (CACCL) - Rua dos Douradores, 116 – 2nd Floor, 1100-207 Lisbon - Tel.: 218 807 030 - Email: juridico@centroarbitragemlisboa.pt - www.centroarbitragemlisboa.pt",
        "11.3. Alternatively, or where the above is not applicable, the Client may contact CNIACC - National Centre for Consumer Conflict Information and Arbitration - www.cniacc.pt",
      ],
      afterDetails: [
        "11.4. A complete list of ADR bodies is available at: www.consumidor.gov.pt",
        "11.5. For disputes arising from online purchases, the Client may also use the European Online Dispute Resolution Platform: https://ec.europa.eu/consumers/odr",
      ],
    },
    {
      title: "Complaints Book",
      paragraphs: [
        "The Client may access the Electronic Complaints Book through the link available on the website or directly at: www.livroreclamacoes.pt",
      ],
    },
    {
      title: "Data Protection",
      paragraphs: [
        "The processing of personal data in connection with the purchase and provision of the Service is governed by our Privacy Policy.",
      ],
      privacyLink: true,
    },
    {
      title: "Changes to these Terms",
      paragraphs: [
        "Lealia Advisory Partners, Lda. reserves the right to update these Terms and Conditions at any time. The applicable version is the version in force on the website on the date the Service is purchased.",
      ],
    },
    {
      title: "Governing Law and Jurisdiction",
      paragraphs: [
        "15.1. These Terms and Conditions are governed by Portuguese law.",
        "15.2. Any dispute arising from this contract that is not resolved through ADR shall be subject to the jurisdiction of the courts of Lisbon, without prejudice to statutory consumer protection rules that confer jurisdiction on another court.",
      ],
    },
  ],
};

const es: TermsContent = {
  title: "Términos y Condiciones",
  eyebrow: "Legal",
  lastUpdated: "Última actualización: Septiembre de 2026",
  sections: [
    {
      title: "Identificación del Prestador de Servicios",
      paragraphs: [],
      details: [
        "Lealia Advisory Partners, Lda.",
        "NIF/NIPC: 519 187 334",
        "Domicilio social: Calçada da Picheleira, 40, 1.º Piso, 1900-371 Lisboa, Portugal",
        "Contacto: geral@lealiaap.com",
      ],
    },
    {
      title: "Objeto y Descripción del Servicio",
      paragraphs: [
        "Los presentes Términos y Condiciones regulan la contratación y prestación, a través del sitio web lealiaap.com, de servicios de valoración de empresas (el «Servicio»), prestados por Lealia Advisory Partners, Lda. mediante pago online.",
        "El Servicio consiste en la elaboración de un informe de valoración de la empresa indicada por el Cliente, basado en la información y documentación facilitadas por este y utilizando metodologías de valoración financiera reconocidas (por ejemplo, múltiplos de mercado, DCF - flujos de caja descontados, u otras aplicables al caso concreto).",
      ],
    },
    {
      title: "Proceso de Contratación",
      paragraphs: [
        "3.1. El Cliente selecciona el servicio deseado en el sitio web, completa los datos y la información solicitada sobre la empresa que se valorará y realiza el pago mediante los métodos disponibles.",
        "3.2. El contrato se considera celebrado en el momento de la confirmación del pago, cuando el Cliente recibe una confirmación por email.",
        "3.3. El Cliente es responsable de garantizar que la información y documentación facilitadas sean veraces, completas y estén actualizadas. Salvo indicación en contrario, Lealia Advisory Partners no verifica de forma independiente la veracidad de los datos facilitados.",
      ],
    },
    {
      title: "Precio y Pago",
      paragraphs: [
        "4.1. Los precios de cada servicio son los mostrados en el sitio web en el momento de la contratación e incluyen el IVA al tipo legal vigente, cuando sea aplicable.",
        "4.2. El pago es procesado de forma segura por Stripe Payments Europe, Ltd., entidad de dinero electrónico autorizada y supervisada por el Banco Central de Irlanda, mediante tarjeta de crédito/débito y carteras digitales compatibles (Apple Pay, Google Pay).",
        "4.3. El Servicio solo se inicia tras la confirmación del pago.",
        "4.4. Se emitirá una factura o factura-recibo electrónica, que se enviará al email indicado por el Cliente.",
      ],
    },
    {
      title: "Plazo de Entrega del Servicio",
      paragraphs: [
        "5.1. El informe de valoración se entrega por vía electrónica (email y/o área de cliente), dentro del plazo indicado en el sitio web para el servicio contratado, contado desde la confirmación del pago y la recepción de toda la información o documentación necesaria facilitada por el Cliente. Si no se indica un plazo, Lealia Advisory Partners se compromete a entregar el informe en un plazo razonable, teniendo en cuenta la complejidad de la valoración solicitada.",
        "5.2. Si la información facilitada está incompleta, el plazo anterior solo comienza a contar desde la recepción de la información completa. El Cliente será notificado por email de cualquier necesidad de información adicional o retraso previsible.",
        "5.3. Este plazo se aplica a cualquier Cliente o destinatario, con independencia de su ubicación geográfica, dado que el Servicio se presta íntegramente a distancia y por vía electrónica.",
      ],
    },
    {
      title: "Derecho de Desistimiento",
      paragraphs: [
        "6.1. De conformidad con el artículo 10 del Decreto-Ley portugués n.º 24/2014, de 14 de febrero, el Cliente que actúe como consumidor dispone de 14 días naturales desde la celebración del contrato para desistir libremente del mismo, sin necesidad de indicar el motivo y sin incurrir en costes distintos de los previstos en los artículos 12 a 15 de dicha norma.",
        "6.2. Inicio de la prestación del Servicio antes de finalizar el plazo de desistimiento: cuando el Cliente solicite expresamente, mediante una declaración inequívoca, que la ejecución del Servicio comience antes de que transcurra el plazo de 14 días, será aplicable el artículo 13.2 del Decreto-Ley portugués n.º 24/2014:",
        "a) Si el Servicio se ejecuta íntegramente dentro del plazo de desistimiento tras la solicitud expresa del Cliente, este pierde el derecho de desistimiento una vez finalizado el Servicio;",
        "b) Si el Cliente desiste antes de finalizar el Servicio, pero después de que este haya comenzado a petición expresa suya, deberá abonar un importe proporcional a la parte del Servicio ya prestada hasta el momento en que informó a Lealia Advisory Partners del ejercicio de su derecho.",
        "6.3. Al contratar el Servicio con inicio inmediato, se solicita al Cliente que confirme expresamente durante el proceso de compra que desea que la ejecución comience antes de finalizar el plazo de desistimiento y que comprende las consecuencias descritas en el punto 6.2.",
        "6.4. Para ejercer el derecho de desistimiento, el Cliente deberá comunicar su decisión mediante una declaración inequívoca enviada a través del formulario de contacto del sitio web, pudiendo utilizar el formulario modelo incluido en el Anexo del Decreto-Ley portugués n.º 24/2014.",
        "6.5. Este derecho no se aplica a los Clientes que contraten el Servicio en el marco de su actividad profesional o empresarial (B2B), a quienes no resulta aplicable el régimen de protección de los consumidores previsto en el Decreto-Ley portugués n.º 24/2014.",
      ],
    },
    {
      title: "Confidencialidad",
      paragraphs: [
        "Lealia Advisory Partners, Lda. se compromete a tratar de forma confidencial toda la información y documentación relativa a la empresa objeto de valoración y a no divulgarla a terceros sin el consentimiento del Cliente, salvo cuando lo exijan la ley o una autoridad competente.",
      ],
    },
    {
      title: "Limitación de Responsabilidad",
      paragraphs: [
        "8.1. El informe de valoración constituye una opinión técnica sobre el valor de la empresa, elaborada a partir de la información y documentación facilitadas por el Cliente y de los supuestos y metodologías identificados en el propio informe.",
        "8.2. El informe no constituye una garantía del valor de una transacción, una auditoría, una due diligence ni un dictamen jurídico, fiscal o contable, y tampoco sustituye el asesoramiento profesional especializado en dichas áreas.",
        "8.3. Lealia Advisory Partners no se responsabiliza de las decisiones adoptadas sobre la base del informe ni de las inexactitudes derivadas de información incompleta, incorrecta o desactualizada facilitada por el Cliente.",
      ],
    },
    {
      title: "Propiedad Intelectual",
      paragraphs: [
        "El informe entregado se destina al uso exclusivo del Cliente para los fines identificados en el momento de la contratación y no podrá reproducirse, distribuirse ni utilizarse para otros fines sin la autorización escrita de Lealia Advisory Partners, Lda., salvo acuerdo en contrario.",
      ],
    },
    {
      title: "Reclamaciones",
      paragraphs: [
        "En caso de reclamación, el Cliente puede ponerse en contacto con nosotros a través del formulario disponible en el sitio web, recurrir al Libro de Reclamaciones Electrónico (véase la sección 12) y/o a las entidades de resolución alternativa de litigios indicadas en la sección 11.",
      ],
    },
    {
      title: "Resolución Alternativa de Litigios de Consumo (RAL)",
      paragraphs: [
        "11.1. De conformidad con la Ley portuguesa n.º 144/2015, de 8 de septiembre, cuando un litigio de consumo no pueda resolverse directamente entre las partes, el Cliente consumidor podrá recurrir a una Entidad de Resolución Alternativa de Litigios de Consumo.",
        "11.2. Dada la ubicación del domicilio social de Lealia Advisory Partners, Lda., la entidad territorialmente competente es:",
      ],
      details: [
        "Centro de Arbitraje de Conflictos de Consumo de Lisboa (CACCL) - Rua dos Douradores, 116 – 2.º, 1100-207 Lisboa - Tel.: 218 807 030 - Email: juridico@centroarbitragemlisboa.pt - www.centroarbitragemlisboa.pt",
        "11.3. Como alternativa, o cuando la anterior no resulte aplicable, podrá recurrirse al CNIACC - Centro Nacional de Información y Arbitraje de Conflictos de Consumo - www.cniacc.pt",
      ],
      afterDetails: [
        "11.4. La lista completa de entidades RAL está disponible en: www.consumidor.gov.pt",
        "11.5. Para litigios derivados de compras online, el Cliente también puede recurrir a la Plataforma Europea de Resolución de Litigios en Línea: https://ec.europa.eu/consumers/odr",
      ],
    },
    {
      title: "Libro de Reclamaciones",
      paragraphs: [
        "El Cliente puede acceder al Libro de Reclamaciones Electrónico mediante el enlace disponible en el sitio web o directamente en: www.livroreclamacoes.pt",
      ],
    },
    {
      title: "Protección de Datos",
      paragraphs: [
        "El tratamiento de datos personales en el marco de la contratación y prestación del Servicio se rige por nuestra Política de Privacidad.",
      ],
      privacyLink: true,
    },
    {
      title: "Modificaciones de los Términos",
      paragraphs: [
        "Lealia Advisory Partners, Lda. se reserva el derecho de actualizar estos Términos y Condiciones en cualquier momento. La versión aplicable será la que esté vigente en el sitio web en la fecha de contratación del Servicio.",
      ],
    },
    {
      title: "Ley Aplicable y Jurisdicción",
      paragraphs: [
        "15.1. Los presentes Términos y Condiciones se rigen por la legislación portuguesa.",
        "15.2. Para resolver cualquier litigio derivado del presente contrato que no se resuelva mediante RAL serán competentes los tribunales de Lisboa, sin perjuicio de las normas legales de protección de los consumidores que atribuyan competencia a otro tribunal.",
      ],
    },
  ],
};

export const termsContent: Record<Language, TermsContent> = { pt, en, es };

// Dicionário ES do relatório. A forma é imposta por `pt`.
import type { pt } from "./pt.ts";

export const es: typeof pt = {
  common: {
    naoIndicado: "No indicado",
    nao: "No",
    neutro: "Neutro",
    positivo: "Positivo",
    negativo: "Negativo",
    naoAplicavel: "n.d.",
    tracoLongo: "—",
  },

  perfil: {
    atividadePrincipal: "Actividad principal",
    setor: "Sector",
    geografia: "Geografía",
    unidadesLocalizacoes: "Unidades / ubicaciones",
    anosAtividade: "Años de actividad",
    anosAtividadeValor: (n: number) => `${n} años`,
    colaboradores: "Empleados",
    anoReferencia: "Año de referencia",
    periodoReferencia: "Periodo de referencia",
  },

  ponte: {
    enterpriseValueBase: "Enterprise Value base",
    maisCaixa: "Más: caja, depósitos y otros equivalentes",
    menosDivida: "Menos: deuda total",
    maisImovel: "Más: inmueble dentro del perímetro",
    equityValueBase: "Equity Value base",
  },

  historico: {
    umAno: "Se facilitó un año de histórico financiero.",
    variosAnos: (n: number) => `Se facilitaron ${n} años de histórico financiero.`,
  },

  imovel: {
    propriedadeIncluida: "Propiedad de la empresa · incluido en el perímetro",
    propriedadeExcluida: "Propiedad de la empresa · fuera del perímetro",
    arrendadoTerceiros: "Arrendado a terceros",
    incluidoPerimetro: "Incluido en el perímetro",
    excluidoPerimetro: "Excluido del perímetro",
    arrendado: "Arrendado",
  },

  drivers: {
    crescimentoSustentado: {
      driver: "Crecimiento sostenido",
      descricao:
        "La facturación evolucionó positivamente en el periodo analizado. Las trayectorias de crecimiento demostradas respaldan la parte alta del rango de múltiplos y reducen el peso relativo del riesgo de ejecución en la negociación.",
    },
    dimensaoRelevante: {
      driver: "Dimensión relevante",
      descricao: (fat1: string, ebitda: string) =>
        `Con una facturación de ${fat1} y un EBITDA normalizado de ${ebitda}, la empresa se sitúa por encima del umbral de tamaño a partir del cual inversores institucionales y compradores estratégicos internacionales compiten activamente, ampliando el universo de contrapartes.`,
    },
    rendibilidadeAcimaMedia: {
      driver: "Rentabilidad superior a la media",
      descricao: (margem: string) =>
        `El margen EBITDA normalizado del ${margem} evidencia poder de fijación de precios y disciplina de costes, atributos que los compradores retribuyen con múltiplos superiores a la referencia sectorial.`,
    },
    conversaoCaixa: {
      driver: "Fuerte conversión de EBITDA en caja",
      descricao: (capexRacio: string) =>
        `El capex recurrente representa solo el ${capexRacio} del EBITDA normalizado. Un modelo poco intensivo en inversión libera caja para el servicio de la deuda de adquisición, un factor determinante para los compradores financieros.`,
    },
    gestaoAutonoma: {
      driver: "Gestión autónoma del accionista",
      descricao:
        "La operación funciona con baja dependencia del accionista en la gestión diaria. La existencia de una segunda línea capaz de garantizar la continuidad reduce el riesgo de transición y acorta los periodos de permanencia exigidos por el comprador.",
    },
    relacoesTransferiveis: {
      driver: "Relaciones comerciales transferibles",
      descricao:
        "La facturación no depende de forma material de la relación personal del accionista con los clientes, lo que reduce la probabilidad de erosión de ingresos tras el cierre y limita la necesidad de earn-outs o garantías adicionales.",
    },
    carteiraDiversificada: {
      driver: "Cartera de clientes diversificada",
      descricaoTop5: (top5: number) => `Los cinco mayores clientes representan el ${top5}% de la facturación`,
      descricaoTop1: (top1: number) => `El mayor cliente representa el ${top1}% de la facturación`,
      descricaoFim:
        ", un nivel de concentración cómodo que reduce el riesgo comercial percibido y disminuye la presión sobre el paquete de garantías.",
    },
    visibilidadeReceita: {
      driver: "Visibilidad de ingresos contratados",
      descricao: (backlog: string, racio: string) =>
        `El backlog contratado de ${backlog} equivale al ${racio} de la facturación anual, aportando previsibilidad al plan de negocio presentado al comprador.`,
    },
    modeloReplicavel: {
      driver: "Modelo replicable en varias unidades",
      descricao: (unidades: string) =>
        `La operación en ${unidades} demuestra que el modelo de negocio es replicable y no depende de un único activo o equipo, lo que respalda tesis de consolidación y de expansión tras la adquisición.`,
    },
    exposicaoInternacional: {
      driver: "Exposición internacional",
      descricao: (geografia: string) =>
        `La distribución de clientes (${geografia}) reduce la dependencia de un único mercado y hace a la empresa relevante para compradores extranjeros que buscan presencia en la región.`,
    },
    posicaoLiquida: {
      driver: "Posición de caja neta",
      descricao: (valor: string) =>
        `La empresa presenta una posición de caja neta positiva de ${valor}, lo que se suma directamente al Equity Value y refuerza la capacidad negociadora del accionista respecto al mecanismo de precio.`,
    },
    trackRecord: {
      driver: "Trayectoria consolidada",
      descricao: (anos: number) =>
        `${anos} años de actividad respaldan la lectura de resiliencia del modelo de negocio a lo largo de distintos ciclos y reducen el riesgo operativo percibido por el comprador.`,
    },
    imovelValorizado: {
      driver: "Activo inmobiliario valorado externamente",
      descricao: (metodo: string, valor: string) =>
        `El inmueble propio incluido en el perímetro está respaldado por ${metodo} (${valor}), lo que se suma al Equity Value con un valor defendible en la due diligence.`,
    },
  },

  recomendacoes: {
    reforcarGestao:
      "Reforzar el equipo directivo y documentar los procesos y las relaciones comerciales, reduciendo la dependencia del accionista.",
    diversificarClientes: "Diversificar la base de clientes y formalizar contratos plurianuales con los principales clientes.",
    avaliarReplicabilidade: "Evaluar la replicabilidad del modelo en otras ubicaciones, demostrando el potencial de escala al inversor.",
    documentarCapex: "Documentar las necesidades de inversión, distinguiendo el capex de mantenimiento del capex de expansión.",
    prepararHistorico: "Preparar el histórico financiero de los últimos tres ejercicios y la documentación de soporte correspondiente.",
    definirImovel: "Definir con antelación si el inmueble debe integrar el perímetro de la transacción y obtener una valoración independiente.",
    validarMargem: "Validar el margen EBITDA y la clasificación de las partidas consideradas extraordinarias.",
    explicarContracao: "Preparar una explicación fundamentada de la contracción de la facturación y del plan de recuperación.",
    validarComLealia: "Validar esta valoración indicativa con el equipo de Lealia Advisory Partners antes de tomar cualquier decisión de mercado.",
  },

  resumo: {
    comResultado: (params: {
      equityMin: string;
      equityMax: string;
      evMin: string;
      evMax: string;
      ebitdaBase: string;
      multMin: string;
      multMax: string;
      ano: number;
      tipoPeriodo: string;
      fat1: string;
      margem: string | null;
    }) =>
      `Con base en los datos facilitados, se estima un <strong>valor indicativo para los accionistas de entre ${params.equityMin} y ${params.equityMax}</strong>. ` +
      `El rango resulta de un Enterprise Value de entre ${params.evMin} y ${params.evMax}, ` +
      `calculado sobre un EBITDA normalizado de ${params.ebitdaBase} ` +
      `y un múltiplo EV/EBITDA implícito ajustado de ${params.multMin}–${params.multMax}. ` +
      `En ${params.ano} (${params.tipoPeriodo}), la empresa presentó una facturación de ${params.fat1}` +
      `${params.margem !== null ? ` y un margen EBITDA del ${params.margem}` : ""}.`,
    semResultado:
      "Con los datos indicados no es posible presentar un valor indicativo mediante múltiplo de EBITDA. Este informe presenta, no obstante, el perfil operativo de la empresa y las principales recomendaciones aplicables.",
  },

  mensagemAcionista: {
    historicoLimitado:
      "La principal oportunidad de preservación de valor antes de una transacción reside en consolidar tres ejercicios financieros conciliados y documentar los ajustes al EBITDA, reduciendo las lagunas de información que habitualmente generan descuentos en la due diligence.",
    dependenciaAlta:
      "La principal oportunidad de creación de valor reside en reducir la dependencia del accionista, mediante el refuerzo del equipo directivo y la formalización de las relaciones comerciales a nombre de la empresa, aumentando la transferibilidad del negocio.",
    concentracaoAlta:
      "La principal oportunidad de creación de valor reside en diversificar la cartera de clientes y formalizar contractualmente las cuentas más relevantes, reduciendo el riesgo comercial percibido por el comprador.",
    padrao:
      "La principal oportunidad de creación de valor reside en validar la calidad de los resultados, documentar los ajustes al EBITDA y reducir las lagunas de información que podrían generar descuentos en la due diligence.",
  },

  riscos: {
    historicoLimitado: {
      risco: "Histórico financiero limitado",
      evidenciaUm: "1 ejercicio facilitado",
      evidenciaVarios: (n: number) => `${n} ejercicios facilitados`,
      impacto: "Reduce la confianza en la sostenibilidad de los resultados y puede condicionar el múltiplo",
      mitigante: "Preparar y conciliar la información financiera de los últimos tres ejercicios",
    },
    dependenciaGestao: {
      risco: "Dependencia de la gestión del accionista",
      evidencia: (dep: string) => `Dependencia del accionista en la gestión: ${dep}`,
      impacto: "Aumenta el riesgo de transición y de continuidad operativa tras la transacción",
      mitigante: "Reforzar el equipo directivo y documentar los procesos clave",
    },
    concentracaoClientes: {
      risco: "Concentración de clientes",
      evidencia: (top5: number) => `Cinco mayores clientes: ${top5}% de la facturación`,
      impacto: "Aumenta la exposición a la pérdida de clientes relevantes",
      mitigante: "Diversificar la cartera comercial y formalizar contratos plurianuales",
    },
    dependenciaComercial: {
      risco: "Dependencia comercial del accionista",
      evidencia: (dep: string) => `Dependencia del accionista en la facturación: ${dep}`,
      impacto: "Reduce la transferibilidad de las relaciones comerciales tras la transacción",
      mitigante: "Transferir las cuentas clave a gestores de cuenta y contratar a nombre de la empresa",
    },
    localizacaoUnica: {
      risco: "Operación en una única ubicación",
      evidencia: "Actividad concentrada en una única sede",
      impacto: "Limita la escalabilidad y concentra el riesgo operativo y geográfico",
      mitigante: "Evaluar la replicabilidad del modelo y los planes de expansión a nuevas ubicaciones",
    },
    posicaoLiquidaElevada: {
      risco: "Posición neta elevada",
      evidencia: (racio: string) => `Posición neta equivalente a ${racio} el EBITDA normalizado`,
      evidenciaSemDados: "Posición neta equivalente a — el EBITDA normalizado",
      impacto: "Reduce el Equity Value y puede limitar la financiación de la adquisición",
      mitigante: "Reducir la deuda, optimizar la caja y preparar un estado financiero actualizado",
    },
    capexElevado: {
      risco: "Capex elevado",
      evidencia: (capex: string) => `Capex recurrente de ${capex} frente al EBITDA normalizado`,
      impacto: "Limita la conversión de EBITDA en generación de caja",
      mitigante: "Separar el capex de mantenimiento del de crecimiento y validar las necesidades futuras",
    },
    imovelSemAvaliacao: {
      risco: "Inmueble propio sin valoración independiente",
      evidencia: (metodo: string) => `Método de valoración indicado: ${metodo}`,
      impacto: "Introduce incertidumbre en el Equity Value cuando el inmueble integra el perímetro",
      mitigante: "Obtener una valoración independiente y definir el perímetro de la transacción",
    },
    ajustamentosPorValidar: {
      risco: "Ajustes al EBITDA pendientes de validar",
      evidencia: (valor: string) => `Ajustes de ${valor} declarados sin soporte documental`,
      impacto: "Puede generar descuentos o ajustes durante la due diligence",
      mitigante: "Preparar la conciliación contable y la documentación de soporte",
    },
    contracaoFaturacao: {
      risco: "Contracción de la facturación",
      evidencia: "Evolución negativa de la facturación en el periodo indicado",
      impacto: "Puede condicionar el múltiplo aplicable y la lectura de sostenibilidad",
      mitigante: "Documentar las causas y evidenciar la inflexión mediante indicadores recientes",
    },
    niveis: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
  },

  plano: {
    consolidarHistorico: "Consolidar tres ejercicios de información financiera conciliada",
    reconciliarEbitda: "Conciliar el EBITDA reportado y normalizado y documentar los ajustes",
    confirmarDivida: "Confirmar la deuda total y la caja, depósitos y otros equivalentes disponibles en la fecha de referencia",
    analisarFundoManeio: "Analizar el fondo de maniobra normativo y la estacionalidad del negocio",
    reduzirDependencia: "Reducir la dependencia del accionista y crear un plan de sucesión",
    mapearConcentracao: "Mapear la concentración de clientes y formalizar los contratos relevantes",
    separarCapex: "Separar el capex de mantenimiento del de crecimiento",
    definirImovel: "Definir el tratamiento del inmueble y obtener una valoración independiente",
    demonstrarReplicabilidade: "Demostrar la replicabilidad del modelo en otras ubicaciones",
    definirEstrutura: "Definir la estructura de la transacción y el perímetro pretendido",
    prioridade: { alta: "Alta", media: "Media" },
    impacto: { alto: "Alto", muitoAlto: "Muy alto", medioAlto: "Medio/alto", medio: "Medio" },
    esforco: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
    prazo: {
      semanas2a6: "2-6 semanas",
      semanas1a3: "1-3 semanas",
      semanas1a2: "1-2 semanas",
      semanas2a4: "2-4 semanas",
      meses3a12: "3-12 meses",
      semanas4a8: "4-8 semanas",
      meses6a12: "6-12 meses",
    },
  },

  implicacoesParticipacao: {
    minoritaria:
      "En una participación minoritaria no existe prima de control y el inversor valora sobre todo la gobernanza, los derechos de salida y el plan de crecimiento. Es frecuente que el valor por acción refleje un descuento de minoría.",
    maioritaria:
      "En una venta mayoritaria el comprador asume el control y tiende a incorporar una prima de control, exigiendo a cambio continuidad de la gestión y mecanismos de alineación como un earn-out o un rollover de parte del capital.",
    totalidade:
      "En la venta de la totalidad el comprador suele pagar una prima de control, pero exige un periodo de transición, garantías de continuidad de los clientes y un paquete más amplio de manifestaciones y garantías.",
    indefinida:
      "El porcentaje a transmitir aún no está definido. Esta decisión condiciona el universo de inversores, la existencia de una prima de control y la estructura de pago.",
  },

  limitacoes: {
    infoDeclarada: "La estimación se basa exclusivamente en la información declarada, sin verificación documental ni auditoría.",
    fundoManeio: "No se realizó un análisis del fondo de maniobra normativo ni de la estacionalidad del negocio.",
    transacoesComparaveis: "No se analizaron transacciones comparables específicas ni el apetito actual de los inversores por el activo.",
    historicoInferior: "El histórico financiero disponible es inferior a tres ejercicios.",
    setorGenerico: "El sector indicado no dispone de múltiplos específicos; se utilizó una referencia de mercado genérica.",
    periodoNaoEncerrado: "El periodo de referencia no corresponde a cuentas cerradas, lo que aumenta la incertidumbre de la estimación.",
  },

  qualidade: {
    notaUmAno:
      "Con un único periodo financiero no es posible evaluar con solidez el crecimiento, la estabilidad de los márgenes, la conversión de resultados en caja ni la sostenibilidad del EBITDA. Esta limitación reduce la confianza de la valoración y puede condicionar el múltiplo aplicable.",
    margensEstaveis: "Los márgenes EBITDA se mantuvieron estables en el periodo analizado, lo que respalda la lectura de recurrencia de los resultados.",
    margensModeradas: "Los márgenes EBITDA presentan una variación moderada en el periodo analizado, lo que justifica validar los factores que explican la oscilación.",
    margensRelevantes: "Los márgenes EBITDA presentan una variación relevante en el periodo analizado, lo que exige una explicación documentada en la due diligence.",
    conversaoCaixaComCapex: (capex: string, pct: string) =>
      `Tras un capex recurrente de ${capex}, la conversión indicativa de EBITDA en caja operativa es del ${pct}, antes de fondo de maniobra, intereses e impuestos. Limitación: sin la desagregación entre capex de mantenimiento y de crecimiento, el flujo de caja libre subyacente a la valoración queda sujeto a corrección en la due diligence.`,
    conversaoCaixaSemCapex:
      "No se indicó capex recurrente. Limitación: sin este dato no es posible estimar la conversión de EBITDA en caja, lo que reduce la fiabilidad del valor calculado y suele traducirse en un descuento por parte del comprador.",
    fundoManeio:
      "El fondo de maniobra no ha sido analizado en esta fase. Limitación: sin la normalización del fondo de maniobra no es posible fijar con precisión el puente entre el Enterprise Value y el Equity Value, lo que puede originar ajustes de cierre euro a euro en el precio final.",
    backlog: (valor: string) =>
      `Se indicó un backlog contratado de ${valor}. Limitación: sin el detalle de los márgenes, los plazos de ejecución y las condiciones de cancelación, la visibilidad de ingresos no se incorporó cuantitativamente a la valoración, solo se consideró de forma cualitativa.`,
    concentracaoTop5: (top5: number) => `Concentración comercial: los cinco mayores clientes representan el ${top5}% de la facturación`,
    concentracaoTop1: (top1: number) => ` y el mayor cliente el ${top1}%`,
    concentracaoFim: ". Limitación: la dependencia de pocos clientes aumenta el riesgo percibido de los ingresos y condiciona directamente el múltiplo aplicable en la valoración.",
    ajustamentosDeclarados: (valor: string) =>
      `Se declararon ajustes no recurrentes de ${valor}. Limitación: hasta que se validen documentalmente, el EBITDA ajustado —y, en consecuencia, el rango de valoración presentado— queda sujeto a revisión.`,
    ajustamentosNaoDeclarados:
      "No se declararon ajustes no recurrentes al EBITDA. Limitación: cualquier normalización identificada en la due diligence (remuneraciones de socios, rentas fuera de mercado, ingresos no recurrentes) podría modificar el EBITDA base y el valor calculado.",
  },

  alertas: {
    umPeriodo: "Solo se facilitó un periodo financiero. El análisis de crecimiento y de estabilidad de los márgenes no es concluyente.",
    ajustamentosSemSuporte: 'Existen ajustes al EBITDA sin soporte documental. Deben clasificarse como "a validar en due diligence".',
    fundoManeioNaoAnalisado: "No se ha analizado el fondo de maniobra. El Equity Value podría verse afectado por ajustes de cierre.",
    imovelSemAvaliacao: "El valor del inmueble se introdujo sin valoración independiente. El Equity Value podría sufrir una alteración material.",
    imovelSemValor: "El inmueble se incluyó en el perímetro sin valor indicado, por lo que no se sumó al Equity Value.",
    periodoNaoClassificado: "El periodo financiero de referencia no ha sido clasificado (cuentas cerradas, estimación o presupuesto).",
    concentracaoInconsistente: "El peso de los cinco mayores clientes es inferior al del mayor cliente. Los datos deben revisarse.",
    minoritariaAtencao: "El valor de una participación minoritaria no corresponde a una proporción simple del Equity Value al 100%.",
  },

  implicacoesEstrutura: {
    venda50: { estrutura: "Venta del 50%–51%", implicacao: "Exige reglas claras de gobernanza y un pacto de socios" },
    venda60: { estrutura: "Venta del 60%–80%", implicacao: "El comprador obtiene el control; puede existir un rollover relevante" },
    venda90: { estrutura: "Venta del 90%", implicacao: "La participación residual exige protección y reglas de salida" },
    venda100: { estrutura: "Venta del 100%", implicacao: "Estructura más sencilla; la continuidad de la gestión se vuelve crítica" },
  },

  notas: {
    equity: "El Equity Value presentado es indicativo y se calcula antes de los ajustes de cierre, la normalización del fondo de maniobra, las contingencias, los impuestos aplicables y la validación en la due diligence.",
    minoria: "El valor de una participación minoritaria no debe asumirse como una simple proporción del Equity Value al 100%. El valor puede variar en función del control, los derechos de gobernanza, la liquidez y la estructura de la transacción.",
  },

  engine: {
    ajustes: {
      volumeNegocios: {
        label: "Volumen de negocio",
        abaixo5M: "Facturación inferior a 5M€",
        entre5e20M: "Facturación entre 5M€ y 20M€",
        acima20M: "Facturación de 20M€ o más",
      },
      dimensaoResultados: {
        label: "Dimensión de los resultados",
        abaixo2M: "EBITDA normalizado inferior a 2M€",
        acimaIgual2M: "EBITDA normalizado de 2M€ o más",
      },
      idadeEmpresa: {
        label: "Antigüedad de la empresa",
        menos3: "Menos de 3 años",
        mais10: "Más de 10 años",
        entre3e10: "Entre 3 y 10 años",
      },
      crescimento: {
        label: "Crecimiento",
        historicoInsuficiente: "Histórico insuficiente",
        emQueda: "Facturación en descenso respecto al año más antiguo indicado",
        acumulado: (pct: string) => `Crecimiento acumulado del ${pct}%`,
        ate10: "Crecimiento acumulado de hasta el 10%",
      },
      unidades: {
        label: "Unidades / ubicaciones",
        naoIndicado: "No indicado",
        unica: "Operación concentrada en una única ubicación",
        maisDe3: "Operación multiunidad (más de 3 ubicaciones)",
        naoAplicavel: "No aplicable al modelo de negocio",
        entre2e3: "Operación en 2-3 ubicaciones",
      },
      concentracaoClientes: {
        label: "Concentración de clientes",
        naoIndicada: "No indicada",
        diversificada: "Base de clientes diversificada",
        moderada: "Concentración moderada en los 5 mayores clientes",
        forte: "Fuerte dependencia de los 5 mayores clientes",
      },
      geografia: {
        label: "Geografía de los clientes",
        naoIndicada: "No indicada",
        equilibrio: "Equilibrio nacional/internacional",
      },
      depFaturacao: {
        label: "Dependencia del accionista (facturación)",
        naoIndicada: "No indicada",
        baixa: "Cartera poco dependiente del accionista",
        alta: "Fuerte dependencia comercial del accionista",
        moderada: "Dependencia moderada del accionista",
      },
      depGestao: {
        label: "Dependencia del accionista (gestión)",
        naoIndicada: "No indicada",
        baixa: "Gestión autónoma respecto al accionista",
        alta: "Gestión fuertemente centrada en el accionista",
        moderada: "Dependencia moderada del accionista",
      },
      capex: {
        label: "Intensidad de inversión (capex)",
        naoIndicada: "No indicada",
        reduzido: "Capex recurrente reducido frente a la facturación",
        relevante: "Capex recurrente relevante frente a la facturación",
        elevado: "Capex recurrente elevado frente a la facturación",
      },
    },
    cenarios: {
      conservador: "Comprador financiero, sin prima estratégica; múltiplo en el límite inferior del rango ajustado.",
      base: "Proceso normal, información financiera preparada y continuidad operativa asegurada.",
      otimista: "Comprador estratégico con sinergias identificadas, con varios interesados y preparación previa del negocio.",
    },
    linhasEbitda: {
      reportado: (ano: number) => `EBITDA reportado ${ano}`,
      despesasExtraordinarias: "Gastos extraordinarios no recurrentes",
      rendaTeorica: "Renta teórica de mercado (inmueble propio)",
      acrescimoRenda: "Incremento de renta hasta el valor de mercado",
      normalizado: "EBITDA normalizado",
    },
    dimensoes: {
      historicoFinanceiro: "Histórico financiero",
      qualidadeEbitda: "Calidad del EBITDA",
      posicaoFinanceira: "Posición financiera",
      enquadramentoSetorial: "Encuadre sectorial",
      perfilRisco: "Perfil de riesgo",
    },
    itensConfianca: {
      faturacaoAnoReferencia: "Facturación del año de referencia",
      faturacaoAnoAnterior: "Facturación del año anterior",
      faturacaoTresAnos: "Facturación de hace tres años",
      ebitdaAnoAnterior: "EBITDA del año anterior",
      ebitdaTresAnos: "EBITDA de hace tres años",
      tipoPeriodoReferencia: "Tipo de periodo de referencia",
      despesasExtraordinariasIdentificadas: "Gastos extraordinarios identificados",
      enquadramentoImovel: "Encuadre del inmueble de la operación",
      capexAnualRecorrente: "Capex anual recurrente",
      caixaDepositos: "Caja y depósitos",
      dividaFinanceira: "Deuda financiera",
      industriaIdentificada: "Industria identificada",
      subindustriaIdentificada: "Subindustria identificada",
      atividadePrincipalDescrita: "Actividad principal descrita",
      concentracaoTop5: "Concentración de los 5 mayores clientes",
      pesoMaiorCliente: "Peso del mayor cliente",
      unidadesLocalizacoes: "Unidades / ubicaciones",
      geografiaClientes: "Geografía de los clientes",
      depFaturacao: "Dependencia del accionista (facturación)",
      depGestao: "Dependencia del accionista (gestión)",
    },
    confExplicacao: {
      baixa: "Confianza baja — la estimación se calculó con información limitada.",
      media: "Confianza media — existe información relevante, pero algunos datos adicionales podrían mejorar el análisis.",
      alta: "Confianza alta — la información facilitada cubre las dimensiones críticas de una valoración preliminar.",
    },
  },

  doc: {
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración de este documento.",
    footer: (empresa: string) => `Lealia Advisory Partners · Informe de valoración indicativa${empresa ? ` para ${empresa}` : ""}`,
    efeito: { neutro: "Neutro", positivo: "Positivo", negativo: "Negativo" },

    waterfall: {
      caption: "Equity Bridge · miles de €",
      ariaLabel: "Gráfico waterfall del Equity Bridge",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      divida: "Deuda",
      caixa: "Caja",
      imovel: "Inmueble",
    },

    dcf: {
      titulo: "DCF Valuation",
      hTitulo: "Valoración por flujos de caja descontados",
      semDados: "No es posible presentar un análisis DCF con la información facilitada. En particular, el coste de capital estimado debe ser superior a la tasa de crecimiento a perpetuidad.",
      mapaFluxos: "Mapa de flujos de caja",
      unidadeMilhares: "miles de €",
      linha: "Línea",
      tv: "TV",
      receita: "Ingresos",
      ebitda: "EBITDA",
      margemEbitda: "Margen EBITDA",
      da: "(−) D&A",
      ebit: "= EBIT",
      impostoEbit: "(−) Impuesto s/ EBIT",
      nopat: "= NOPAT",
      maisDa: "(+) D&A",
      menosCapex: "(−) Capex",
      fcff: "= FCFF unlevered",
      fatorDesconto: "Factor de descuento",
      pvFcff: "= VP del FCFF",
      legenda: "A = ejercicio histórico · F = año proyectado · TV = valor terminal. Flujo unlevered: la financiación se refleja en el coste de capital y en la deuda neta. TV por perpetuidad sobre el FCFF del año 8.",
      pressupostosForecast: "Hipótesis del forecast",
      crescimentoInicial: "Crecimiento inicial",
      anoEstabilizacao: "Año de estabilización",
      anoN: (n: number) => `Año ${n}`,
      crescimentoEstabilizado: "Crecimiento estabilizado",
      crescimentoPerpetuidade: "Crecimiento a perpetuidad",
      margemEbitdaProjetada: "Margen EBITDA proyectado",
      capexPctReceita: "Capex (% de ingresos)",
      daPctReceita: "D&A (% de ingresos)",
      fundoManeio: "Fondo de maniobra",
      naoProjetado: "No proyectado",
      taxaImposto: "Tipo impositivo (CIT)",
      indicadoresAvaliacao: "Indicadores de valoración",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      evEbitdaImplicito: "EV / EBITDA implícito",
      evReceitaImplicito: "EV / Ingresos implícito",
      wacc: "Coste medio ponderado de capital",
      riskFree: "Tipo libre de riesgo (Rf)",
      beta: "Beta unlevered / levered (β)",
      erp: "Equity Risk Premium (ERP)",
      crp: "Country Risk Premium (CRP)",
      premioDimensao: "Prima de tamaño (pyme)",
      premioEspecifico: "Prima específica (iliquidez)",
      premioAtivoEspecifico: "Prima específica del activo",
      costOfEquity: "Cost of Equity (Ke)",
      costOfDebt: "Cost of Debt antes / después de impuestos (Kd)",
      pesoEquityDivida: "Peso de equity / deuda (E / D)",
      waccLabel: "WACC",
      resultados: "Resultados",
      pvExplicito: "VP del forecast explícito (8 años)",
      pvTerminal: "VP del valor terminal",
      pesoTerminal: "Peso del valor terminal en el EV",
      ajusteDividaLiquida: "Ajuste de deuda neta",
      imovel: "Inmueble",
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
        `Coste de capital estimado con un criterio prudente: a las referencias sectoriales se añaden primas de tamaño e iliquidez, ya que una pyme no cotizada tiene un riesgo superior al de las cotizadas del sector. Beta, ERP, CRP, estructura de capital y spread son proxies sectoriales; CIT de ${pais} (${citNota})${extra ? ` ${extra}` : ""}`,
    },

    sensitivity: {
      titulo: "Análisis de sensibilidad",
      hTitulo: "Análisis de sensibilidad",
      semDados: "No hay un análisis DCF disponible, por lo que no es posible presentar las matrices de sensibilidad.",
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
      notaMatriz: "La celda destacada corresponde al escenario base presentado en la diapositiva anterior. Las matrices aíslan el efecto de cada variable, manteniendo constantes las demás hipótesis.",
      transparenciaPressupostos: "Transparencia de hipótesis",
      introTransparencia: "Las hipótesis del modelo combinan la información introducida en el formulario con referencias sectoriales de mercado, siguiendo un criterio conservador: en caso de duda, se adopta el valor que resulta en una valoración más prudente. La siguiente tabla recoge las hipótesis estructurales de la valoración y su fuente o método de obtención.",
      parametro: "Parámetro",
      valor: "Valor",
      metodoFonte: "Método / fuente",
    },

    lockedPages: {
      p4: "Alcance y limitaciones",
      p5: "Método y alternativas",
      p6: "Ajustes al múltiplo",
      p7: "Escenarios y sensibilidad",
      p8: "Equity Bridge y contexto de la transacción",
      p9: "Drivers de valor y riesgos",
      p10: "DCF Valuation",
      p11: "Sensitivity Analysis",
      p12: "Preparación para el mercado",
      p13: "Proceso de M&A",
    },
    conteudoReservado: "Contenido reservado",
    lockedTexto: "Esta sección forma parte del informe completo. Agende una reunión de 20 minutos con el equipo de Lealia para ver el análisis íntegro y comentar los resultados.",
    lockedCta: "Agendar una reunión para ver el informe completo",

    cover: {
      titulo: "Valoración preliminar",
      preparadoPara: "Preparado para",
      data: "Fecha",
    },

    p2: {
      titulo: "Resumen ejecutivo",
      evIndicativo: "Enterprise Value indicativo",
      equityIndicativo: "Equity Value indicativo",
      faturacaoAno: "Facturación del año de referencia",
      ebitdaNormalizado: "EBITDA normalizado",
      margemNormalizada: "Margen EBITDA normalizado",
      multiploImplicito: "Múltiplo implícito",
      posicaoLiquida: "Posición neta",
      posicaoLiquidaHint: "caja / (deuda)",
      completudeInformacao: "Completitud de la información",
      metodologia: "Metodología de valoración",
      metodo1Titulo: "Determinación del EBITDA normalizado",
      metodo1: (ebitda: string) =>
        `EBITDA reportado en el último ejercicio de referencia, excluyendo el impacto de gastos extraordinarios no recurrentes y, si procede, considerando el impacto de una corrección teórica de la renta del inmueble al mercado. El EBITDA normalizado es de ${ebitda}.`,
      metodo2Titulo: "Múltiplo sectorial base",
      metodo2: "Definido por referencia a los múltiplos aplicados en transacciones recientes y comparables del sector y la región.",
      metodo3Titulo: "Ajustes de perfil y riesgo",
      metodo3: "Tamaño, madurez, crecimiento, recurrencia de ingresos, concentración de clientes, geografía, dependencia del accionista e intensidad de inversión, con un límite global aplicado al conjunto de los ajustes.",
      metodo4Titulo: "Equity Bridge",
      metodo4: "Al Enterprise Value se le suma la caja, los depósitos y otros equivalentes, se deduce la deuda total y, si procede, se suma el inmueble incluido en el perímetro de la transacción y el impacto pro forma en caja resultante de la enajenación de activos no operativos, obteniendo el Equity Value antes de los ajustes de cierre.",
    },

    p3: {
      titulo: "Perfil de la empresa y otros indicadores",
      perfilEmpresa: "Perfil de la empresa",
      indicador: "Indicador",
      valor: "Valor",
      historicoFinanceiro: "Histórico financiero",
      ano: "Año",
      faturacao: "Facturación",
      ebitda: "EBITDA",
      extraordinarios: "Extraordinarios",
      normalizacoes: "Normalizaciones",
      cagrFaturacao: "CAGR de la facturación",
      cagrEbitda: "CAGR del EBITDA normalizado",
      semInfoSuficiente: "Información insuficiente",
      normalizacaoEbitda: "Normalización del EBITDA",
      linha: "Línea",
      notaNormalizacao: "Los ajustes de normalización aproximan el resultado operativo recurrente en un escenario posterior a la transacción.",
      outrosIndicadores: "Otros indicadores",
      caixaDepositos: "Caja, depósitos y otros equivalentes",
      dividaTotal: "Deuda total",
      capexAnual: "Capex anual recurrente",
      unidadesLocalizacoes: "Unidades / ubicaciones",
      concentracaoMaiorCliente: "% Concentración en el mayor cliente",
      concentracaoTop5: "% Concentración en el top 5 de clientes",
      clientesAtivos: "Clientes activos",
    },

    p4: {
      titulo: "Alcance y limitaciones",
      hTitulo: "Alcance y limitaciones de este informe",
      naturezaDocumento: "Naturaleza del documento",
      natureza1: "Se trata de una valoración indicativa preliminar, elaborada exclusivamente a partir de la información facilitada por el usuario, sin verificación independiente, auditoría ni revisión de los datos.",
      natureza2: "No constituye asesoramiento financiero, fiscal, contable o jurídico, ni una recomendación de inversión o desinversión.",
      natureza3: "No constituye una valoración formal (fairness opinion) a efectos legales, fiscales, contables o regulatorios, ni una propuesta contractual u oferta vinculante.",
      natureza4: "El documento está destinado al uso exclusivo del destinatario identificado en la portada y no debe divulgarse a terceros sin autorización escrita de Lealia Advisory Partners.",
      limitacoesFatores: "Limitaciones y factores de variación",
      limitacao1: "Los valores presentados dependen de la calidad, exactitud y exhaustividad de los datos introducidos. Datos incompletos o incorrectos alteran materialmente el resultado.",
      limitacao2: "Las referencias de mercado utilizadas reflejan las condiciones vigentes en la fecha de elaboración y pueden variar rápidamente según el contexto macroeconómico, sectorial y de financiación.",
      limitacao3: "El precio efectivo de una transacción depende del perfil del comprador, de la estructura del negocio, de las garantías, de los ajustes de cierre y del proceso de negociación.",
      limitacao4: "Una valoración definitiva exige due diligence financiera, fiscal, legal y operativa, así como la validación documental de los ajustes al EBITDA.",
      semResponsabilidade: "Lealia Advisory Partners no asume responsabilidad alguna por decisiones adoptadas basándose exclusivamente en este documento.",
      leituraComplementar: "Lectura complementaria",
      leituraFinal: "El perfil de estacionalidad y la distribución mensual de la actividad no se han analizado en esta fase. Limitación: sin este análisis no es posible evaluar la recurrencia intraanual de los resultados, por lo que el valor calculado no refleja posibles picos de actividad ni necesidades estacionales de tesorería a lo largo del año.",
    },

    p5: {
      titulo: "Método y alternativas",
      porqueMultiplos: "Por qué múltiplos de EBITDA",
      par1: "La valoración por múltiplos es un enfoque de mercado: el valor de una empresa se infiere a partir de los precios pagados por inversores en transacciones recientes de empresas con un perfil comparable. En el contexto de M&A de pymes, el EBITDA se utiliza habitualmente como referencia, por reflejar la capacidad de generación de resultados operativos antes del impacto de la estructura de financiación, la política de amortizaciones y el régimen fiscal.",
      par2: "Es también el método más adecuado para una estimación preliminar: exige pocas hipótesis discrecionales, es transparente y refleja directamente el apetito actual del mercado por el sector. Su limitación es la dependencia de la calidad de los comparables y el hecho de captar la fotografía actual del negocio, y no un plan de crecimiento futuro.",
      par3: "El EV/EBITDA tiende a ser más adecuado para empresas con EBITDA positivo, operaciones relativamente estables y estructuras de costes comparables a las de las empresas utilizadas como referencia. Es menos informativo cuando la empresa presenta resultados operativos negativos o muy volátiles, cuando existen diferencias significativas de crecimiento o margen frente a los comparables, o cuando el negocio atraviesa una fase de fuerte transformación.",
      par4: "La valoración por múltiplos es, por tanto, una referencia sencilla, transparente y alineada con el mercado, especialmente útil cuando existen comparables sólidos y para respaldar una primera estimación de valor. Su principal limitación es depender de la calidad de esos comparables y no reflejar, por sí sola, el potencial futuro del negocio.",
      nota: "En una transacción real, los múltiplos son el punto de partida de la negociación y después se contrastan con un análisis de flujos de caja y con la due diligence.",
      metodosAlternativos: "Métodos alternativos",
      dcfTitulo: "DCF - flujos de caja descontados",
      dcfNota: "(ver diapositivas 10 y 11)",
      dcfDesc: "Proyecta los flujos de caja futuros y los descuenta a una tasa que refleja el coste del capital (WACC). Es el método más riguroso cuando existe un plan de negocio creíble, pero es muy sensible a las hipótesis empleadas.",
      outrosMultiplosTitulo: "Otros múltiplos de transacción",
      outrosMultiplosDesc: "Además del EV/EBITDA, pueden emplearse múltiplos como EV/Ingresos, EV/EBIT o PER, según el sector, la madurez y la rentabilidad de la empresa. Su relevancia depende de la comparabilidad de las empresas y de la calidad de la información disponible.",
      metricasSetorTitulo: "Métricas específicas del sector",
      metricasSetorDesc: "Complementa los múltiplos financieros con métricas operativas relevantes para cada negocio, como el valor por unidad, cliente, cama, suscriptor o metro cuadrado. Es particularmente útil en sectores donde estos indicadores explican de forma más directa el potencial económico de la empresa.",
      valorPatrimonialTitulo: "Valor patrimonial / liquidación",
      valorPatrimonialDesc: "Valora los activos netos a su valor de mercado. Relevante en negocios intensivos en activos, funcionando como valor mínimo de referencia.",
    },

    p6: {
      titulo: "Ajustes al múltiplo",
      hTitulo: "Ajustes aplicados al múltiplo sectorial",
      fator: "Factor",
      leitura: "Lectura",
      efeito: "Efecto",
      semAjustes: "No se aplicaron ajustes al múltiplo sectorial base.",
      nota: "El conjunto de los ajustes está limitado a un rango global de −40% a +35% sobre el múltiplo sectorial base, evitando que la combinación de factores produzca resultados extremos. Todos los factores se basan en información declarada y requieren validación documental.",
    },

    p7: {
      titulo: "Escenarios y sensibilidad",
      cenariosValorizacao: "Escenarios de valoración",
      cenario: "Escenario",
      pressupostos: "Hipótesis",
      multiplo: "Múltiplo",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      semCenarios: "No hay escenarios disponibles para los datos facilitados.",
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
      variacaoEbitda: "Variación del EBITDA",
      ebitda: "EBITDA",
      notaSensibilidade: "La tabla muestra cómo reacciona el Enterprise Value a las variaciones del EBITDA normalizado y del múltiplo aplicado. El Equity Value evoluciona en consecuencia, ajustado por la deuda total, la caja, los depósitos y otros equivalentes, y el inmueble indicado en el equity bridge.",
      semSensibilidade: "No hay análisis de sensibilidad disponible.",
    },

    p8: {
      titulo: "Equity Bridge y contexto de la transacción",
      equityBridge: "Equity Bridge",
      componente: "Componente",
      valor: "Valor",
      contextoEstrutura: "Contexto y estructura de la transacción",
      parametro: "Parámetro",
      detalhe: "Detalle",
      motivoTransacao: "Motivo de la transacción",
      pctATransacionar: "Porcentaje de capital a transmitir",
      estruturaPretendida: "Estructura pretendida",
      horizonteTemporal: "Horizonte temporal",
      permanenciaAcionista: "Permanencia del accionista",
      imovel: "Inmueble",
      tipoInvestidor: "Tipo de inversor preferente",
      estrutura: "Estructura",
      implicacao: "Implicación",
    },

    p9: {
      titulo: "Drivers de valor y riesgos",
      driversValor: "Drivers de valor",
      driver: "Driver",
      descricao: "Descripción",
      semDrivers: "No se identificaron drivers de valor específicos con base en la información facilitada.",
      riscosMitigantes: "Riesgos y mitigantes",
      risco: "Riesgo",
      evidenciaDisponivel: "Evidencia disponible",
      impacto: "Impacto",
      mitigante: "Mitigante",
      semRiscos: "No se identificaron riesgos materiales específicos con base en la información facilitada.",
    },

    p12: {
      titulo: "Preparación para el mercado",
      planoPreparacao: "Plan de preparación priorizado",
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
      prioridade: "Prioridad",
      priorityHigh: "Alta",
      priorityMedium: "Media",
      acao: "Acción",
      impactoEsperado: "Impacto esperado",
      esforco: "Esfuerzo",
      recomendacoesImediatas: "Recomendaciones inmediatas",
    },

    p13: {
      titulo: "Proceso de M&A",
      hTitulo: "Cómo se desarrolla un proceso de M&A",
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
    },

    p14: {
      titulo: "Siguiente paso y contactos",
      obrigado: "Gracias.",
      lead: "Gracias por su tiempo. Este informe es un punto de partida: convertir una estimación indicativa en una valoración fundamentada exige validar las cifras, analizar transacciones comparables recientes y conocer el apetito actual de inversores financieros y estratégicos por su sector.",
      proximoPassoTitulo: "Siguiente paso · Reunión de 20 minutos",
      proximoPassoDesc: "Revisión conjunta de las hipótesis de este informe con el equipo de Lealia y presentación del informe completo.",
      agendarReuniao: "Agendar una reunión",
      contactos: "Contactos",
      managingPartner: "Managing Partner",
      notaFinal: (empresa: string) =>
        `Documento de carácter indicativo, preparado exclusivamente para ${empresa}. No constituye asesoramiento financiero ni una propuesta contractual.`,
    },
  },
};

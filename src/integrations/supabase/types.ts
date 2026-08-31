export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      leads: {
        Row: {
          acrescimo_renda_anual: number | null
          ano_avaliacao_imovel: number | null
          ano_referencia: number | null
          atividade_principal: string | null
          backlog_contratado: number | null
          caixa_e_depositos: number | null
          calculo_possivel: boolean
          capex_anual_recorrente: number | null
          cargo: string | null
          confianca: string | null
          confianca_score: number | null
          consentimento_rgpd: boolean
          created_at: string
          dependencia_acionista_faturacao: string | null
          dependencia_acionista_gestao: string | null
          depreciacoes_amortizacoes: number | null
          despesas_extraordinarias_ano1: number | null
          despesas_extraordinarias_ano2: number | null
          despesas_extraordinarias_ano3: number | null
          divida_financeira: number | null
          divida_liquida: number | null
          ebitda_ano1: number | null
          ebitda_ano2: number | null
          ebitda_ano3: number | null
          email: string
          email_enviado: boolean
          email_erro: string | null
          email_relatorio_agendado_para: string | null
          email_relatorio_enviado_em: string | null
          empresa: string
          equity_max: number | null
          equity_min: number | null
          estrutura_transacao: string | null
          ev_max: number | null
          ev_min: number | null
          faturacao_ano1: number | null
          faturacao_ano2: number | null
          faturacao_ano3: number | null
          geografia_clientes: string | null
          horizonte_temporal: string | null
          id: string
          idade_empresa: number | null
          incluir_imovel_perimetro: string | null
          industria: string
          leasing_financeiro: number | null
          metodo_avaliacao_imovel: string | null
          motivo_interesse: string | null
          multiplo_ajustado_max: number | null
          multiplo_ajustado_min: number | null
          nome: string
          num_clientes_ativos: string | null
          num_colaboradores: string | null
          outros_debt_like: number | null
          pais: string
          pct_a_transacionar: string | null
          pct_top1_clientes: number | null
          pct_top5_clientes: number | null
          percentagem_receita_recorrente: number | null
          permanencia_pos_venda: string | null
          prazo_medio_recebimento: number | null
          proprietario_imovel: string | null
          relatorio_dados: Json | null
          relatorio_enviado_em: string | null
          relatorio_erro: string | null
          relatorio_estado: string
          relatorio_expira_em: string | null
          relatorio_gerado_em: string | null
          relatorio_pdf_admin_url: string | null
          relatorio_pdf_url: string | null
          relatorio_slug: string | null
          relatorio_token: string
          relatorio_token_admin: string
          relatorio_url: string | null
          renda_reflete_mercado: string | null
          subindustria: string | null
          suprimentos_acionistas: number | null
          telefone: string | null
          tipo_investidor: string | null
          tipo_periodo: string | null
          unidades: string | null
          valorizacao_imovel: number | null
        }
        Insert: {
          acrescimo_renda_anual?: number | null
          ano_avaliacao_imovel?: number | null
          ano_referencia?: number | null
          atividade_principal?: string | null
          backlog_contratado?: number | null
          caixa_e_depositos?: number | null
          calculo_possivel?: boolean
          capex_anual_recorrente?: number | null
          cargo?: string | null
          confianca?: string | null
          confianca_score?: number | null
          consentimento_rgpd?: boolean
          created_at?: string
          dependencia_acionista_faturacao?: string | null
          dependencia_acionista_gestao?: string | null
          depreciacoes_amortizacoes?: number | null
          despesas_extraordinarias_ano1?: number | null
          despesas_extraordinarias_ano2?: number | null
          despesas_extraordinarias_ano3?: number | null
          divida_financeira?: number | null
          divida_liquida?: number | null
          ebitda_ano1?: number | null
          ebitda_ano2?: number | null
          ebitda_ano3?: number | null
          email: string
          email_enviado?: boolean
          email_erro?: string | null
          email_relatorio_agendado_para?: string | null
          email_relatorio_enviado_em?: string | null
          empresa: string
          equity_max?: number | null
          equity_min?: number | null
          estrutura_transacao?: string | null
          ev_max?: number | null
          ev_min?: number | null
          faturacao_ano1?: number | null
          faturacao_ano2?: number | null
          faturacao_ano3?: number | null
          geografia_clientes?: string | null
          horizonte_temporal?: string | null
          id?: string
          idade_empresa?: number | null
          incluir_imovel_perimetro?: string | null
          industria: string
          leasing_financeiro?: number | null
          metodo_avaliacao_imovel?: string | null
          motivo_interesse?: string | null
          multiplo_ajustado_max?: number | null
          multiplo_ajustado_min?: number | null
          nome: string
          num_clientes_ativos?: string | null
          num_colaboradores?: string | null
          outros_debt_like?: number | null
          pais: string
          pct_a_transacionar?: string | null
          pct_top1_clientes?: number | null
          pct_top5_clientes?: number | null
          percentagem_receita_recorrente?: number | null
          permanencia_pos_venda?: string | null
          prazo_medio_recebimento?: number | null
          proprietario_imovel?: string | null
          relatorio_dados?: Json | null
          relatorio_enviado_em?: string | null
          relatorio_erro?: string | null
          relatorio_estado?: string
          relatorio_expira_em?: string | null
          relatorio_gerado_em?: string | null
          relatorio_pdf_admin_url?: string | null
          relatorio_pdf_url?: string | null
          relatorio_slug?: string | null
          relatorio_token?: string
          relatorio_token_admin?: string
          relatorio_url?: string | null
          renda_reflete_mercado?: string | null
          subindustria?: string | null
          suprimentos_acionistas?: number | null
          telefone?: string | null
          tipo_investidor?: string | null
          tipo_periodo?: string | null
          unidades?: string | null
          valorizacao_imovel?: number | null
        }
        Update: {
          acrescimo_renda_anual?: number | null
          ano_avaliacao_imovel?: number | null
          ano_referencia?: number | null
          atividade_principal?: string | null
          backlog_contratado?: number | null
          caixa_e_depositos?: number | null
          calculo_possivel?: boolean
          capex_anual_recorrente?: number | null
          cargo?: string | null
          confianca?: string | null
          confianca_score?: number | null
          consentimento_rgpd?: boolean
          created_at?: string
          dependencia_acionista_faturacao?: string | null
          dependencia_acionista_gestao?: string | null
          depreciacoes_amortizacoes?: number | null
          despesas_extraordinarias_ano1?: number | null
          despesas_extraordinarias_ano2?: number | null
          despesas_extraordinarias_ano3?: number | null
          divida_financeira?: number | null
          divida_liquida?: number | null
          ebitda_ano1?: number | null
          ebitda_ano2?: number | null
          ebitda_ano3?: number | null
          email?: string
          email_enviado?: boolean
          email_erro?: string | null
          email_relatorio_agendado_para?: string | null
          email_relatorio_enviado_em?: string | null
          empresa?: string
          equity_max?: number | null
          equity_min?: number | null
          estrutura_transacao?: string | null
          ev_max?: number | null
          ev_min?: number | null
          faturacao_ano1?: number | null
          faturacao_ano2?: number | null
          faturacao_ano3?: number | null
          geografia_clientes?: string | null
          horizonte_temporal?: string | null
          id?: string
          idade_empresa?: number | null
          incluir_imovel_perimetro?: string | null
          industria?: string
          leasing_financeiro?: number | null
          metodo_avaliacao_imovel?: string | null
          motivo_interesse?: string | null
          multiplo_ajustado_max?: number | null
          multiplo_ajustado_min?: number | null
          nome?: string
          num_clientes_ativos?: string | null
          num_colaboradores?: string | null
          outros_debt_like?: number | null
          pais?: string
          pct_a_transacionar?: string | null
          pct_top1_clientes?: number | null
          pct_top5_clientes?: number | null
          percentagem_receita_recorrente?: number | null
          permanencia_pos_venda?: string | null
          prazo_medio_recebimento?: number | null
          proprietario_imovel?: string | null
          relatorio_dados?: Json | null
          relatorio_enviado_em?: string | null
          relatorio_erro?: string | null
          relatorio_estado?: string
          relatorio_expira_em?: string | null
          relatorio_gerado_em?: string | null
          relatorio_pdf_admin_url?: string | null
          relatorio_pdf_url?: string | null
          relatorio_slug?: string | null
          relatorio_token?: string
          relatorio_token_admin?: string
          relatorio_url?: string | null
          renda_reflete_mercado?: string | null
          subindustria?: string | null
          suprimentos_acionistas?: number | null
          telefone?: string | null
          tipo_investidor?: string | null
          tipo_periodo?: string | null
          unidades?: string | null
          valorizacao_imovel?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

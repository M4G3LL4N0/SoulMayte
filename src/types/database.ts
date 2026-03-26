export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  soulmayte: {
    Tables: {
      waitlist_entries: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          full_name: string | null;
          city: string | null;
          state: string | null;
          relationship_status: string | null;
          looking_for: string | null;
          notes: string | null;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          full_name?: string | null;
          city?: string | null;
          state?: string | null;
          relationship_status?: string | null;
          looking_for?: string | null;
          notes?: string | null;
          source?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          city?: string | null;
          state?: string | null;
          relationship_status?: string | null;
          looking_for?: string | null;
          notes?: string | null;
          source?: string | null;
        };
        Relationships: [];
      };
      soulmate_readiness_quiz_submissions: {
        Row: {
          id: string;
          created_at: string;
          email: string | null;
          attachment_style: string | null;
          communication_style: string | null;
          long_term_intent: string | null;
          self_awareness_score: number | null;
          emotional_availability_score: number | null;
          values_alignment_score: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email?: string | null;
          attachment_style?: string | null;
          communication_style?: string | null;
          long_term_intent?: string | null;
          self_awareness_score?: number | null;
          emotional_availability_score?: number | null;
          values_alignment_score?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string | null;
          attachment_style?: string | null;
          communication_style?: string | null;
          long_term_intent?: string | null;
          self_awareness_score?: number | null;
          emotional_availability_score?: number | null;
          values_alignment_score?: number | null;
          notes?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      relationship_status:
        | "single"
        | "talking"
        | "dating"
        | "situationship"
        | "relationship"
        | "complicated";
      looking_for_type:
        | "soulmate"
        | "serious_relationship"
        | "dating"
        | "marriage"
        | "clarity";
    };
    CompositeTypes: Record<string, never>;
    Profiles: {
      Row: {
        id: string;
        created_at: string;
        email: string;
        full_name: string | null;
        city: string | null;
        state: string | null;
        bio: string | null;
        dating_intention: string | null;
      };
      Insert: {
        id: string;
        created_at?: string;
        email: string;
        full_name?: string | null;
        city?: string | null;
        state?: string | null;
        bio?: string | null;
        dating_intention?: string | null;
      };
      Update: {
        id?: string;
        created_at?: string;
        email?: string;
        full_name?: string | null;
        city?: string | null;
        state?: string | null;
        bio?: string | null;
        dating_intention?: string | null;
      };
    };
    PartnerProfiles: {
      Row: {
        id: string;
        created_at: string;
        owner_user_id: string;
        partner_name: string;
        notes: string | null;
        relationship_stage: string | null;
      };
    };
    AnalysisReports: {
      Row: {
        id: string;
        created_at: string;
        email: string | null;
        input_text: string;
        compatibility_score: number | null;
        risk_level: string | null;
        green_flags: Json | null;
        red_flags: Json | null;
        summary: string | null;
        raw_ai_output: Json | null;
      };
      Insert: {
        id?: string;
        created_at?: string;
        email?: string | null;
        input_text: string;
        compatibility_score?: number | null;
        risk_level?: string | null;
        green_flags?: Json | null;
        red_flags?: Json | null;
        summary?: string | null;
        raw_ai_output?: Json | null;
      };
      Update: {
        id?: string;
        created_at?: string;
        email?: string | null;
        input_text?: string;
        compatibility_score?: number | null;
        risk_level?: string | null;
        green_flags?: Json | null;
        red_flags?: Json | null;
        summary?: string | null;
        raw_ai_output?: Json | null;
      };
      Insert: {
        id?: string;
        created_at?: string;
        owner_user_id: string;
        partner_name: string;
        notes?: string | null;
        relationship_stage?: string | null;
      };
      Update: {
        id?: string;
        created_at?: string;
        owner_user_id?: string;
        partner_name?: string;
        notes?: string | null;
        relationship_stage?: string | null;
      };
    };
  };
}

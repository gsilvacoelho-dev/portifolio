import {
  siReact,
  siTypescript,
  siTailwindcss,
  siBootstrap,
  siFlask,
  siPython,
  siPostgresql,
  siSqlite,
  siSupabase,
  siGit,
  siVite,
  siClaude,
  siGooglegemini,
  siN8n,
  siZapier,
  siMake,
  siCursor,
  siReplit,
  siHuggingface,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import {
  Sparkles,
  FileSpreadsheet,
  FileCode2,
  Boxes,
  GraduationCap,
  Briefcase,
  Brain,
  MessageSquareCode,
  Workflow,
  Network,
  Database,
  type LucideIcon,
} from 'lucide-react';

/** Brand icons (verified SVG paths + official hex from simple-icons). */
export const brandMap: Record<string, SimpleIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  TailwindCSS: siTailwindcss,
  'Tailwind CSS': siTailwindcss,
  Bootstrap: siBootstrap,
  Flask: siFlask,
  Python: siPython,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  Supabase: siSupabase,
  Git: siGit,
  Vite: siVite,
  Claude: siClaude,
  Gemini: siGooglegemini,
  n8n: siN8n,
  Zapier: siZapier,
  Make: siMake,
  Cursor: siCursor,
  Replit: siReplit,
  'Hugging Face': siHuggingface,
};

/** Fallbacks for techs without a (trademark-safe) brand icon. */
export const fallbackMap: Record<string, LucideIcon> = {
  'Pacote Office': FileSpreadsheet,
  VBA: FileCode2,
  Educação: GraduationCap,
  Administração: Briefcase,
  // IA & automação
  'OpenAI API': Sparkles,
  'Prompt Engineering': MessageSquareCode,
  'LLM Apps': Brain,
  RAG: Database,
  'Orquestração de Agentes': Network,
  'Automação de Relatórios': Workflow,
  'REST APIs': Network,
};

export const FallbackIcon = Boxes;

/** Returns the official brand color for a tech, or null if unknown. */
export function getBrandHex(name: string): string | null {
  const brand = brandMap[name];
  return brand ? `#${brand.hex}` : null;
}

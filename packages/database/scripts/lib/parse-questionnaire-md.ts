// Parser untuk MD questionnaire → JSON (untuk seed DB)
import * as fs from 'fs';

export interface ParsedOption {
  value: string;
  label: string;
  score?: number;
}

export interface ParsedQuestion {
  source: string;
  key: string;
  type: string;
  label: string;
  description?: string;
  required: boolean;
  appliesTo: string[];
  guna: string;
  options?: ParsedOption[];
  dependsOn?: string;
  validation?: Record<string, unknown>;
  section: string;
}

export interface ParsedQuestionnaire {
  casNumber: string;
  standard: string;
  questions: ParsedQuestion[];
}

// Parse satu fail MD
export function parseQuestionnaireMd(filePath: string): ParsedQuestionnaire {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Header
  const titleLine = lines.find((l) => l.startsWith('# ')) ?? '';
  const casMatch = titleLine.match(/CAS\s+([\d-]+(?:\s*\(R\d+\))?)/i);
  const casNumber = casMatch ? `CAS ${casMatch[1]}` : 'UNKNOWN';

  const standardMatch = content.match(/\*\*Standard:\*\*\s*(.+)/);
  const standardRaw = standardMatch ? standardMatch[1].trim() : '';
  const standard = standardRaw.split(/[\s(,]/)[0];

  // Parse sections + questions
  const questions: ParsedQuestion[] = [];
  let currentSection = 'default';
  let currentQuestion: Partial<ParsedQuestion> | null = null;
  let inOptions = false;
  let options: ParsedOption[] = [];

  const flushQuestion = () => {
    if (currentQuestion && currentQuestion.key) {
      currentQuestion.section = currentSection;
      currentQuestion.options = options.length > 0 ? options : undefined;
      questions.push(currentQuestion as ParsedQuestion);
    }
    currentQuestion = null;
    options = [];
    inOptions = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Section header — support "## Section: X" dan "## X"
    const sectionMatch = line.match(/^##\s+(?:Section:\s*)?(.+)/);
    if (sectionMatch) {
      flushQuestion();
      const sectionRaw = sectionMatch[1].trim().toLowerCase().replace(/\s+/g, '_');
      currentSection = `${standard.toLowerCase()}_${sectionRaw}`;
      continue;
    }

    // Question header
    const qMatch = line.match(/^###\s+(Q\d+)/);
    if (qMatch) {
      flushQuestion();
      currentQuestion = {
        source: '',
        key: '',
        type: '',
        label: '',
        required: false,
        appliesTo: [],
        guna: '',
      };
      continue;
    }

    if (!currentQuestion) continue;

    // Options block
    if (line.startsWith('- **Options:**')) {
      inOptions = true;
      continue;
    }

    // Key-value
    const kvMatch = line.match(/^-\s+\*\*([^*]+):\*\*\s*(.*)$/);
    if (kvMatch) {
      inOptions = false;
      const key = kvMatch[1].trim().toLowerCase();
      const val = kvMatch[2].trim().replace(/^`|`$/g, '');

      switch (key) {
        case 'source':
          currentQuestion.source = val;
          break;
        case 'field':
          currentQuestion.key = val;
          break;
        case 'type':
          currentQuestion.type = val;
          break;
        case 'label':
          currentQuestion.label = val;
          break;
        case 'description':
          currentQuestion.description = val;
          break;
        case 'required':
          currentQuestion.required = val.toLowerCase() === 'yes';
          break;
        case 'applies to':
          currentQuestion.appliesTo = val.split(',').map((s) => s.trim().toUpperCase());
          break;
        case 'guna':
          currentQuestion.guna = val;
          break;
        case 'depends on':
          currentQuestion.dependsOn = val;
          break;
      }
      continue;
    }

    // Option item
    if (inOptions && line.startsWith('- ')) {
      const optLabel = line.slice(2).trim();
      options.push({ value: optLabel, label: optLabel });
      continue;
    }
  }

  flushQuestion();

  return { casNumber, standard, questions };
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompanyInfo {
  name: string;
  address: string;
  legalStatus: string;
  orgType: string;
  isBumiputera: boolean;
  contactName: string;
  contactDesignation: string;
  contactPhone: string;
  contactEmail: string;
}

export interface FteBreakdown {
  management: number;
  permanent: number;
  contract: number;
  repetitive: number;
}

export type CertificationType = 'SINGLE' | 'INTEGRATED';

export interface ApplicationFormData {
  company: CompanyInfo;
  certificationType: CertificationType;
  standards: string[];
  fte: FteBreakdown;
  industryType: string;
  cpiScore: number | null;
}

interface ApplicationStore {
  step: number;
  data: ApplicationFormData;
  setStep: (step: number) => void;
  updateCompany: (company: Partial<CompanyInfo>) => void;
  setCertificationType: (type: CertificationType) => void;
  toggleStandard: (code: string) => void;
  selectSingleStandard: (code: string) => void;
  updateFte: (fte: Partial<FteBreakdown>) => void;
  updateIndustry: (industryType: string, cpiScore: number | null) => void;
  reset: () => void;
}

const MAX_STEP = 4;

const initialData: ApplicationFormData = {
  company: {
    name: '',
    address: '',
    legalStatus: '',
    orgType: '',
    isBumiputera: false,
    contactName: '',
    contactDesignation: '',
    contactPhone: '',
    contactEmail: '',
  },
  certificationType: 'SINGLE',
  standards: [],
  fte: {
    management: 0,
    permanent: 0,
    contract: 0,
    repetitive: 0,
  },
  industryType: '',
  cpiScore: null,
};

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      step: 1,
      data: initialData,
      setStep: (step) => set({ step: Math.max(1, Math.min(MAX_STEP, step)) }),
      updateCompany: (company) =>
        set((state) => ({
          data: { ...state.data, company: { ...state.data.company, ...company } },
        })),
      setCertificationType: (certificationType) =>
        set((state) => {
          const standards =
            certificationType === 'SINGLE' && state.data.standards.length > 1
              ? [state.data.standards[0]]
              : state.data.standards;
          return { data: { ...state.data, certificationType, standards } };
        }),
      toggleStandard: (code) =>
        set((state) => {
          const standards = state.data.standards.includes(code)
            ? state.data.standards.filter((s) => s !== code)
            : [...state.data.standards, code];
          return { data: { ...state.data, standards } };
        }),
      selectSingleStandard: (code) =>
        set((state) => {
          const alreadyOnly =
            state.data.standards.length === 1 && state.data.standards[0] === code;
          return {
            data: {
              ...state.data,
              standards: alreadyOnly ? [] : [code],
            },
          };
        }),
      updateFte: (fte) =>
        set((state) => ({
          data: { ...state.data, fte: { ...state.data.fte, ...fte } },
        })),
      updateIndustry: (industryType, cpiScore) =>
        set((state) => ({
          data: { ...state.data, industryType, cpiScore },
        })),
      reset: () => set({ step: 1, data: initialData }),
    }),
    {
      name: 'scale-application-draft',
      version: 2,
      migrate: () => ({ step: 1, data: initialData }),
    },
  ),
);

export function calculateTotalFte(fte: FteBreakdown): number {
  return fte.management + fte.permanent + fte.contract * 0.5 + fte.repetitive;
}

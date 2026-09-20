import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// =============================================================================
// TYPES
// =============================================================================

export interface CompanyInfo {
  name: string;
  address: string;
  legalStatus: string;
  orgType: string;
  isBumiputera: boolean;
}

export interface PicContact {
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface Employees {
  total: number;
  management: number;
  permanent: number;
  contract: number;
  repetitive: number;
}

export interface ShiftOutsource {
  hasShift: boolean;
  shift1: number;
  shift2: number;
  shift3: number;
  outsourceActivities: string;
}

export interface ScopeIndustry {
  scope: string;
  industryType: string;
  includeSites: boolean;
  sitesCount: number;
}

export interface Documentation {
  established: boolean;
  type: 'Individual' | 'Integrated' | '';
  manualIntegrated: boolean;
  policyIntegrated: boolean;
  internalAuditIntegrated: boolean;
}

export interface AdditionalInfo {
  targetDate: string;
  hasOtherCerts: boolean;
  otherCertsDetails: string;
  hasConsultant: boolean;
  consultantName: string;
  marketingSource: string;
  declaration: boolean;
}

export interface ApplicationFormData {
  company: CompanyInfo;
  pic: PicContact;
  employees: Employees;
  shift: ShiftOutsource;
  scopeIndustry: ScopeIndustry;
  standards: string[];
  certificationType: 'SINGLE' | 'INTEGRATED';
  documentation: Documentation;
  additional: AdditionalInfo;
}

// =============================================================================
// STORE
// =============================================================================

const MAX_STEP = 7;

const initialData: ApplicationFormData = {
  company: {
    name: '',
    address: '',
    legalStatus: '',
    orgType: '',
    isBumiputera: false,
  },
  pic: {
    name: '',
    designation: '',
    phone: '',
    email: '',
  },
  employees: {
    total: 0,
    management: 0,
    permanent: 0,
    contract: 0,
    repetitive: 0,
  },
  shift: {
    hasShift: false,
    shift1: 0,
    shift2: 0,
    shift3: 0,
    outsourceActivities: '',
  },
  scopeIndustry: {
    scope: '',
    industryType: '',
    includeSites: false,
    sitesCount: 0,
  },
  standards: [],
  certificationType: 'SINGLE',
  documentation: {
    established: false,
    type: '',
    manualIntegrated: false,
    policyIntegrated: false,
    internalAuditIntegrated: false,
  },
  additional: {
    targetDate: '',
    hasOtherCerts: false,
    otherCertsDetails: '',
    hasConsultant: false,
    consultantName: '',
    marketingSource: '',
    declaration: false,
  },
};

interface ApplicationStore {
  step: number;
  data: ApplicationFormData;

  setStep: (step: number) => void;

  updateCompany: (company: Partial<CompanyInfo>) => void;
  updatePic: (pic: Partial<PicContact>) => void;
  updateEmployees: (employees: Partial<Employees>) => void;
  updateShift: (shift: Partial<ShiftOutsource>) => void;
  updateScopeIndustry: (scopeIndustry: Partial<ScopeIndustry>) => void;
  setCertificationType: (type: 'SINGLE' | 'INTEGRATED') => void;
  toggleStandard: (code: string) => void;
  selectSingleStandard: (code: string) => void;
  updateDocumentation: (documentation: Partial<Documentation>) => void;
  updateAdditional: (additional: Partial<AdditionalInfo>) => void;

  reset: () => void;
}

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

      updatePic: (pic) =>
        set((state) => ({
          data: { ...state.data, pic: { ...state.data.pic, ...pic } },
        })),

      updateEmployees: (employees) =>
        set((state) => {
          const merged = { ...state.data.employees, ...employees };
          // Auto-sync total
          const autoTotal =
            (merged.management ?? 0) +
            (merged.permanent ?? 0) +
            (merged.contract ?? 0) +
            (merged.repetitive ?? 0);
          return {
            data: {
              ...state.data,
              employees: { ...merged, total: autoTotal },
            },
          };
        }),

      updateShift: (shift) =>
        set((state) => ({
          data: { ...state.data, shift: { ...state.data.shift, ...shift } },
        })),

      updateScopeIndustry: (scopeIndustry) =>
        set((state) => ({
          data: {
            ...state.data,
            scopeIndustry: { ...state.data.scopeIndustry, ...scopeIndustry },
          },
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

      updateDocumentation: (documentation) =>
        set((state) => ({
          data: {
            ...state.data,
            documentation: { ...state.data.documentation, ...documentation },
          },
        })),

      updateAdditional: (additional) =>
        set((state) => ({
          data: {
            ...state.data,
            additional: { ...state.data.additional, ...additional },
          },
        })),

      reset: () => set({ step: 1, data: initialData }),
    }),
    {
      name: 'scale-application-draft',
      version: 3,
      migrate: () => ({ step: 1, data: initialData }),
    },
  ),
);

// =============================================================================
// HELPERS
// =============================================================================

export function calculateTotalFte(employees: Employees): number {
  return (
    employees.management +
    employees.permanent +
    employees.contract * 0.5 +
    employees.repetitive
  );
}

export function calculateShiftTotal(shift: ShiftOutsource): number {
  if (!shift.hasShift) return 0;
  return shift.shift1 + shift.shift2 + shift.shift3;
}


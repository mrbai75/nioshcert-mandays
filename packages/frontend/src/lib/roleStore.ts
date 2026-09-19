import { create } from 'zustand';

export type Role = 'PIC' | 'BD' | 'ATD_OFFICER' | 'ATD_MANAGER' | 'SUPER_ADMIN';

interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: 'PIC',
  setRole: (role) => set({ role }),
}));

export const ROLE_LABELS: Record<Role, string> = {
  PIC: 'PIC (Client)',
  BD: 'BD (Business Development)',
  ATD_OFFICER: 'ATD Officer',
  ATD_MANAGER: 'ATD Manager',
  SUPER_ADMIN: 'Super Admin',
};

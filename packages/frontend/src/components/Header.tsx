import { RoleSwitcher } from './RoleSwitcher';

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="font-semibold text-gray-900">SCALE</h1>
          <span className="text-xs text-gray-500">by NIOSHCert</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">Role (placeholder)</span>
        <RoleSwitcher />
      </div>
    </header>
  );
}

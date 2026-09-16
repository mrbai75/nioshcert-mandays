import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Guna environment Node (shared tak sentuh DOM)
    environment: 'node',

    // Cari test dalam folder tests/
    include: ['tests/**/*.test.ts'],

    // Exclude build output & node_modules
    exclude: ['node_modules', 'dist'],

    // Report ringkas
    reporters: ['default'],

    // Coverage (optional, aktif bila perlu)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/index.ts'],
    },

    // Typecheck semasa test (guna TS secara automatik)
    typecheck: {
      enabled: false,
    },
  },
});
// Provide minimal type declarations for 'tailwindcss' to satisfy the
// TypeScript compiler in environments where Tailwind's types are not
// available. This keeps `tailwind.config.ts` typed without requiring
// additional packages during CI/editor checks.

declare module 'tailwindcss' {
  // Minimal Config shape — consumers can still use the real types locally
  // if they have @types/tailwindcss or Tailwind installed.
  export type Config = any

  const _: any
  export default _
}

# Nexus Contract Probes & Test Criteria

## 1. Deterministic Probes
- **Build Probe**: `npm run build` must exit with code 0.
- **Typecheck Probe**: `npm run typecheck` must return 0 errors.
- **Vibeguard Probe**: `bun ~/.config/LIFEOS/runtime/TOOLS/SecretScan.ts .` must return 0 leaks.

## 2. Runtime & Browser Probes (Playwright)
- **Route Probe**: `GET /` returns HTTP 200.
- **DOM Probe**: Key layout container renders without crash.
- **Console Probe**: Zero uncaught runtime errors in browser console.

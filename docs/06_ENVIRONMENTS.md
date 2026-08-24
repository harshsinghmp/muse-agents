# Environments & Deployment Topology

## 1. Environment Stages
1. **LOCAL**: Development workspace (`http://localhost:3000` or `http://localhost:4321`).
2. **STAGING / PREVIEW**: Ephemeral or dedicated staging for review and Playwright testing.
3. **PRODUCTION**: Live customer-facing environment.

## 2. Secrets Policy
- Secrets are NEVER stored in git or shared project docs.
- Use `.env.example` to document expected variable keys without values.

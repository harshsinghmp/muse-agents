# Reality State Machine

> **Rule**: An item only moves from PROPOSED to PROD_VERIFIED when verified with deterministic evidence.

```
[PROPOSED] → [APPROVED] → [LOCAL_DEV] → [LOCAL_VERIFIED] → [STAGING_DEPLOYED] → [STAGING_VERIFIED] → [PROD_DEPLOYED] → [PROD_VERIFIED]
```

## Current Workstream States

| Item / Feature | State | Owner | Verification Evidence |
|---|---|---|---|
| **Project OS Bootstrap** | `LOCAL_VERIFIED` | Muse | 10 Docs + .agentrules + Nexus probes generated |
| **Design System Tokens** | `PROPOSED` | Jasper | Pending implementation |
| **Core App Logic** | `PROPOSED` | Sol | Pending implementation |
| **Nexus Probe Suite** | `LOCAL_VERIFIED` | Nexus | scripts/nexus_verify.sh initialized |

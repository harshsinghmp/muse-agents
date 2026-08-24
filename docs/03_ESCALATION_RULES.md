# Escalation Hierarchy & Anti-Overengineering (Ponytail Doctrine)

## The 4-Tier Escalation Order
Before writing custom code or generating heavy automation, evaluate solutions in this strict sequence:

1. **Tier 1 (Simplest / Preferred)**: Native Platform Config, Dashboard setting, or Environment variable.
2. **Tier 2 (Minimal)**: Simple CSS utility, standard framework hook, or existing helper (<15 lines).
3. **Tier 3 (Controlled)**: Dedicated UI component or standard API route handler.
4. **Tier 4 (Last Resort)**: Complex state machine, custom microservice, or 400-line automation harness.

> *"Sometimes clicking a checkbox in an admin panel or using a single CSS class is infinitely better than generating 400 lines of glue code."*

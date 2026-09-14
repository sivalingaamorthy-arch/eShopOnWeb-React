# GitHub Copilot Instructions - eShopOnWeb React Modernization POC (Catalog Only)

## Purpose
These instructions define the working guardrails for the React modernization POC of the Catalog screen.

## Authoritative Sources
1. The existing .NET MVC/Razor application is the AS-IS source system.
2. The existing AS-IS Catalog LLD is the source of truth for current behavior.
3. `docs/02_TO_BE_React_Catalog_LLD.md` is the source of truth for target React design.

## Scope and Boundaries
4. Scope this POC **only** to the Catalog screen.
5. Do not modify unrelated screens or functionality.
6. Preserve existing business rules and backend behavior unless explicitly required by the React Catalog LLD.
7. Reuse existing .NET APIs and backend functionality wherever applicable.
8. Follow the React project structure and TypeScript conventions.
9. Prefer reusable React components.
10. Keep API/service logic separate from presentation components.
11. Implement filtering, pagination, product rendering, and other behavior documented in the React Catalog LLD.
12. Do not invent functionality not documented in the React LLD or present in the existing application.

## Required Working Process
13. Before modifying code, inspect the existing implementation and identify relevant files.
14. For each React LLD requirement, identify the corresponding React file/component before implementation.
15. After implementation, verify each React LLD requirement against actual React source code.
16. If a requirement is missing or partial, update the appropriate file to complete implementation.
17. Do not claim implementation unless it exists in source code.
18. Maintain end-to-end traceability:
   - AS-IS implementation -> React LLD -> React implementation

## Change Discipline
- Analyze before modifying.
- Make minimal, targeted changes.
- Avoid unnecessary backend changes.
- Avoid unrelated refactoring.
- Preserve existing functionality and behavior parity.

## Delivery and Reporting
- Always report files created and modified.
- Explicitly report any React LLD requirement that cannot be implemented, including the reason and blocking constraint.
- Clearly distinguish what is implemented vs target design when applicable.
# React Engineering Guidelines for Modernization
# GitHub Copilot Instructions for React Projects

## 1. General Principles
- Write clean, readable, maintainable code.
- Favor simplicity over complexity.
- Keep implementations concise but expressive.
- Use descriptive naming that communicates intent.
- Apply DRY to reduce duplication and maintenance cost.
- Follow Single Responsibility Principle for modules, components, hooks, and functions.
- Separate concerns clearly between UI, state orchestration, and data access.
- Prefer modular designs that are easy to extend and replace.
- Keep code testable by isolating side effects.
- Maintain consistency with existing code style and architecture.
- Avoid unnecessary abstractions and over-engineering.

## 2. General Guidelines
- Keep code concise and easy to understand.
- Use descriptive names for functions, variables, types, and components.
- Keep functions focused on one responsibility.
- Avoid duplicate logic; extract reusable helpers when justified.
- Avoid magic numbers and strings; use constants/configuration where appropriate.
- Keep interfaces and APIs minimal and intentional.
- Prefer reusable solutions over one-off implementations.
- Avoid creating abstraction layers without clear value.
- Preserve existing behavior when modifying code unless change is explicitly required.
- Inspect existing implementation before adding new code.

## 3. Project Structure
- Organize code in a way that supports discoverability and maintainability.
- Typical areas may include pages, features, components, hooks, services, data-access, types, utilities, constants, assets, and tests.
- Follow the project’s existing structure and conventions rather than imposing a new structure.
- Co-locate related files when that improves cohesion.
- Place reusable cross-cutting code in shared locations only when reuse is proven.
- Avoid adding parallel folder patterns that conflict with established organization.

## 4. React Specific Guidelines
- Use functional components.
- Use hooks for state and side effects.
- Favor component composition over large monolithic components.
- Keep props explicit, minimal, and strongly typed.
- Keep components focused on clear responsibilities.
- Prefer immutable state updates.
- Use clear conditional rendering patterns.
- Use stable keys when rendering lists.
- Use controlled components for forms when state-driven behavior is required.
- Avoid unnecessary component complexity and nested branching logic.

## 5. Component Design
- Design components with single responsibility.
- Keep components small, focused, and composable.
- Separate presentational responsibilities from container/orchestration responsibilities.
- Create reusable components for repeated UI patterns.
- Define clear prop contracts.
- Avoid deeply coupled component relationships.
- Reduce excessive prop drilling through better ownership/composition patterns where appropriate.
- Avoid unnecessary abstraction layers for simple UI.

## 6. Hooks
- Use `useState` for local state.
- Use `useEffect` for side effects with correct dependency arrays.
- Use `useMemo` and `useCallback` only when there is clear benefit.
- Use `useContext` for well-defined shared state concerns.
- Create custom hooks for reusable stateful workflows.
- Keep hooks focused and predictable.
- Provide cleanup in effects where required.
- Avoid unnecessary effects for derivable state.
- Avoid unnecessary memoization that harms readability.

## 7. State Management
- Keep state as local as possible.
- Lift state only when multiple consumers require shared ownership.
- Introduce global/shared state only when local composition is insufficient.
- Model server/API state with explicit loading, success, empty, and error phases.
- Keep state updates immutable.
- Normalize state shape when complexity requires it.
- Avoid unnecessary global state and over-centralization.
- Do not mandate or introduce a state library unless explicitly required.

## 8. API and Data Fetching
- Keep API/data-access logic separate from UI components.
- Use reusable service functions for network operations.
- Define request/response models with types.
- Handle async flows explicitly (loading, success, empty, error).
- Validate/normalize response data where appropriate.
- Avoid duplicate API calls and redundant requests.
- Keep API contracts clear and stable.
- Handle asynchronous errors safely and consistently.
- Do not assume or invent backend behavior.

## 9. TypeScript
- Use strong typing across components, hooks, services, and utilities.
- Type component props, state, function parameters, and return values.
- Use interfaces/type aliases consistently.
- Keep API request/response models typed.
- Prefer precise unions and narrow types over broad `any`.
- Avoid unnecessary `any`.
- Avoid unsafe type assertions.
- Reuse existing types before creating new ones.
- Keep type definitions organized and discoverable.
- Use type-safe error handling patterns.
- Use generics where they improve safety and reuse.

## 10. Naming Conventions
- Components: `PascalCase`.
- Hooks: `useXxx` naming.
- Functions and variables: `camelCase`.
- Constants: descriptive uppercase or consistent project standard.
- Types and interfaces: descriptive `PascalCase`.
- Files and folders: consistent, descriptive naming aligned with project conventions.
- Prefer clarity over brevity.

## 11. Styling
- Follow the application’s existing styling approach.
- Keep styling conventions consistent.
- Prefer component-level or feature-level styling where appropriate.
- Reuse style primitives/patterns to avoid duplication.
- Avoid unnecessary global styles.
- Consider responsive behavior where relevant.
- Do not introduce a new styling technology unless explicitly requested.

## 12. Accessibility
- Use semantic HTML first.
- Ensure keyboard accessibility for interactive elements.
- Provide labels for form inputs.
- Ensure buttons/links have clear accessible names.
- Provide meaningful alternative text for images.
- Use ARIA only when semantic markup is insufficient.
- Manage focus appropriately for dynamic interactions.
- Consider screen-reader usability in dynamic UI updates.

## 13. Performance
- Avoid unnecessary renders by scoping state correctly.
- Use stable keys for list rendering.
- Avoid unnecessary API requests.
- Use memoization only where useful and justified.
- Use lazy loading/code splitting where appropriate.
- Keep large list rendering efficient when needed.
- Avoid premature optimization.

## 14. Error Handling
- Handle API errors with clear and user-friendly messages.
- Handle validation errors close to user input boundaries.
- Provide fallback UI for runtime failures when needed.
- Implement explicit loading and empty states.
- Handle missing or malformed data defensively.
- Log errors where appropriate without leaking sensitive information.

## 15. Security
- Never commit secrets to source code.
- Treat all user input as untrusted.
- Integrate with existing authentication/authorization mechanisms.
- Handle tokens/sensitive data carefully.
- Use safe API patterns and secure transport expectations.
- Avoid unsafe HTML rendering and injection risks.
- Do not rely on client-only checks for security-critical behavior.

## 16. Testing
- Write testable code by separating side effects and pure logic.
- Cover reusable logic with unit tests.
- Validate component behavior with component-level tests where applicable.
- Validate key user flows with integration tests where appropriate.
- Focus on behavior and outcomes rather than internal implementation details.
- Do not mandate a specific test framework unless required.

## 17. Documentation
- Add comments only when they provide meaningful context.
- Document complex logic and non-obvious decisions.
- Keep component/service contracts understandable.
- Update supporting documentation when behavior changes.
- Keep documentation synchronized with implementation.
- Avoid comments that simply restate code.

## 18. Refactoring Guidelines
- Understand existing behavior before refactoring.
- Preserve behavior unless changes are explicitly requested.
- Refactor incrementally.
- Avoid unrelated edits during focused refactors.
- Remove duplication carefully.
- Avoid over-engineering.
- Validate code after refactoring.
- Do not change architecture without clear justification.

## 19. GitHub Copilot Working Guidelines
When handling a task, Copilot should:
1. Understand the requirement.
2. Inspect relevant existing code.
3. Identify dependencies.
4. Identify reusable implementation.
5. Follow existing project conventions.
6. Plan the change.
7. Make minimal targeted edits.
8. Review generated code for correctness and consistency.
9. Validate against requirements.
10. Report files changed plus assumptions/limitations.

## 20. What Copilot Should Avoid
- Inventing requirements.
- Inventing APIs.
- Inventing business rules.
- Unnecessary refactoring.
- Unrelated file changes.
- Duplicate components, services, or logic.
- Unnecessary dependencies.
- Unnecessary abstractions.
- Direct state mutation.
- Excessive global state.
- Excessive `useEffect` usage.
- Unnecessary memoization.
- Hard-coded secrets.
- Unsafe type assertions.
- Ignoring existing project conventions.

## 21. Code Quality Checklist
Before finishing a task, verify:
- Is the implementation readable?
- Is each component/function focused?
- Is existing code reused where appropriate?
- Are types correct and complete?
- Is state handled appropriately and immutably?
- Are API concerns separated from UI?
- Are loading/error/empty states handled?
- Is accessibility considered?
- Are unnecessary dependencies avoided?
- Are unrelated files untouched?
- Is existing behavior preserved?
- Has the change been validated?

## 22. Generic Copilot Decision Flow
Understand Requirement
? Inspect Existing Code
? Identify Dependencies
? Follow Existing Conventions
? Plan
? Implement
? Review
? Validate
? Report

# Document Purpose
This document provides generic React engineering and GitHub Copilot guidance intended to be reusable across React projects.

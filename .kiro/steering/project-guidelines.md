# Project Guidelines

## Documentation Rules

### ❌ Do NOT Create:
- Task-specific markdown files (e.g., SETUP_VERIFICATION.md, TASK_COMPLETION.md)
- Implementation notes as separate .md files
- Step-by-step guides for individual tasks
- Verification checklists as standalone files
- Any markdown documentation that duplicates information already in specs

### ✅ DO Use:
- The existing spec files in `.kiro/specs/` for requirements, design, and tasks
- Code comments for implementation details
- README.md for project-level documentation only
- Inline documentation in code files
- JSDoc/TSDoc comments for functions and components

## Rationale

Task-specific markdown files create unnecessary clutter and duplicate information that should be:
1. In the spec documents (requirements, design, tasks)
2. In code comments
3. In the main README.md

Keep documentation centralized and avoid creating files that will become outdated or redundant.

## When to Update Documentation

### Update README.md when:
- Adding new major features to the project
- Changing setup/installation procedures
- Adding new environment variables
- Changing technology stack

### Update Spec Files when:
- Requirements change
- Design decisions change
- Tasks need to be added/modified

### Use Code Comments when:
- Explaining complex logic
- Documenting function parameters and return values
- Noting important implementation details
- Explaining non-obvious code decisions

## File Organization

Keep the project clean:
- Source code in `src/`
- Configuration files in root
- Specs in `.kiro/specs/`
- Steering rules in `.kiro/steering/`
- No loose documentation files in root (except README.md)

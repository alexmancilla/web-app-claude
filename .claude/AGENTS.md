# Claude Agents

This repository uses a specialized agent system for software development. Each agent has a specific role and works together in a coordinated pipeline.

## Agent Categories

### 🏗️ Architecture Agents

Use these agents for system design and architectural decisions.

#### @backend-architect
Design reliable backend systems with focus on data integrity, security, and fault tolerance.

**Use when:**
- Designing APIs (REST, GraphQL)
- Planning database schemas and optimization
- Implementing security patterns (auth, encryption)
- Building scalable and fault-tolerant systems

**Example:** `@backend-architect design an API for user authentication with JWT`

#### @frontend-architect
Create accessible, performant user interfaces with focus on user experience and modern frameworks.

**Use when:**
- Designing UI components and design systems
- Ensuring WCAG accessibility compliance
- Optimizing Core Web Vitals and performance
- Building responsive, mobile-first interfaces

**Example:** `@frontend-architect create a dashboard component with accessibility`

---

### 🚀 Feature Pipeline Agents

These agents work together in sequence to deliver complete features. Use the `/ship` command to orchestrate the full pipeline.

#### 1️⃣ @planner (First Stage)
Turns a feature request into a detailed implementation spec.

**Outputs:** `.pipeline/spec.md` with:
- Files to create or modify (exact paths)
- Function signatures and interfaces needed
- Edge cases to handle
- Existing patterns to follow
- OPEN QUESTIONS if anything is ambiguous

**Model:** Opus (highest reasoning for architectural decisions)

**Do not use directly.** Use `/ship` command instead.

---

#### 2️⃣ @coder (Second Stage)
Implements the spec exactly as written by the planner.

**Inputs:** `.pipeline/spec.md`

**Outputs:** 
- Actual code changes
- `.pipeline/changes.md` summary for the tester

**Model:** Sonnet (fast, accurate implementation)

**Do not use directly.** Invoked automatically after planner.

---

#### 3️⃣ @tester (Third Stage)
Writes and runs tests for the implemented changes.

**Inputs:** `.pipeline/changes.md`

**Outputs:** `.pipeline/test-results.md` with:
- Test files in the repo
- Pass/fail status
- Failure details if any tests fail

**Important:** Tester does NOT fix code. If tests fail, the pipeline stops.

**Model:** Sonnet

**Do not use directly.** Invoked automatically after coder.

---

#### 4️⃣ @reviewer (Fourth Stage - Final)
Read-only review of the complete pipeline output.

**Inputs:** 
- `.pipeline/spec.md`
- `.pipeline/changes.md`
- `.pipeline/test-results.md`
- Git diff

**Outputs:** `.pipeline/review.md` with verdict:
- `SHIP` - Ready to merge
- `NEEDS WORK` - Issues to fix (with details)
- `BLOCK` - Critical problems (with details)

**Important:** Reviewer cannot edit code. This prevents biased reviews.

**Model:** Opus (strongest reasoning for final quality gate)

**Do not use directly.** Invoked automatically after tester.

---

## 🎯 How to Use the Pipeline

### Using the `/ship` Command

The `/ship` command orchestrates the entire pipeline automatically:

```
/ship add rate limiting to the login endpoint
```

```
/ship build a user settings page with email notification preferences
```

```
/ship refactor the payment module to support multiple currencies
```

**What happens:**
1. Planner creates spec → `.pipeline/spec.md`
2. If spec has OPEN QUESTIONS → pipeline stops, shows questions
3. Coder implements spec → `.pipeline/changes.md`
4. Tester writes and runs tests → `.pipeline/test-results.md`
5. If tests fail → pipeline stops, shows failures
6. Reviewer gives final verdict → `.pipeline/review.md`
7. Result shown to you for manual review

**The pipeline never merges automatically.** You review the final output in the morning.

---

## 📋 Pipeline Files

All pipeline agents communicate through files in `.pipeline/`:

- `.pipeline/spec.md` - Detailed implementation plan (from Planner)
- `.pipeline/changes.md` - Summary of what was built (from Coder)
- `.pipeline/test-results.md` - Test results (from Tester)
- `.pipeline/review.md` - Final verdict (from Reviewer)

These files should be committed to track the full feature development history.

---

## 🔧 Direct Agent Usage

### When to Use Architecture Agents Directly

Use `@backend-architect` or `@frontend-architect` when you need:
- Design advice and architectural guidance
- To review an existing system
- To plan before using `/ship`
- Expert consultation on specific technical decisions

### When to Use Pipeline Agents Directly

**Generally, don't.** Use `/ship` instead.

The only exception is debugging the pipeline itself or running a single stage manually for testing.

---

## 🎨 Design Principles

### Separation of Concerns
Each agent does ONE thing well. The planner plans. The coder codes. The tester tests. The reviewer reviews. No agent does another's job.

### No Self-Review
The reviewer cannot edit code. This prevents the bias that comes from reviewing your own work. Models that can fix what they judge tend to be lenient on their own output.

### Stop on Failure
If any stage fails (ambiguous spec, failing tests, blocked review), the pipeline stops immediately and reports exactly what went wrong. No silent failures. No patching around problems.

### Observable Process
Every decision, every change, every test result is written to `.pipeline/`. You can see exactly what each agent did and why.

### Overnight Async
The pipeline is designed to run overnight. You give it a feature request before bed. In the morning, you review the complete output: spec, code, tests, and final verdict.

---

## 📚 Additional Resources

- `CLAUDE.md` - Core behavioral guidelines for all agents
- `Claude.md` - Project-specific coding standards
- `.claude/commands/ship.md` - Ship command implementation details

---

## 🚨 Common Pitfalls

1. **Don't invoke pipeline agents directly** - Use `/ship` command
2. **Don't expect automatic merging** - Pipeline outputs for your review
3. **Don't skip stages** - Each stage depends on the previous one
4. **Don't fix failing tests yourself immediately** - Let the reviewer decide if it's a test issue or code issue
5. **Read OPEN QUESTIONS** - If the planner flags ambiguities, clarify before proceeding

---

## 🆘 Troubleshooting

**Pipeline stopped with OPEN QUESTIONS?**
→ Clarify the ambiguity, then re-run `/ship` with more details

**Tests failing?**
→ Check `.pipeline/test-results.md` for details. Decide if it's a code bug or test issue.

**Reviewer says NEEDS WORK?**
→ Check `.pipeline/review.md` for specific issues and locations to fix

**Reviewer says BLOCK?**
→ Critical issue found. Read the review carefully before proceeding.

---

*Last updated: June 20, 2026*

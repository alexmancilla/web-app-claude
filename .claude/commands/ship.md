Run the full feature pipeline for: $ARGUMENTS

Execute these stages in order. Do not skip ahead. After each stage, confirm the handoff file exists before starting the next.
Delegate to the planner subagent with the feature request above. Wait for .pipeline/spec.md.
If the spec has OPEN QUESTIONS, stop and show them to me. Otherwise delegate to the coder subagent. Wait for .pipeline/changes.md.
Delegate to the tester subagent. Wait for .pipeline/test-results.md. If tests failed, stop and show me the failures.
Delegate to the reviewer subagent. Show me .pipeline/review.md.
Report the final verdict. Do not merge anything. Leave the branch for my morning review."
How to use it: Open Claude Code and type:
/ship add rate limiting to the login endpoint
Or:
/ship build a user settings page with email notification preferences
Or:
/ship refactor the payment module to support multiple currencies
The orchestrator fires the Planner with your feature request. The Planner writes the spec. The Coder reads the spec and builds the feature. The Tester writes and runs tests. The Reviewer gives the final verdict. If anything goes wrong at any stage the pipeline stops and tells you exactly what happened.

# Security policy

## Reporting a vulnerability

<!-- TODO: set disclosure address before first publish -->
Disclosure address: **TBD** — do not file public issues for security reports until this is set.

## Type-safety posture

This package ships TypeScript declarations and tiny pure-value enums. It has no runtime, no network, no DOM, no secrets, and no token handling.

- Public package: any change to a shipped type is a SemVer-impacting event for external integrators.
- Breaking type changes are major-version bumps; additive changes (new optional fields, new exports) are minor; bugfix-only changes are patch.
- The `files` allowlist (`dist/`, `README.md`, `LICENSE`, `package.json`) means no source, no tests, no internal scripts leak into the published tarball.

# @final-commerce/final-types

Public TypeScript contract types for Final Commerce POS — consumed by render, command-frame, manhattan-builder, and any external integrator building flows/extensions/shells against the POS surface.

## Status

Project Zero scaffolding. No types yet — Plan 3b onward lifts the canonical type definitions into this package. Render's existing types are canonical; command-frame and others import from here going forward.

## Installation

```bash
npm install @final-commerce/final-types
```

This package is intended to be **public** (registry choice — npmjs.com vs GitHub Packages public visibility — deferred to first-publish day). During the extraction phase, consumers use a workspace `file:` reference instead.

## What's in here

Once Plan 3b+ lands:

- Active-entity domain shapes (`ActiveOrder`, `ActiveCustomer`, `ActiveProduct`, `ActiveUser`, `ActiveStation`, `ActiveCart`, `ActiveCompany`, `ActiveOutlet`, ...)
- Order / cart / refund / payment / summary / line-item shapes
- Wire types: `MongoId`, `Margins`, etc.
- Extension-host context types: `CFContextRender`, `CFContextManage`, `CFOutletInfo`, `CFProjectName`, `CFContext`
- Typed state-machine atoms: `PaymentState`, `FulfillmentState`, `ConditionOperator`, ...

## Rules

- Zero runtime dependencies. No React, no DOM, no Auth0, no fetch.
- `sideEffects: false`. Fully tree-shakeable.
- Tiny pure-value enums are allowed; everything else is types only.
- Render is the canonical source for shape decisions; command-frame and others reconcile to Render's shape.
- When command-frame needs extra fields, it defines `CFFoo extends Foo` rather than redefining.

## Local development

```bash
npm install
npm run build       # tsc + tsc-alias + generate-exports
npm test            # vitest + tsd
npm run lint
```

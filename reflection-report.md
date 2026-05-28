# Reflection Report — Design Patterns Exercise
**GOMYCODE Master in Software Engineering**
**Student:** Darlyn-Roland ONDO-NDONG
**Exercise:** Introduction to Design Patterns and Procedural Programming

---

## What Challenges Did I Face During the Refactor?

The primary challenge was shifting my mental model from *writing instructions* to *designing an interface*. In the procedural version, I simply declared functions and a global variable — everything was immediately accessible and modifiable from anywhere. When refactoring to the Module Pattern, I had to deliberately decide what should be **private** (the `_cart` array and helper functions like `_find` and `_calcTotal`) versus what should be **public** (the API methods exposed through the returned object).

A secondary challenge was handling the `getItems()` method safely. Since JavaScript objects and arrays are passed by reference, naively returning `_cart` directly would have allowed consumers to mutate the internal state from outside the module — defeating the entire purpose of encapsulation. The solution was to return a cloned copy using `.map(item => ({ ...item }))`, which required thinking carefully about data integrity.

---

## How Did Using a Design Pattern Improve the Code?

The Module Pattern improved the code in three concrete ways:

1. **Encapsulation:** The `_cart` array is fully private. No external code can accidentally overwrite or corrupt it — only the module's own methods can touch it. In the procedural version, any part of the program could reassign `cart = null` and break everything silently.

2. **Single Responsibility:** Each method does exactly one thing, and they all operate on the same shared private state. Adding validation (e.g., rejecting negative quantities) was straightforward since there is only one entry point for each operation.

3. **Scalability:** Adding new features — like a `getCount()` method or a discount system — requires only adding a new property to the returned object, without touching or risking the existing logic.

---

## When Would You Choose a Design Pattern Over Procedural Code?

Procedural code is perfectly appropriate for small, isolated scripts: a one-off data migration, a CLI utility, or a quick prototype. The overhead of designing a pattern is not justified when the code will never grow.

A design pattern becomes the right choice when:

- **Multiple developers** will work on the same codebase — patterns communicate intent and enforce contracts.
- **State needs to be protected** from accidental mutation across different parts of the application.
- **The system will scale** — more features, more edge cases, more tests.
- **The same logic will be reused** in different contexts (e.g., multiple cart instances in a multi-tenant e-commerce app would call for Singleton or Factory).

In a professional front-end context like React, this same principle is why Redux and the Module/Singleton patterns underpin state management: global mutable state is the leading source of hard-to-trace bugs, and patterns exist precisely to eliminate that class of problem.

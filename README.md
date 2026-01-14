# MuleShield.ai — SaaS Website & Demo Dashboard

MuleShield.ai is a **real-time money mule detection platform for banks**, designed as a SaaS that analyzes transaction behavior and returns instant risk decisions.
This repository contains the **frontend website and demo dashboard** used to showcase the product concept and live detection flow.

---

## What This Repository Contains

This repository focuses on the **product-facing layer** of MuleShield.ai:

* Public SaaS landing page
* Interactive demo dashboard
* Simulated transaction flows for fraud detection
* UI to visualize risk scoring and decision output

> This is a **prototype and demonstration interface**, not a production banking system.

---

## Product Overview

Banks lose significant money to **money mule accounts**—legitimate-looking user accounts that are used to relay stolen funds.
MuleShield.ai addresses this by analyzing **behavioral patterns and transaction flow** in real time and assigning a mule-risk score before funds leave the system.

This website demonstrates:

* How banks would interact with MuleShield.ai as a SaaS
* How suspicious behavior is detected and surfaced instantly
* How decisions remain explainable and actionable

---

## Key Pages

### Landing Page (`/`)

* Explains the MuleShield.ai value proposition
* Describes how the SaaS integrates with banks
* Highlights real-time detection and explainability

### Demo Dashboard (`/demo`)

* Simulates a bank fraud-operations view
* Shows live transaction events
* Displays risk scores, risk levels, and detection signals
* Allows simulation of:

  * Normal transactions
  * Mule-like suspicious transactions

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Design:** Dark theme, neutral tones, bank-grade UI

No authentication, payments, or user profiles are included, as this is a focused demo.

---

## How the Demo Works

1. A simulated “bank client” triggers transaction events
2. The UI mimics how MuleShield.ai would analyze those events
3. Risk scores and detection signals update instantly
4. The dashboard visually distinguishes normal vs mule behavior

All data is **mocked for demonstration purposes**.

---

## Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or yarn

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## Project Status

This is a **hackathon prototype** intended to:

* Demonstrate product vision
* Validate UX and interaction flow
* Support live demos and judging

Backend services (risk engine, graph intelligence, streaming pipeline) are **simulated or mocked** at this stage.

---

## Future Scope (Not Implemented Here)

* Real-time backend integration
* Bank-specific configuration
* Multi-tenant SaaS support
* Advanced network graph analysis
* Compliance-grade audit logging

---

## Team

**MuleShield.ai**
Built by Team *Codeholics*
Hackathon: *Innovate 3.0 — JIIT Noida*

---

## Disclaimer

This project is a **demonstration prototype**.
It does not process real banking data and is not intended for production or regulatory use.

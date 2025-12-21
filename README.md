# Project Risk Manager

## Overview

Application to manage risks in projects, built with [Next.js](https://nextjs.org/).

### Functional Requirements

1. Risk Assessment & Classification

   - FR-01: The system shall allow users to categorize risks based on impact type: **Threats** (negative) or **Opportunities** (positive).

   - FR-02: The system shall provide a classification scale (e.g., Low, Medium, High) to define the **Severity/Level** of each identified risk.

2. Risk Mitigation & Integration

   - FR-03: The system shall enable the association of specific **Contingency Actions** or response plans to each individual risk record.

   - FR-04: The system shall support **Cross-Linking**, allowing one or more risks to be mapped to specific Work Breakdown Structure (WBS) tasks or project activities.

3. Financial Modeling

   - FR-05: The system shall calculate the **Expected Monetary Value (EMV)** for risks, accounting for both potential losses (from threats) and potential financial gains (from opportunities).

   - FR-06: The system shall aggregate risk-adjusted costs to calculate the **Total Project Cost**, including contingency reserves.

4. Data Visualization & Reporting

   - FR-07: The system shall generate real-time **Data Visualizations** with charts to represent the risk profile.

   - FR-08: The system shall provide a **Reporting Engine** capable of exporting comprehensive risk summaries into **PDF format**, filtered by project.

### View Images

The application's screenshots are available in the image directory; click [here](./images) to view them.

---

## Installation

First, you need to have [Node.js](https://nodejs.org/en/) installed on your computer.

Then, start in developer mode with the command:

```bash
npm run dev
```

Or, start in production mode:

```bash
npm run build && npm run start
```

The application will run at http://localhost:3000. For full execution, a connection to the system's [API](https://github.com/iuryveloso/api_project-risk-manager) is required.

The system settings should be configured through a `.env` file, which can be created from the `.env example` file.

It is also possible to use [Docker](https://docs.docker.com/engine/install/) to run this application. To do so, simply use the command below in the system's [API](https://github.com/iuryveloso/api_project-risk-manager) directory:

```bash
docker compose up -d
```

Enjoy!

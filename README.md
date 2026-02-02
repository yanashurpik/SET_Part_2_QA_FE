# Playwright + Cucumber BDD + TypeScript (SauceDemo Automation)

![Playwright Tests](https://github.com/${{ github.repository }}/actions/workflows/ci.yml/badge.svg)

A robust, enterprise-grade test automation framework for end-to-end testing of the SauceDemo application. This project uses **Playwright** for browser automation, **Cucumber BDD** for scenario-driven testing, and **TypeScript** for type-safe code.

## 🌟 Key Features

- **BDD with Cucumber**: Gherkin scenarios for clear communication and documentation.
- **Page Object Model (POM)**: Organized and maintainable UI interaction logic.
- **Advanced Data Management**: Centralized test data using **TypeScript Enums** and Constants in `TestData.ts` for maximum type safety and IDE support.
- **Strict Environment Support**: Configuration via `.env` with validation for critical variables.
- **Rich Reporting**: Comprehensive HTML reports including screenshots, videos, and Playwright traces for failed tests.
- **Edge Case Coverage**: 25+ scenarios including unauthorized access, case-sensitivity, and data limit validations.

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher

## 🚀 Getting Started

1. **Clone and Install**:
```bash
npm install
npx playwright install chromium
```

2. **Environment Setup**:
```bash
cp .env.example .env
# Edit .env to set your BASE_URL and other configs
```

## 🧪 Running Tests

### Execute Full Suite
```bash
npm test
```

### Run with Visual Report
Generates an interactive HTML report after execution.
```bash
npm run test:report
```

### Run Specific Features/Tags
```bash
# By Feature
npx cucumber-js src/features/checkout.feature

# By Tag
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@edge"
```

## 📂 Project Architecture

```
├── src/
│   ├── features/          # Gherkin feature files (Auth, Products, Cart, Checkout)
│   ├── steps/             # Step definitions mapping Gherkin to TS
│   ├── pages/             # Page Object classes (POM)
│   │   ├── BasePage.ts    # Reusable page components
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── ProductsPage.ts
│   │   └── CheckoutPage.ts
│   ├── test-data/         # Centralized Data Management
│   │   └── TestData.ts    # Enums (UserIdentity, ProductKey)
│   └── support/           # Framework plumbing
│       ├── DataManager.ts # Data access utility
│       ├── world.ts       # Custom Cucumber World
│       └── hooks.ts       # Before/After setup
├── reports/               # HTML Test Reports
├── playwright.config.ts   # Browser & trace configuration
└── cucumber.js            # Cucumber CLI options
```

## 📊 Available Test Tags

| Tag | Category | Description |
|-----|----------|-------------|
| `@smoke` | Critical | Core path scenarios for CI/CD |
| `@positive` | Functional | Expected successful interactions |
| `@negative` | Functional | Error handling and validation |
| `@edge` | Robustness | Boundary tests and unauthorized access |
| `@authentication` | Feature | Login and Logout functionality |
| `@products` | Feature | Inventory display and navigation |
| `@cart` | Feature | Cart management (Add/Remove) |
| `@checkout` | Feature | Full checkout journey |

## ✅ Testing Strategy

1. **Type-Safe Data**: Uses Enums in `TestData.ts` so developers get autocomplete for product names and user types.
2. **Context Separation**: `InventoryPage` handles generic navigation, while `ProductsPage` focuses on product-specific interactions.
3. **Traceability**: Every failed test automatically captures a Playwright Trace (`.zip` file) and a screenshot for instant debugging.

---
*Created with ❤️ for SauceDemo E2E Quality Assurance.*

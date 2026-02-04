# Playwright + Cucumber BDD + TypeScript (SauceDemo Automation)

A robust, enterprise-grade test automation framework for end-to-end testing of the SauceDemo application. This project uses **Playwright** for browser automation, **Cucumber BDD** for scenario-driven testing, and **TypeScript** for type-safe code.

## 🌟 Key Features

- **BDD with Cucumber**: Gherkin scenarios for clear communication and documentation.
- **Page Object Model (POM)**: Organized and maintainable UI interaction logic.
- **Advanced Data Management**: Scalable test data structure with logical separation (`users.ts`, `products.ts`, `checkout.ts`).
- **Dockerized Execution**: Consistent test environment locally and in CI.
- **Code Quality**: **ESLint v9** (Flat Config) and **Prettier** for consistent code style and formatting.
- **CI/CD Integration**: Automated testing and linting via **GitHub Actions**.
- **Rich Reporting**: Comprehensive HTML reports including screenshots, videos, and Playwright traces.

## 📋 Prerequisites

- **Node.js**: v18 or higher (for local execution)
- **Docker**: Optional (recommended for containerized execution)

## 🚀 Getting Started

### Local Execution

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

### Docker Execution (Recommended)

Run the entire suite in a consistent environment without installing dependencies locally:
```bash
docker-compose up --build
```

## 🧪 Running Tests

### Execute Full Suite
```bash
npm test
```

### Run with Visual Report
```bash
npm run test:report
```

### Run Specific Features/Tags
```bash
# By Feature
npx cucumber-js src/features/checkout.feature

# By Tag
npx cucumber-js --tags "@smoke"
```

## 🧹 Linting & Formatting

We use ESLint and Prettier to maintain code quality.

- **Check Linting**: `npm run lint`
- **Format Code**: `npm run format`
- **Format Check**: `npm run format:check`

## 📂 Project Architecture

```
├── src/
│   ├── features/          # Gherkin feature files
│   ├── steps/             # Step definitions (TS)
│   ├── pages/             # Page Object classes (POM)
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── ProductDetailPage.ts
│   ├── test-data/         # Scalable Data Structure
│   │   ├── users.ts
│   │   ├── products.ts
│   │   ├── checkout.ts
│   │   └── testData.ts    # Re-exports for easy access
│   └── support/
│       ├── dataManager.ts # Data access utility
│       ├── world.ts       # Custom Cucumber World
│       └── hooks.ts       # Setup & Teardown
├── .github/workflows/     # CI/CD (GitHub Actions)
├── Dockerfile             # Docker config
├── docker-compose.yml     # Docker services
├── eslint.config.mjs      # ESLint v9 configuration
├── .prettierrc            # Formatting rules
└── reports/               # HTML Test Reports
```

## 🚀 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that triggers on push and pull requests to `main` and `master`.

**Pipeline Steps:**
1. **Lint and Type Check**: Ensures code follows stylistic rules and has no type errors.
2. **Build & Run Tests (Docker)**: Builds the Docker image and runs the test suite in a container.
3. **Artifact Upload**: Uploads test reports and traces if any test fails.

## 📊 Available Test Tags

| Tag | Category | Description |
|-----|----------|-------------|
| `@smoke` | Critical | Core path scenarios for CI/CD |
| `@positive` | Functional | Expected successful interactions |
| `@negative` | Functional | Error handling and validation |
| `@edge` | Robustness | Boundary tests and unauthorized access |
| `@authentication` | Feature | Login and Logout functionality |
| `@products` | Feature | Inventory display and navigation |
| `@cart` | Feature | Cart management |
| `@checkout` | Feature | Full checkout journey |

## ✅ Testing Strategy

1. **Type-Safe Data**: Uses logical separation in `test-data/` with a central `DataManager` for maximum type safety and IDE support.
2. **Traceability**: Every failed test automatically captures a Playwright Trace (`.zip` file) and a screenshot for instant debugging.
3. **Environment Parity**: Docker ensures that tests run the same way in CI as they do on a developer's machine.

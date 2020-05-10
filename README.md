# cucumber-puppeteer-example
Integration testing example for the pptr.dev website.

## Overview

This repository showcases how to use the [`cucumber`](https://github.com/cucumber/cucumber-js) Behavior-Driven Development (BDD) testing framework in concert with the Headless Chrome Node.js API [`puppeteer`](https://github.com/puppeteer/puppeteer) for the purpose of integration testing. In practical terms, this equates to using statements to dictate interactions with the Chrome web browser and report results based on interaction success and failure.

### Directory Structure

```bash
├── features
│   ├── selectors
│   │   ├── home.js
│   │   ├── index.js
│   ├── step_definitions
│   │   ├── page_steps.js
│   ├── support
│   │   ├── constants
│   │   │   ├── index.js
│   │   ├── helpers
│   │   │   ├── device.js
│   │   │   ├── getElemHandle.js
│   │   │   ├── index.js
│   │   │   ├── locale.js
│   │   │   ├── location.js
│   │   │   ├── url.js
│   │   ├── actions.js
│   │   ├── scope.js
│   ├── utils
│   │   ├── compose.js
│   │   ├── index.js
│   ├── home.feature
│   ├── hooks.js
├── node_modules
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
```

The `selectors` directory stores mappings of human readable user interface names to CSS selectors. These mappings are used by the `support` code to interact with the headless browser.

The `step_definitions` folder defines the BDD steps that will compose the test scenario by being executed by the headless browser. The `cucumber` statements accept arguments using `RegExp` patterns and invoke corresponding `actions` with these arguments.

The `support` directory houses the `actions` -- simple wrappers for `puppeteeer` methods, which trigger browser interactions -- and related helpers. This folder also includes `scope`, state that can be persisted throughout an integration testing scenario.

### Getting Started

1. Install dependencies.

```bash
npm i
```

2. Run integration test suite.

```bash
# Option 1: Headless Chrome (Test results will be reported via terminal)
npm test

# Option 2: Chromium (Browser interactions will be displayed in Chromium and test results will be reported in terminal)
npm run test:chromium
```

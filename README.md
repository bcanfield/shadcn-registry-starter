
# ShadCN Component Registry & Documentation Template

Welcome to the **ShadCN Component Registry & Documentation Template**! This repository serves as a **template for building a ShadCN component registry**, allowing individuals and organizations to easily **share and display custom components, themes, utilities, and hooks**. It also functions as a **documentation site** to guide users through installation and usage.

> Note: This repository is forked from the official [shadcn ui](https://github.com/shadcn-ui/ui). Many modifications have been made, primarily to strip it down to only provide the registry and documentation portions. If you're looking for the full ShadCN UI functionality, please refer to the [original repo](https://github.com/shadcn-ui/ui).

## Key Features

- **Component Registry**: Define and publish your custom ShadCN components, themes, examples, and hooks.
- **Documentation Site**: Provides an organized structure for documentation using MDX files.
- **Integration with ShadCN CLI**: Easily install components into developer environments.

---

## Table of Contents

1. [Registry Overview](#registry-overview)
2. [Registry File Structure](#registry-file-structure)
3. [Building the Registry](#building-the-registry)
4. [Documentation Overview](#documentation-overview)
5. [Getting Started](#getting-started)
6. [Contributing](#contributing)
7. [License](#license)

---

## Registry Overview

The **ShadCN Component Registry** allows users to download custom components, themes, examples, and hooks using the **ShadCN CLI**. Each registry item is defined by its name, type, dependencies, and the files that make up the registry item.

- **Types of Items**: 
  - Examples
  - UI Components
  - Themes
  - Hooks

These registry items are easily integrated into users' development environments, ensuring they have the proper dependencies and configurations.

---

## Registry File Structure

The `registry` folder contains the core definitions of the components, themes, and other items in the registry:

```
registry/
├── registry-examples.ts
├── registry-hooks.ts
├── registry-themes.ts
├── registry-ui.ts
└── (subfolders for code: examples, hooks, ui, etc.)
```

### File Descriptions:

- **`registry-examples.ts`**: Array of example components.
- **`registry-hooks.ts`**: Array of hooks to be used across different components.
- **`registry-themes.ts`**: Array of custom themes that users can download.
- **`registry-ui.ts`**: Array of UI components available for use.

Each file defines an array of objects representing the individual registry items. The structure for each object includes:

- `name`: The item name, used for downloading.
- `type`: The type of the item (example, theme, hook, etc.).
- `dependencies`: NPM packages that the item depends on.
- `registryDependencies`: ShadCN components required from the official ShadCN registry.
- `files`: Code files that make up this registry item.

The additional subfolders (e.g., `examples`, `hooks`, `ui`) are simply to organize the code files for each of these registry item types.

---

## Building the Registry

To build the registry, use the following command:

```bash
npm run build:registry
```

This command runs the `build-registry.mts` script, which processes the registry files (`registry-examples.ts`, `registry-ui.ts`, etc.), transforming each entry into a JSON file according to the **ShadCN registry schema**. These JSON files are placed in the `public/r/` directory.

The **public registry** files in `public/r/` are then accessible by the ShadCN CLI for users to install the components.

> Note: A `__registry__ ` directory is also generated that exports the `Index` object, which is simply a record of the registry's components. This imported into a couple places to look up a registry component by name, to then grab the relevant files, dependencies, etc.

---

## Documentation Overview

All documentation for the project is written in **MDX** and stored in the `content/docs/` directory. The `build:docs` script uses the **[contentlayer](https://github.com/timlrx/contentlayer2)** package to build and provide type-safe types for the MDX files, making the documentation site easy to maintain.

### File Structure:

```
content/
└── docs/
    └── <documentation files>.mdx
```

### Documentation Build

To build the documentation site, run:

```bash
npm run build:docs
```

The script processes the MDX files, and contentlayer generates type-safe output that is used to serve and statically generate the documentation pages. The documentation site dynamically matches URLs to the MDX slugs to serve the appropriate content.

---

## Getting Started

To get started with this template, follow the steps below:

### 1. Clone the Repo:

```bash
git clone https://github.com/yourusername/shadcn-component-registry-template.git
cd shadcn-component-registry-template
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Build the Registry:

```bash
npm run build:registry
```

### 4. Build the Documentation:

```bash
npm run build:docs
```

### 5. Start the Development Server:

```bash
npm run dev
```

This will start the documentation site and the registry, allowing you to browse and interact with your components.

---

## Contributing

We welcome contributions! If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and ensure the registry and documentation build correctly.
4. Submit a pull request with a description of the changes.

---

## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

**Happy coding!**

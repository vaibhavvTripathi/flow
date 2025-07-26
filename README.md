[![Deployed on Vercel](https://img.shields.io/badge/Live%20Demo-flow--kappa--seven.vercel.app-blue?style=for-the-badge)](https://flow-kappa-seven.vercel.app/)

# Flow Builder

A modern, interactive chatbot flow builder built with Next.js, React, Zustand, and React Flow.


## Features

- 🧩 **Drag-and-drop flow builder** for chatbot logic
- 📝 **Text nodes** with editable messages
- 🔗 **Edge connections** between nodes
- 🖱️ **Node and edge selection** with settings panels
- 🗑️ **Delete nodes and edges** (UI button & keyboard shortcuts)
- 💾 **Save flow** to localStorage
- ✅ **Success/error notifications** (centered in navbar)
- 🎨 **Beautiful, responsive UI** with Tailwind CSS
- ⚡ **Fast state management** with Zustand
- 🧪 **Ready for testing** with Vitest
- 🛠️ **ESLint & Prettier** for code quality and formatting

## Getting Started

### 1. Clone the repository
```bash
 git clone git@github.com:vaibhavvTripathi/flow.git
 cd flow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage
- **Add nodes:** Use the left panel to add new text nodes.
- **Edit nodes:** Click a node, edit its message in the settings panel.
- **Connect nodes:** Drag from a node's handle to another node to create an edge.
- **Edit edges:** Click an edge to view its details and delete it if needed.
- **Delete:** Use the delete button in settings or press `Delete`/`Backspace`.
- **Save:** Click "Save Changes" in the navbar to persist your flow.
- **Notifications:** Success and error messages appear centered in the navbar.

## Project Structure
```
flow/
├── app/                # Next.js app directory
├── components/         # React components (FlowBuilder, Panels, UI)
├── hooks/              # Custom React hooks (useFlow)
├── store/              # Zustand store for flow state
├── public/             # Static assets
├── styles/             # Global styles
├── __tests__/          # Vitest test files (if present)
├── .eslintrc.json      # ESLint config
├── .prettierrc         # Prettier config
├── package.json        # Project metadata & scripts
└── ...
```

## Development

### Linting
```bash
npm run lint
```

### Formatting
```bash
npx prettier --write .
```

### Testing (if enabled)
```bash
npm test
```

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [React Flow](https://reactflow.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) (optional, for testing)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## License

MIT

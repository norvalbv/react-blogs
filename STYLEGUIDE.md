# React-Blogs Style Guide

## Introduction
This README serves as the style guide for the Boston Project's front-end development. It outlines the coding standards, best practices, and naming conventions to ensure consistency and quality.

To preview this document correctly, use the shortcut `⌘⇧V` (Command + Shift + V) for Mac, or `CTRL + SHIFT + V` for Windows.

You also can use the optional [Markdown Preview Github Styling VS Code Extension](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) for better viewing of these markdown files.

---

## Basic Setup

### Formatting and Linting

The project uses automatic formatting and linting via the packages we have installed. The configurations have already been set up so each developer can ensure that their code is formatted and linted in the intended way. However, it's adviseable to use the below VS Code extensions for ease of formatting and linting using keyboard shortcuts etc.

- **Linting**: ESLint
  - **VS Code Extension**: [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  
- **Formatting**: Prettier
  - **VS Code Extension**: [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - **Additional Formatter**: [rvest.vs-code-prettier-eslint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

---

## Notable VS Code Extensions

These are some of the VS Code extensions that we use on a daily basis to help aid development.

- [Alphabetical Sorter](https://marketplace.visualstudio.com/items?itemName=ue.alphabetical-sorter): `ue.alphabetical-sorter`
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag): `formulahendry.auto-rename-tag`
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments): `aaron-bond.better-comments`
- [Colour Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight): `naumovs.color-highlight`
- [Jest Snapshot Testing Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=tlent.jest-snapshot-language-support) `tlent.jest-snapshot-language-support`
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors): `yoavbls.pretty-ts-errors`
- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): `bradlc.vscode-tailwindcss`

---

## How to Write Comments

Use the following keys for comments, as per the [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension:

- `*` for highlighting important information
- `!` for warnings
- `?` for questions
- `TODO` for to-dos
- Standard comments for everything else

**Examples**
```tsx
/**
 * * Important
 * ! Warning
 * ? Question
 * TODO todo
 * Standard comment
 */

// You can also use these comments using the inline syntax.
// ! Warning
// ? Question
// TODO todo
// * Important
// Standard comment
```

---

## Typing

### Use types over interfaces
Use TypeScript `type` for defining types, props, and state, rather than `interface`, to prevent accidental type reopening, which can cause runtime and compile-time errors.

👍 **Good Example**
```tsx
type Props = {
  name: string;
};
```

👎 **Bad Example**
```tsx
interface Props {
  name: string;
}
```

### No usage of FC in React
The usage of `FC` or `FunctionComponent` in React TypeScript is considered outdated. It can lead to various issues, as outlined [here](https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13).

Do not use `FC`, `React.FC`, or `FunctionComponent` as to define a component, instead use `ReactElement`. The only expection to this is when explicitly setting all props to required in a test. For example: `const AccordionWithAllProps: FC<Required<AccordionProps>> = Accordion;`

👍 **Good Example**
```tsx
type Props = {
  name: string;
};

const HelloWorld = ({ name }: Props): ReactElement => <div>Hello, {name}</div>;
```

👎 **Bad Example**
```tsx
type Props = {
  name: string;
};

const HelloWorld: React.FC<Props> = ({ name }) => <div>Hello, {name}</div>;
```

### Use ReactElement over JSX.Element
Use the React's TypeScript type of `ReactElement` for defining components and their return value rather than `JSX.Element`. Both are types are idententical except the fact that `JSX.Element` has its types and props set to any (via `<any, any>`). This intended difference is mainly due when needing to build custom JSX factories, this is not what we want. Read more about the differences [here](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement).

👍 **Good Example**
```tsx
type Props = {
  children: ReactElement | ReactElement[];
};
```

👎 **Bad Example**
```tsx
type Props = {
  children: JSX.Element | JSX.Element[];
};
```

### Naming prop types and return value types

- For props and function return values, the naming must kept as what they are, `Props` and `ReturnValue`, this allows for quick understanding of intended use for that type. There are a few exceptions for this. Firstly, if there is more than one type for props and/or return type in a single file whereby you need numerous attributes, you instead should name the types with their prepended function name in camel case. If the type is shared among various functions *within the same file*, you can ignore the prepended function name. Secondly, if you are importing a common type which is shared across numerous instances and files you should not rename the type. There is no need to worry about extending or re-opening the type as this can only be done with interfaces, which you should not use.

- When importing the prop or return type from another file, you can optionally change the import to be an alias following the pattern above (prepending function name whilst keeping camel case).

- Props should always be destructured unless the function receives a *single* parameter input. When the props are destructured, the prop type must be kept outside of the function and *not* inline it. Inline props are fine for non-destructured parameters. The same occurs with the return type, when having an explicit return type such as `number` you can inline this.

👍 **Good Examples**
```tsx
type Props = {
  input: string;
};

type ReturnValue = {
  input: string;
  example: string;
}

const HelloWorld = ({ input }: Props): ReturnValue => {
  const example = 'string';
  return { input, example };
};
```

```tsx
const HelloWorld = (): number => {
  return 1 + 1
};
```

```jsx
type HelloWorldProps = {
  input: string;
};

type HelloWorldReturnValue = {
  input: string;
  example: string;
};

const HelloWorld = ({ input }: HelloWorldProps): HelloWorldReturnValue => {
  const example = 'string';
  return { input, example };
};

type HelloWorldTwoProps = {
  input: number;
};

type HelloWorldTwoReturnValue = {
  input: number;
  example: number;
};

const HelloWorldTwo = ({ input }: HelloWorldTwoProps): HelloWorldTwoReturnValue => {
  const example = 10;
  return { input, example };
};
```

```jsx
type Props = {
  input: string;
};

type ReturnValue = {
  input: string;
  example: string;
};

const HelloWorld = ({ input }: Props): ReturnValue => {
  const example = 'string';
  return { input, example };
};

const HelloWorldTwo = ({ input }: Props): ReturnValue => {
  const example = 'this string is an example';
  return { input, example };
```

👎 **Bad Examples**
```tsx
const HelloWorld = ({ input }: { input: string }): {
  input: string;
  example: string;
} => {
  const example = 'string';
  return { input, example };
};

type ReturnValue = number

const HelloWorld = (): ReturnValue => {
  return 1;
};
```

### Importing types from other files

If you need to use `Props` or `ReturnValue` from another file the type must only be renamed to match the above conventions if there is more than one type with the same key, for example if you import type `Props` from two separate files. Moreover, if you have types which are used as `Props` or `ReturnValue` that are common and kept outside any component folder, e.g., in a types file, you should use the explicit naming of the props as the input or output in the function where they are used.

👍 **Good Examples**
```tsx
import { Props, ReturnValue } from 'components/HelloWorld';

const someFunction = (props: Props): ReturnValue => {
  return {...};
};
```

```tsx
import { Props as HelloWorldProps, ReturnValue as HelloWorldReturnValue } from 'components/HelloWorld';
import { Props as GoodbyeWorldProps, ReturnValue as GoodbyeWorldReturnValue } from 'components/GoodbyeWorld';

const someFunction = (props: HelloWorldProps): HelloWorldReturnValue => {
  return {...};
};

const someOtherFunction = (props: GoodbyeWorldProps): GoodbyeWorldReturnValue => {
  return {...};
};
```

```tsx
import { Example } from 'types/example';

const someFunction = (props: Example): Example => {
  return {...};
};
```

---

## Documentation

### TSDOC
The usage of [TSDOC](https://tsdoc.org/) for function components is optional. Use it for complicated components when necessary.

### Comments
Only use comments when providing explicit examples or guidance. Avoid superfluous comments that add no value.

👍 **Good Examples**
```tsx
// Stores the value of data received by the Warnings API.
const arbitraryVariableName = data;

// Custom hook for HTTP Get requests
const useRequest = () => {}
```

👎 **Bad Example**
```tsx
// page name
const pageName = "Home";
```

---

## Language

### Use American English
Always use American English for naming variables, props, types, and functions, as most packages are written in American English. This makes it easier to pass props and handle variable names.

Comments are optional and you can choose between American or British English on an ad-hoc basis.

---

## Naming Conventions

### Casing

- Components and their folders should follow `PascalCase`.
- Everything else should be in `camelCase`.

*Note*: The backend deals with data in `snake_case`, we change the casing to `camelCase` when receiving data on the front end and vice versa when sending data to the backend.

👍 **Good Example**
```tsx
type Props = {
  firstName: string;
};

const lastName = 'Smith'

const HelloWorld = ({ firstName }: Props) => <div>Hello, {firstName} {lastName}</div>;
```

👎 **Bad Example**
```tsx
type Props = {
  first_name: string;
};

const last_name = 'Smith'

const HelloWorld = ({ first_name }: Props) => <div>Hello, {first_name} {last_name}</div>;
```

---

## Folder and file standards

### Structure

All folders should be named for what they are and have an `index`'ed file within.

👍 **Good Examples**
```bash
components/Accordion/index.tsx

services/dataApiService/admin/index.ts
```

👎 **Bad Examples**
```bash
components/Accordion.tsx

services/dataApiService/admin.ts
```

### File extensions

Only use the minimum needed file extension. For example, do not use `.tsx` extensions when only `.ts` is needed.

---

## Color Standards

### Use HEX and Capitalize
Always use capitalized HEX values for colors to maintain consistency.

👍 **Good Example**
```tsx
const textColor = "#D2FF9D";
```

👎 **Bad Examples**
```tsx
const textColor = "#d2ff9d";

const textColor = 'rgb(236, 199, 240)'
```

--- 

## Testing

### Testing small to medium-sized UI components (bricks).

Snapshot tests are well-suited for testing small to medium-sized UI components or "bricks" in the app. These components are typically stateless and primarily responsible for rendering UI elements based on input props.

### Components with relatively static rendering.

Snapshot tests are most effective when you expect the output of a component to be relatively static. In other words, if a component's rendering logic doesn't change frequently, snapshot tests can help catch unexpected changes.

### Visual regression testing to ensure UI consistency.

Snapshot tests are excellent for visual regression testing. They capture a snapshot of the rendered component output and can alert you to any unintended visual changes. This is particularly valuable for ensuring UI consistency across updates.

### Complement other tests for dynamic components.

Snapshot tests are less suitable for components that render dynamic content or have frequent changes in their rendering output. For dynamic components, consider other testing methods like e2e test using `cypress` and `gherkin`.
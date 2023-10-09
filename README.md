**Note: React Blogs is heavily in beta, expect the package to undergo drastic changes.**

The React Blogs package is simple wrapper for quickly generating blogs from your already existing markdown files. 

# Why React-Blogs?

If you are looking for a quick set up for rendering your blogs in React without the hassle of dealing with front matter, dynamic imports, link routing, or styling this a package to help fix those issues and get you set up as quickly as possible. The package also comes automatic link processing if you are using a tool like Obisidian.md to write your markdown files.

Listed benefits:
- Easy set up
- Default styling and easy overrides
- Automatic link processing
- Automatic front matter parser
- Typescript ready

# Installation

Using NPM:
```bash
    npm install react-blogs
```

Using Yarn:
```bash
    yarn add react-blogs
```

# Basic Usage

```tsx
import Blog, { DefBlogs } from 'react-blogs';

// specify your blogs:
  const allBlogs: DefBlogs = [
    {
      id: 'Memory (RAM)',
      file: '/src/assets/blogs/memory.md',
      title: { text: 'How Memory (RAM) Works' },
      subtitle: { text: 'A deep insight to what RAM is and how it interacts with the computer.' },
      url: 'how-memory-works',
      showFrontMatter: true,
      metadata: {
        'read time': '20 minutes',
        level: '🧠🧠',
        'date posted': 'Monday, 28th August 2023',
      },
    },
  ];

  // overridding custom themes:
  const theme: DefTheme = {
    theme: 'SHADES_OF_GREEN',
    code: 'oneLight',
    overrides: {
      p: {
        props: { className: 'text-[14px] my-4 tracking-wider' },
      },
    },
  };

// Render Blog
return <Blog allBlogs={allBlogs} theme={theme} />
```

# A Deeper Dive

React Blogs is a heavily abstracted version of [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) and uses this as its main method for rendering each blog. By default React Blogs allows you to override any of the styles provided and follows the shape from the overrides object in `markdown-to-jsx`. Therefore, if you are looking to do anything more than simply render the default styles, it's heavily advised for you to read te overrides section within the `markdown-to-jsx` documentation [here](https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation).

## Defining your blogs

- DefBlogs, an array of objects that contains the following types.

- id *(required)*:
```tsx
    string
```
Usage for keys around the package. If you are connecting blogs that use double-bracket links such as [[link-here]], the key inside the link is used as a comparison against the ID to check if it should be rendered as a link or not. For example, [[CPU#What-Is-CPU|cpu]] the key CPU is checked against all of your blog IDs and if it's present, it will be rendered as a link.

- file *(required)*:
```tsx
    string
```
The link to your markdown file. **Note**: This must be an absolute link, not relative.

- title *(required)*:
```tsx
  label: string | ReactElement;
  className?: string; // Overrides any of the default styles for that title 
  level?: 1 | 2 | 3; // Convays the level of the heading node (h1, h2, or h3)
  testId?: string; // Optional test ID
```
A title component that renders the title for your react blog. Renders either a h1, h2, or h3 element and default styles can be overriden by passing styles to the `className` prop. 

- subtitle *(optional)*:
```tsx
  label?: string | ReactElement;
  className?: string; // Overrides any of the default styles for that subtitle 
  testId?: string; // Optional test ID
```
A subtitle component that renders the title for your react blog. Renders a h4 element and default styles can be overriden by passing styles to the `className` prop. 

- description *(optional)*:
```tsx
  label?: string | ReactElement;
  className?: string; // Overrides any of the default styles for that description 
  testId?: string; // Optional test ID
```
A description component that renders the title for your react blog. Renders p element and default styles can be overriden by passing styles to the `className` prop. 

- url *(required)*:
```tsx
    string
```
This is the URL for that blog.

- showFrontMatter *(optional)* - default false:
```tsx
    string
```
If your markdown file contains any front matter, it will automatically get parsed, processed, and styled. If you do not want to render any front matter for that blog, simply set this to false. See our front matter overview for guidance on how to use this.


- metadata *(optional)*:
```tsx
    Record<string, string>
```
Renders any meta data you may want about your blog in fine print. For example, you can specify the date posted, read time, or prerequisites.

Example of using `defBlogs`:
```tsx
  import { DefTheme } from 'react-blogs';

  const allBlogs: DefTheme = [
    {
      id: 'Memory (RAM)',
      file: '/src/assets/blogs/memory.md',
      title: { text: 'How Memory (RAM) Works' },
      subtitle: { text: 'A deep insight to what RAM is and how it interacts with the computer.' },
      description: { text: 'A deep insight to what RAM is and how it interacts with the computer.' },
      url: 'how-memory-works',
      showFrontMatter: true,
      metadata: {
        'read time': '20 minutes',
        level: '🧠🧠',
        'date posted': 'Monday, 28th August 2023',
      },
    },
  ];
```

## Defining your theme

By default, if no theme is provided the app will use the custom theme of `PLAIN_DARK` which all text will be various shades of white, the elements wouldn't be seen on white backgrounds. Therefore, if you want any form of colour or you use a lighter background, you should specify a theme. You can use one of our custom ones or completely write your own theme.

As React Blogs purpose is to be a quick set up, it's advised to use one of our default themes and override certain styles rather than defining your own entire theme.

### Attributes:

- DefTheme, an optioanl objects that contains the following types.

- theme *(optional)* - default PLAIN_DARK:
```tsx
   'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN'
```
Our current default themes. Again, it is advisable to use one of these and override each element rather than create your own entire theme.

- code *(optional)* - default vsDark:
We use [PrismJS](https://prismjs.com/) for rendering our syntax highlighted code blocks, the themes are already pre-defined and the inputted code type must be one of the distributed PrismJs themes.

- overrides *(optional)*:
Here, you can specify overrides for any of the elements that are rendered from the React Blogs package. We use [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation) to render markdown and the shape of the overrides matches the same shape we use. You can pass any props to the rendered element and passing a className prop will completely override the styles. You can also pass a component directly to change the HTML tag or change how it is rendered out. For a more detailed description of how this works, check the markdown-to-jsx package.

Here you can also change how the metadata is rendered, but please note that instead of passing children inside the element, you must pass metadata that comes from props.

Example of using `defTheme`:
```tsx
  import { DefBlogs } from 'react-blogs';
  import useTheme from 'hooks/useTheme';

  const MyParagraph = ({ children, ...props }) => <div {...props}>{children}</div>

  const { isDarkMode } = useTheme();

  const theme: DefTheme = {
    theme: isDarkMode ? 'SHADES_OF_GREEN' : 'SHADES_OF_PURPLE',
    code: isDarkMode ? 'dracula' : 'oneLight',
    overrides: {
      p: {
        component: MyParagraph,
        props: { className: 'text-[14px] my-4 tracking-wider' },
      },
      metadata: {
        component: ({...props}) => <p {...props}>{props.metadata}</p>,
        props: { className: 'text-[14px] my-4 tracking-wider' },
      },
    },
  };
```

## The Blog component

The blog component renders both the blogs dashboard and the the individual blogs so there is only one import to be concered about.

You can pass your blogs and theme to the `Blog` component.

```tsx
    import Blog from 'react-blogs';

    // definition of blogs and theme omitted for brevity.

    return <Blog allBlogs={allBlogs} theme={theme} />
```

# Roadmap
- [ ] Add more themes
- [ ] Better customisation for the react-blogs homepage
- [ ] Ability to add custom components inside each blog, for example rendering a hero
- [ ] Add better accessibility to rendered JSX nodes

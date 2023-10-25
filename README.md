**Note: React Blogs is heavily in beta, expect the package to undergo drastic changes.**

The React Blogs package is a simple wrapper for quickly generating blogs from your already existing markdown files. 

# Why React-Blogs?

If you are looking for a quick set-up for rendering your blogs in React without the hassle of dealing with front matter, dynamic imports, link routing, or styling, this is a package to help fix those issues and get you set up as quickly as possible. The package also comes with automatic link processing if you are using a tool like Obisidian.md to write your markdown files.

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
      title: { label: 'How Memory (RAM) Works' },
      subtitle: { label: "The computer's short-term memory." },
      description: { label: 'A deep insight into what RAM is and how it interacts with the computer.' },
      url: 'how-memory-works',
      frontMatter: {
        showFrontMatter: true;
        delimiter: '-- YAML --';
      };
      metadata: {
        'read time': '20 minutes',
        level: '🧠🧠',
        'date posted': 'Monday, 28th August 2023',
      },
    },
  ];

  // overriding custom themes:
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
return <Blog allBlogs={allBlogs} theme={theme} paramkey="title" />
```

# A Deeper Dive

React Blogs is a heavily abstracted version of [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) and uses this as its main method for rendering each blog. By default, React Blogs allows you to override any of the styles provided and follows the shape from the overrides object in `markdown-to-jsx`. Therefore, if you are looking to do anything more than simply render the default styles, it's heavily advised for you to read the overrides section within the `markdown-to-jsx` documentation [here](https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation).

## Defining your blogs

- DefBlogs, an array of objects that contains the following types.

- id *(required)*:
```tsx
    string
```
If you are linking blogs that use double-bracket links such as [[link-here]], the key inside the link is used as a comparison against the ID to check if it should be rendered as a link or not. For example, [[CPU#What-Is-CPU|a CPU insight]] the key CPU is checked against all of your blog IDs and if it's present, it will be rendered as a link.

- file *(required)*:
```tsx
    string
```
The link to your markdown file. **Note**: This must be an absolute link, not a relative one.

- title *(required)*:
```tsx
{
  label: string | ReactElement;
  className?: string; // Overrides any of the default styles for that title 
  level?: 1 | 2 | 3; // Convays the level of the heading node (h1, h2, or h3)
  testId?: string; // Optional test ID
}
```
A title component that renders the title for your react blog. Renders either a h1, h2, or h3 element and default styles can be overridden by passing styles to the `className` prop. 

- subtitle *(optional)*:
```tsx
{
  label?: string | ReactElement;
  className?: string; // Overrides any of the default styles for that subtitle 
  testId?: string; // Optional test ID
}
```
A subtitle component that renders the title for your react blog. Renders a h4 element and default styles can be overridden by passing styles to the `className` prop. 

- description *(optional)*:
```tsx
{
  label?: string | ReactElement;
  className?: string; // Overrides any of the default styles for that description 
  testId?: string; // Optional test ID
}
```
A description component that renders the title for your react blog. Renders p element and default styles can be overridden by passing styles to the `className` prop. 

- url *(required)*:
```tsx
    string
```
This is the URL for that blog.

- frontMatter *(optional)*:
```tsx
{ 
  showFrontMatter?: boolean; // Optional - Default true
  position?: 'top' | 'bottom' // Optional - default undefined (setting position to top)
  /**
   * Optional delimiter for your front matter, for example '---', '-- YAML --', or ';;;'
   * 
   * Default '---'
   */
  delimeter?: string;
}
```
If your blog contains front matter, React Blogs allows you to parse it and render out the data. You can optionally override the styling from inside your overrides section in `defTheme`. This is perfect if you want to display data in your blog, for example, reading time, date created, list of users, etc. If no front matter is present, React Blogs will use the data defined in your metadata to render front matter. Lastly, if no front matter or metadata is provided, nothing will be rendered. You can display neither front matter nor metadata by simply setting `showFrontMatter` to false.

- metadata *(optional)*:
```tsx
    Record<string, string>
```
Renders any metadata you may want about your blog in fine print. For example, you can specify the date posted, read time, or prerequisites.

Example of using `defBlogs`:
```tsx
  import { DefTheme } from 'react-blogs';

  const allBlogs: DefTheme = [
    {
      id: 'Memory (RAM)',
      file: '/src/assets/blogs/memory.md',
      title: { label: 'How Memory (RAM) Works' },
      subtitle: { label: "The computer's short-term memory." },
      description: { label: 'A deep insight into what RAM is and how it interacts with the computer.' },
      url: 'how-memory-works',
      frontMatter: {
        showFrontMatter: true;
        delimiter: '---';
      };
      metadata: {
        'read time': '20 minutes',
        level: '🧠🧠',
        'date posted': 'Monday, 28th August 2023',
      },
    },
  ];
```

## Defining your theme

By default, if no theme is provided the app will use the custom theme of `PLAIN_DARK` which all text will be various shades of white - the elements wouldn't be seen on white backgrounds. Therefore, if you want any form of colour or you use a lighter background, you should specify a theme. You can use one of our custom ones or completely write your own.

As React Blogs' purpose is to be a quick set-up, it's advised to use one of our default themes and override certain styles rather than defining your own entire theme.

### Attributes:

- DefTheme, is an optional object that contains the following types.

- theme *(optional)* - default PLAIN_DARK:
```tsx
   'PLAIN_DARK' | 'PLAIN_LIGHT' | 'SHADES_OF_PURPLE' | 'SHADES_OF_GREEN'
```
Our current default themes. Again, it is advisable to use one of these and override each element rather than create your own entire theme. **More themes are coming soon.**

- code *(optional)* - default vsDark:
We use [PrismJS](https://prismjs.com/) for rendering our syntax-highlighted code blocks, the themes are already pre-defined and the inputted code type must be one of the distributed PrismJs themes.

- overrides *(optional)*:
Here, you can specify overrides for any of the elements that are rendered from the React Blogs package. We use [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation) to render markdown and the shape of the overrides matches the same shape we use. You can pass any props to the rendered element and passing a className prop will completely override the styles. You can also pass a component directly to change the HTML tag or change how it is rendered out. For a more detailed description of how this works, check the markdown-to-jsx package.

Here you can also change how the metadata is rendered, but please note that instead of passing children inside the element, you must pass metadata that comes from props.

Example of using `defTheme`:
```tsx
  import { DefBlogs } from 'react-blogs';
  import useTheme from 'hooks/useTheme';

  // Overridden components must be kept outside of function to avoid errors.
  const MetadataComponent = ({...props}) => <p {...props}>{props.metadata}</p>;
  const FrontMatterComponent = ({...props}) => <section {...props}>{props.frontmatter}</section>;

  const { isDarkMode } = useTheme();

  const theme: DefTheme = {
    theme: isDarkMode ? 'SHADES_OF_GREEN' : 'SHADES_OF_PURPLE',
    code: isDarkMode ? 'dracula' : 'oneLight',
    overrides: {
      metadata: {
        component: MetadataComponent,
        props: { className: 'text-[14px] my-4 tracking-wider' },
      },
      frontmatter: {
        component: FrontMatterComponent,
        props: { className: 'text-[14px] my-4 tracking-wider' },
      },
    },
  };
```

## The Blog component

The blog component renders both the blogs dashboard and the individual blogs. Therefore, there is only one import to be concerned about.

You can pass your blogs and theme to the `Blog` component.

```tsx
    import Blog from 'react-blogs';

    // definition of blogs and theme omitted for brevity.

    return <Blog allBlogs={allBlogs} theme={theme} paramkey="title" />
```

- paramKey *(optional)* - default blog:
```
  string
```
The parameter key in the URL for the current blog. For example, `title=my-blog`

# Roadmap
- [ ] Add more themes
- [ ] Better customisation for the react-blogs homepage
- [ ] Ability to add custom components inside each blog, for example rendering a hero
- [ ] Add better accessibility to rendered JSX nodes


# License
This project is licensed under the terms of the MIT license. See our [LICENSE](https://github.com/norvalbv/react-blogs/blob/main/LICENSE) for more information.
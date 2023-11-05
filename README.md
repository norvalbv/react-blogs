**Note: React Blogs is heavily in beta, expect the package to undergo drastic changes.**

The React Blogs package is a simple wrapper for quickly generating blogs from your already existing markdown files. 

# Why React-Blogs?

If you are looking for a quick set-up for rendering your blogs in React without the hassle of dealing with front matter, dynamic imports, link routing, or styling, this is a package to help fix those issues and get you set up as quickly as possible. The package also comes with automatic link processing if you are using a tool like Obisidian.md to write your markdown files.

Listed benefits:
- Easy set up
- Default styling and easy overrides
- Automatic link processing
- Automatic image processing
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
import { DefBlogs, useTheme, Blog } from 'react-blogs';

// specify your blogs:
  const allBlogs: DefBlogs = [
    {
      id: 'Memory (RAM)',
      file: '/src/assets/blogs/memory.md',
      title: 'How Memory (RAM) Works' ,
      subtitle: "The computer's short-term memory.",
      description: "A deep insight into what RAM is and how it interacts with the computer.",
      url: 'how-memory-works',
      frontMatter: {
        showFrontMatter: true;
        delimiter: '-- YAML --';
        position: 'start',
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
        props: { className: 'text-sm my-4 tracking-wider' },
      },
    },
  };

  useTheme(theme);

  // It is up to you how you get the current blog ID. 
  const pathname = window.location.href;
  
  const id = allBlogs.find((blog) => blog.url === pathname)?.id;

  const paramKey = "blog";
  const searchParams = new URLSearchParams(this.props.location.search).get(paramKey);

  // Render Blog
  return (
    <div className="mx-auto w-10/12 font-mono md:w-8/12">
      {searchParams.get(paramKey) ? (
        <Blog allBlogs={allBlogs} currentBlogId={id} paramKey={paramKey} />
      ) : (
        <>
          <Header
            title="Benji's Blogs"
            titleClassName="w-max border-b pb-2 text-3xl font-semibold md:text-6xl mb-6"
          />
          {allBlogs.map((blog) => (
            <a key={blog.id} href={`/blogs?${paramKey}=${blog.url}`} className="cursor-pointer">
              <Title>{blog.title}</Title>
              <Subtitle>{blog.subtitle}</Subtitle>
              <Description>{blog.description}</Description>
              <Metadata>{blog.metadata}</Metadata>
            </a>
          ))}
        </>
      )}
    </div>
  );
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
The path to your markdown file. **Note**: This must be an absolute link, not a relative one.

- imagePath *(optional)*:
```tsx
    string
```
The path to your images for this specific blog. **Note**: This must be an absolute link, not a relative one.

- title *(required)*:
```tsx
    string
```
The title to your blog.

- subtitle *(optional)*:
```tsx
    string
```
The subtitle to your blog.

- description *(description)*:
```tsx
    string
```
The title to your blog.

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

- overrides *(optional)*:
Here, you can specify overrides for any of the elements that are rendered from the React Blogs package. We use [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation) to render markdown and the shape of the overrides matches the same shape we use. You can pass any props to the rendered element and passing a className prop will completely override the styles. You can also pass a component directly to change the HTML tag or change how it is rendered out. For a more detailed description of how this works, check the markdown-to-jsx package.

We also render out custom component in the overrides section. Here you can update the front matter, clipboard, and code.

- code *(optional)* - default vsDark:
We use [PrismJS](https://prismjs.com/) for rendering our syntax-highlighted code blocks, the themes are already pre-defined and the inputted code type must be one of the distributed PrismJs themes.

- code *(optional)* - default vsDark:

- If you would like to update your

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
    overrides: {
      code: {
        theme: isDarkMode ? 'dracula' : 'oneLight',
        showNumbers: false,
      },
      clipboard: {
        callback: () => console.log('copied to clipboard!'),
        show: true,
      },
      frontmatter: {
        component: FrontMatterComponent,
        props: { className: 'text-sm my-4 tracking-wide' },
      },
    },
  };
```

## Named components

When defining your own blog homepage / blogs overview it's recommended to use our named exported components of Title, Subtitle, Description, and Metadata. This is as each of the components already have the appropriate styling displayed to them. The prop types are below for each:

- Title Component
```tsx
  children: string | ReactElement;
  className?: string; // Optional. Use this to override default styling.
  level?: 1 | 2 | 3; // Optional. Specifies the heading level (h1, h2, or h3).
  // Feel free to include additional standard component props as needed.
```
The Title component is utilized to render a heading in your React blog, corresponding to an `<h1>`, `<h2>`, or `<h3>` HTML element. Custom styles can be applied by using the className prop.

- Subtitle Component
```tsx
  children?: string | ReactElement;
  className?: string; // Optional. Use this to apply custom styling.
  // Additional props can be included as with standard components.
```
The Subtitle component is designed to render a subtitle, producing an <h4> HTML element. Override the default styles by providing a custom className.

- Description Component
```tsx
  children?: string | ReactElement;
  className?: string; // Optional. Use this to apply custom styling.
  // Standard component props can also be added as needed.
```
The Description component is exported for the purpose of rendering text content, typically within a <p> element. To customize the appearance, pass in a className with the desired styles.

- Metadata Component
```tsx
  children?: string | ReactElement;
  className?: string; // Optional. Use this to apply custom styling.
  // You may include additional standard component props.
```
The Metadata component serves to display the metadata of your React blog posts, simply pass your metadata as a child.

You can alternatively use your own element instead of any above.

- Blog Component
The blog component renders the individual blogs. There are two ways to render blogs, each by the same exported Blog component.

If you are using tools like Obisidian to write your blogs and have syntax that relates to double brackets for linking and images (as such `[[link-here]]` or `![[image-here.png]]`) you need to pass all of your blogs and the current blog ID. This is so a comparison can be made so React Blogs knows which should be valid links. Whereas, if you want to render your blog as it currently is without any form of processing, you can just pass in a single blog. Passing a blog as a single prop will take priority. Note: The front matter will still be processed in both instances.

Blog Props:

- allBlogs *(optional)*:
```tsx
  BlogType[];
```

- currentBlogId *(optional)*:
```tsx
  string
```

- callback *(optional)*:
```tsx
  string
```
If the package cannot find your current blog, it will return `null`. you can optionally pass a callback to be called instead.

- blog *(optional)*:
```tsx
  BlogType;
```

- paramKey *(optional)*:
```tsx
  string
```
When navigating through processed internal links within the blogs, by default the link will be processed as a path, if you would like to navigate via a query string, pass a parameter key instead.

For example -> link to memory would by default by `/memory`, whereas if you passed the paramKey as `blog` you would route to `?blog=memory` instead.

Basic examples:

```tsx
    import { Blog } from 'react-blogs';

    // definition of blogs and theme omitted for brevity.

    // processing required, all blogs and current blog ID must be passed
    return <Blog allBlogs={allBlogs} currentBlogId={id} paramkey="title" />


    // no processing required, simply pass current blog.
    return <Blog blog={currentBlog} />
```

# Roadmap
- [x] Add more themes
- [x] Better customisation for the react-blogs homepage
- [ ] Ability to add custom components inside each blog, for example rendering a hero
- [ ] Add better accessibility to rendered JSX nodes
- [ ] Add video support for each blog


# License
This project is licensed under the terms of the MIT license. See our [LICENSE](https://github.com/norvalbv/react-blogs/blob/main/LICENSE) for more information.
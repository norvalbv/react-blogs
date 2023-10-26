import FrontMatter from 'components/FrontMatter';
import Markdown from 'markdown-to-jsx';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { themes as defaultTheme, styles } from 'styles/themes.css';
import { Blog, DefTheme, FrontMatter as FrontMatterType } from 'types';
import { getClassName, processBlog, processLinks } from 'utils';

const UnorderedListComponent = ({
  children,
  ...props
}: {
  children: ReactElement;
}): ReactElement => <ul {...props}>{children}</ul>;

const ListComponent = ({ children, ...props }: { children: ReactElement[] }): ReactElement => (
  <li {...props} style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
    <span className={children[0].type === 'p' ? 'mt-3' : ''}>&bull;</span>
    <div>{children}</div>
  </li>
);

const CodeComponent = ({
  children,
  ...props
}: {
  children: string;
  className?: string;
  theme?: DefTheme;
}): ReactElement => {
  const isMultiline = /\n/.test(children);

  return isMultiline ? (
    <Highlight
      theme={
        themes[props.theme?.code || defaultTheme[props.theme?.theme || 'PLAIN_DARK'].prismTheme]
      }
      language="tsx"
      code={children}
    >
      {({ style, tokens, getLineProps, getTokenProps }): ReactElement => (
        <pre style={style} className={styles.code}>
          {tokens.map((line, i) => (
            <div key={line.toString() + i.toString()} {...getLineProps({ line })}>
              <span style={{ marginRight: '.5rem' }}>{i + 1}.</span>
              {line.map((token) => (
                <span
                  key={token.content}
                  {...getTokenProps({ token })}
                  className={defaultTheme.PLAIN_DARK.nodes}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  ) : (
    <Highlight
      theme={
        themes[props.theme?.code || defaultTheme[props.theme?.theme || 'PLAIN_DARK'].prismTheme]
      }
      language="tsx"
      code={children}
    >
      {({ style }): ReactElement => (
        <code style={style} className={styles.inlinecode}>
          {children}
        </code>
      )}
    </Highlight>
  );
};

export type BlogProps = {
  allBlogs: Blog[];
  paramKey: Lowercase<string>;
  callback?: () => void;
  theme?: DefTheme;
};

export const BlogPage = ({
  allBlogs,
  paramKey,
  callback,
  theme: defTheme,
}: BlogProps): ReactElement | null => {
  const [blog, setBlog] = useState<{
    blog: string | null;
    frontMatter: FrontMatterType | null;
  }>({
    blog: null,
    frontMatter: null,
  });

  const blogParam = new URLSearchParams(window.location.search).get(paramKey) || '';

  const currentBlogIndex = allBlogs.findIndex((b) => blogParam.includes(b.url));

  const currentBlog = currentBlogIndex >= 0 ? allBlogs[currentBlogIndex] : null;

  /**
   * Dynamically import blogs based on the current blog URL.
   */
  useEffect(() => {
    if (!currentBlog) {
      if (callback) {
        return callback();
      }
      return;
    }
    const { file } = currentBlog;

    const fileLink = new URL(file, import.meta.url);

    fetch(fileLink)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        const blogWithProcessedLinks = processLinks({ allBlogs, blog: res, paramKey });

        const { blog, frontMatter } = processBlog({
          metadata: currentBlog.metadata?.data,
          blog: blogWithProcessedLinks,
          delimiter: currentBlog.frontMatter?.delimiter,
          showFrontMatter: currentBlog.frontMatter?.showFrontMatter,
        });

        setBlog({
          blog,
          frontMatter,
        });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlogIndex, currentBlog]);

  if (!blog.blog) return null;

  const FrontMatterOverrideComponent = defTheme?.overrides?.frontmatter?.component;

  return (
    <article>
      <h1 className={getClassName({ tag: 'h1' }) || styles.h1}>{currentBlog?.title}</h1>
      <div
        {...(currentBlog?.frontMatter?.position === 'end'
          ? { style: { display: 'flex', flexDirection: 'column-reverse' } }
          : {})}
      >
        {blog.frontMatter && FrontMatterOverrideComponent ? (
          <FrontMatterOverrideComponent
            frontmatter={blog.frontMatter}
            // className={getClassName({ tag: 'frontmatter' }) || styles.metadata}
            {...defTheme?.overrides?.metadata?.props}
          />
        ) : (
          <FrontMatter frontmatter={blog.frontMatter} />
        )}
        <section>
          <Markdown
            options={{
              wrapper: Fragment,
              overrides: {
                ...defTheme?.overrides,
                h1: defTheme?.overrides?.h1 || { props: { className: styles.h1 } },
                h2: defTheme?.overrides?.h2 || {
                  props: { className: styles.h2 },
                },
                h3: defTheme?.overrides?.h3 || {
                  props: { className: styles.h3 },
                },
                h4: defTheme?.overrides?.h4 || { props: { className: styles.h4 } },
                p: defTheme?.overrides?.p || { props: { className: styles.p } },
                ul: defTheme?.overrides?.ul || {
                  component: UnorderedListComponent,
                  props: { className: styles.ul },
                },
                li: defTheme?.overrides?.li || {
                  component: ListComponent,
                  props: { className: styles.li },
                },
                code: {
                  component: CodeComponent,
                  props: { theme: defTheme },
                },
                a: defTheme?.overrides?.a || {
                  props: { className: styles.a },
                },
                strong: defTheme?.overrides?.strong || {
                  props: { className: styles.strong },
                },
                em: defTheme?.overrides?.em || { props: { className: styles.em } },
                blockquote: defTheme?.overrides?.blockquote || {
                  props: { className: styles.blockquote },
                },
              },
            }}
          >
            {blog.blog}
          </Markdown>
        </section>
      </div>
    </article>
  );
};

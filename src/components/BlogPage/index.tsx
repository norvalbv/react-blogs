import {
  frontMatterBasic,
  frontMatterBasicListHyphenated,
  frontMatterBasicWithContent,
  frontMatterWithDotDelim,
  frontMatterWithTypes,
  frontMatterWithYAMLDelim,
} from '__mocks__/frontMatterMockData';
import Markdown from 'markdown-to-jsx';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { themes as defaultTheme, styles } from 'styles/themes.css';
import { Blogs, DefTheme, FrontMatter } from 'types';
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
      language={'tsx' || ''}
      code={children}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={styles.code}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span style={{ marginRight: '.5rem' }}>{i + 1}.</span>
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({ token })}
                  className={defaultTheme['PLAIN_DARK'].nodes}
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
      language={'tsx' || ''}
      code={children}
    >
      {({ style }) => (
        <code style={style} className={styles.inlinecode}>
          {children}
        </code>
      )}
    </Highlight>
  );
};

type BlogProps = {
  allBlogs: Blogs[];
  paramKey: Lowercase<string>;
  callback?: () => void;
  theme?: DefTheme;
};

const BlogPage = ({ allBlogs, paramKey, callback, theme: defTheme }: BlogProps): ReactElement => {
  const [blog, setBlog] = useState<{
    blog: string | null;
    frontMatter: FrontMatter | null;
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

    const fileLink2 = new URL(file, import.meta.url);

    fetch(fileLink2)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        const blogWithProcessedLinks = processLinks({ allBlogs, blog: res, paramKey });

        const { blog, frontMatter } = processBlog({
          blog: frontMatterWithYAMLDelim,
          delimeter: '-- YAML --',
          showFrontMatter: currentBlog.frontMatter?.showFrontMatter,
        });

        setBlog({
          blog,
          frontMatter: currentBlog?.frontMatter?.showFrontMatter ? frontMatter : null,
        });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlogIndex, currentBlog]);

  if (!blog.blog) return <></>;

  return (
    <article>
      <h1 className={getClassName('h1', defTheme) || styles.h1}>{currentBlog?.title.label}</h1>
      {/* <section css={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '1rem 0' }}>
        {blog.frontMatter?.tags?.length ? (
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Tags:
            {blog.frontMatter?.tags.map((tag) => <Badge tag={tag} key={tag} />)}
          </div>
        ) : null}
        {blog.frontMatter?.['read time'] ? (
          <div className="capitalize">
            Read Time:&nbsp;
            {blog.frontMatter?.['read time']}
          </div>
        ) : null}
        {blog.frontMatter?.Aliases?.length ? (
          <div className="flex items-center gap-2">
            Aliases:
            {blog.frontMatter?.Aliases.map((tag, i, a) => (
              <div key={tag} className="flex items-center gap-2">
                {tag}
                {i < a.length - 1 && ','}
              </div>
            ))}
          </div>
        ) : null}
        {blog.frontMatter?.['date modified'] && (
          <p>
            Last Modified:{' '}
            <span className="italic">
              {blog.frontMatter['date modified'].slice(
                0,
                blog.frontMatter['date modified'].lastIndexOf(',')
              )}
            </span>
          </p>
        )}
      </section> */}
      <Markdown
        options={{
          wrapper: Fragment,
          overrides: {
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
    </article>
  );
};

export default BlogPage;

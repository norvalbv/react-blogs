import { css, useTheme } from '@emotion/react';
import Badge from 'components/Badge';
import Markdown from 'markdown-to-jsx';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Blogs, DefTheme, FrontMatter } from 'types';
import { defaults } from 'types/themes';
import praseFrontMatter from 'utils/parseFrontMatter';
import processLink from 'utils/processLinks';

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
  theme?: keyof typeof themes;
}): ReactElement => {
  const language = 'language-javascript';

  const isMultiline = /\n/.test(children);

  return isMultiline ? (
    <Highlight theme={themes[props.theme || 'vsDark']} language={'tsx' || ''} code={children}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          css={{
            borderRadius: '8px',
            margin: '8px 0 8px 0',
            fontSize: '.85rem',
            overflowX: 'scroll',
            padding: '.5rem .75rem',
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span css={{ marginRight: '.5rem' }}>{i + 1}.</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  ) : (
    <code>{children}</code>
  );
};

type BlogProps = {
  allBlogs: Blogs[];
  paramKey: Lowercase<string>;
  callback?: () => void;
  theme?: DefTheme;
};

const BlogPage = ({ allBlogs, paramKey, callback, theme: defTheme }: BlogProps): ReactElement => {
  const theme = useTheme();

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
        const processedLinks = processLink({ allBlogs, blog: res, paramKey });

        const { blog, frontMatter } = praseFrontMatter(processedLinks);

        setBlog({ blog, frontMatter: currentBlog?.showFrontMatter ? frontMatter : null });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlogIndex, currentBlog]);

  if (!blog.blog) return <></>;

  console.log(defTheme);

  return (
    <article>
      <h1 css={css(defaults.h1, { color: theme.h1 })}>{currentBlog?.title.text}</h1>
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
            h1: defTheme?.overrides?.h1 || { props: { css: theme.metadata } },
            h2: defTheme?.overrides?.h2 || {
              component: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
              props: { css: defaults.h2 },
            },
            h3: defTheme?.overrides?.h3 || {
              props: { css: defaults.h3 },
            },
            h4: defTheme?.overrides?.h4 || { props: { css: defaults.h4 } },
            p: defTheme?.overrides?.p || { props: { css: defaults.p } },
            ul: defTheme?.overrides?.ul || {
              component: UnorderedListComponent,
              props: { css: defaults.ul },
            },
            li: defTheme?.overrides?.li || {
              component: ListComponent,
              props: { css: defaults.li },
            },
            code: {
              component: CodeComponent,
              props: { theme: defTheme?.code || theme.code },
            },
            a: defTheme?.overrides?.a || {
              props: { css: defaults.a },
            },
            strong: defTheme?.overrides?.strong || {
              props: { css: defaults.strong },
            },
            em: defTheme?.overrides?.em || { props: { css: defaults.em } },
            blockquote: defTheme?.overrides?.blockquote || {
              props: { css: defaults.blockquote },
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

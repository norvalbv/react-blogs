import Badge from 'components/Badge';
import Markdown from 'markdown-to-jsx';
import { Highlight, themes } from 'prism-react-renderer';
import React, { ReactElement, useEffect, useState } from 'react';
import { Blogs, FrontMatter } from 'types';
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
    <Highlight theme={themes[props.theme || 'dracula']} language={'tsx' || ''} code={children}>
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
  theme?: keyof typeof themes;
};

const BlogPage = ({ allBlogs, paramKey, callback, theme }: BlogProps): ReactElement => {
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

  return (
    <article>
      <h1
        css={{
          fontSize: '1.75rem',
          lineHeight: '2rem',
          textTransform: 'capitalize',
          textDecoration: 'underline',
          marginBottom: '0.5rem',
          '@media (min-width: 768px)': {
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
          },
        }}
      >
        {currentBlog?.title.text}
      </h1>
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
          wrapper: React.Fragment,
          overrides: {
            h1: { props: { className: 'text-2xl md:text-4xl text-accent-main' } },
            h2: {
              props: {
                className: 'my-4 md:my-6 text-xl md:text-2xl underline text-accent-main/90',
              },
            },
            h3: { props: { className: 'my-4 text-lg md:text-xl text-accent-main/75' } },
            h4: { props: { className: 'my-4 text-md md:text-lg text-accent-secondary/60' } },
            p: { props: { className: 'my-3 text-sm leading-6' } },
            a: { props: { className: 'text-accent-secondary underline' } },
            strong: { props: { className: 'text-accent-tertiary font-semibold' } },
            em: { props: { className: 'text-accent-tertiary/75' } },
            ul: { component: UnorderedListComponent, props: { className: 'my-2' } },
            li: { component: ListComponent, props: { className: 'text-sm my-2' } },
            code: { component: CodeComponent, props: { theme } },
            blockquote: { props: { className: 'ml-4 border-l pl-4 italic' } },
          },
        }}
      >
        {blog.blog}
      </Markdown>
    </article>
  );
};

export default BlogPage;

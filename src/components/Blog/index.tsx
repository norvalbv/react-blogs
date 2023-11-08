import FrontMatter from 'components/FrontMatter';
import { ClipboardCopyIcon, ClipboardIcon } from 'components/SVG';
import useGetClassName from 'hooks/useGetClassName';
import useOutsideClick from 'hooks/useOutsideClick';
import useStore from 'hooks/useStore';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import { customThemes as defaultTheme, styles } from 'styles/themes.css';
import { BlogType, DefTheme, FrontMatter as FrontMatterType } from 'types';
import { processBlog, processLinks } from 'utils';
import processImageLinks from 'utils/processImageLinks';

type WithAnchorProps = {
  children: string[];
  className?: string;
  level: number;
  id: string;
};

const WithAnchor = ({ children, className, level, id }: WithAnchorProps): ReactElement => {
  const { origin, pathname } = window.location;

  return (
    <a href={`${origin}${pathname}#${id}`}>
      <WrapHeaderInAnchor className={className} level={level} id={id}>
        {children}
      </WrapHeaderInAnchor>
    </a>
  );
};

const WrapHeaderInAnchor = ({ children, className, level, id }: WithAnchorProps): ReactElement => {
  switch (level) {
    case 1:
      return (
        <h1 className={className} id={id}>
          {children[0]}
        </h1>
      );
    case 2:
      return (
        <h2 className={className} id={id}>
          {children[0]}
        </h2>
      );
    case 3:
      return (
        <h3 className={className} id={id}>
          {children[0]}
        </h3>
      );
    case 4:
      return (
        <h4 className={className} id={id}>
          {children[0]}
        </h4>
      );
    case 5:
      return (
        <h5 className={className} id={id}>
          {children[0]}
        </h5>
      );
    default:
      return (
        <h6 className={className} id={id}>
          {children[0]}
        </h6>
      );
  }
};

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

type CodeComponentProps = {
  children: string;
  theme?: DefTheme;
};

const CodeComponent = ({ children, theme }: CodeComponentProps): ReactElement => {
  const showClipboard =
    theme?.overrides?.clipboard?.show === undefined || theme.overrides.clipboard.show;
  const showNumbers =
    theme?.overrides?.code?.showNumbers === undefined || theme.overrides.code?.showNumbers;

  const isMultiline = /\n/.test(children);

  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const ref = useRef<HTMLPreElement | null>(null);

  useOutsideClick({ ref, onBlur: (): void => setCopyToClipboard(false) });

  const clipboardOverride = theme?.overrides?.clipboard;

  const copyToClipBoard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(children);
      setCopyToClipboard(true);
      if (clipboardOverride?.callback) {
        clipboardOverride?.callback();
      }
    } catch (err) {
      if (clipboardOverride?.callback) {
        clipboardOverride?.callback(err);
      }
    }
  };

  const { getClassName } = useGetClassName();

  const ClipboardOverrideComp = clipboardOverride?.component;
  const CodeOverrideComp = theme?.overrides?.code?.component;

  return CodeOverrideComp ? (
    <CodeOverrideComp className={getClassName({ tag: 'code' })}>{children}</CodeOverrideComp>
  ) : isMultiline ? (
    <Highlight
      theme={
        themes[
          theme?.overrides?.code?.theme || defaultTheme[theme?.theme || 'PLAIN_DARK'].prismTheme
        ]
      }
      language="tsx"
      code={children}
    >
      {({ style, tokens, getLineProps, getTokenProps }): ReactElement => (
        <pre
          style={{ ...style, position: 'relative' }}
          className={getClassName({ tag: 'code' })}
          ref={ref}
        >
          {showClipboard &&
            (ClipboardOverrideComp ? (
              <ClipboardOverrideComp />
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <div className={getClassName({ tag: 'clipboard' })} onClick={copyToClipBoard}>
                {copyToClipboard ? <ClipboardCopyIcon /> : <ClipboardIcon />}
              </div>
            ))}
          {tokens.map((line, i) => (
            <div key={line.toString() + i.toString()} {...getLineProps({ line })}>
              {showNumbers && <span style={{ marginRight: '.5rem' }}>{i + 1}.</span>}
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
        themes[
          theme?.overrides?.code?.theme || defaultTheme[theme?.theme || 'PLAIN_DARK'].prismTheme
        ]
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
  allBlogs?: BlogType[];
  blog?: BlogType;
  currentBlogId?: BlogType['id'];
  callback?: () => void;
  paramKey?: string;
};

type BlogState = {
  blog: string | null;
  frontMatter: FrontMatterType | null;
};

const Blog = ({
  allBlogs,
  blog: individualBlog,
  currentBlogId,
  callback,
  paramKey,
}: BlogProps): ReactElement | null => {
  const [blog, setBlog] = useState<BlogState>({
    blog: null,
    frontMatter: null,
  });

  const { getClassName } = useGetClassName();

  const defTheme = useStore((state) => state.theme);

  const currentBlogIndex = allBlogs?.findIndex((b) => b.id === currentBlogId) || 0;

  const currentBlog =
    individualBlog || (allBlogs && (currentBlogIndex >= 0 ? allBlogs[currentBlogIndex] : null));

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
        if (allBlogs && !individualBlog) {
          const blogWithProcessedImageLinks = processImageLinks({
            blog: res,
            imagePath: currentBlog.imagePath,
          });

          const blogWithProcessedLinks = processLinks({
            allBlogs,
            blog: blogWithProcessedImageLinks,
            paramKey,
          });

          const { blog, frontMatter } = processBlog({
            metadata: currentBlog.metadata,
            blog: blogWithProcessedLinks,
            delimiter: currentBlog.frontMatter?.delimiter,
            showFrontMatter: currentBlog.frontMatter?.showFrontMatter,
          });

          return setBlog({
            blog,
            frontMatter,
          });
        }

        const { blog, frontMatter } = processBlog({
          metadata: currentBlog.metadata,
          blog: res,
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
            // TODO fix this so we can ensure users can override colours.
            // className={getClassName({ tag: 'frontmatter' }) || styles.metadata}
            {...defTheme?.overrides?.frontmatter?.props}
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
                h1: defTheme?.overrides?.h1 || {
                  component: WithAnchor,
                  props: { className: getClassName({ tag: 'h1' }), level: 1 },
                },
                h2: defTheme?.overrides?.h2 || {
                  component: WithAnchor,
                  props: { className: getClassName({ tag: 'h2' }), level: 2 },
                },
                h3: defTheme?.overrides?.h3 || {
                  component: WithAnchor,
                  props: { className: getClassName({ tag: 'h3' }), level: 3 },
                },
                h4: defTheme?.overrides?.h4 || {
                  component: WithAnchor,
                  props: { className: getClassName({ tag: 'h4' }), level: 4 },
                },
                h5: defTheme?.overrides?.h5 || {
                  component: WithAnchor,
                  props: { level: 5 },
                },
                h6: defTheme?.overrides?.h6 || {
                  component: WithAnchor,
                  props: { level: 6 },
                },
                p: defTheme?.overrides?.p || { props: { className: getClassName({ tag: 'p' }) } },
                ul: defTheme?.overrides?.ul || {
                  component: UnorderedListComponent,
                  props: { className: getClassName({ tag: 'ul' }) },
                },
                li: defTheme?.overrides?.li || {
                  component: ListComponent,
                  props: { className: getClassName({ tag: 'li' }) },
                },
                code: {
                  component: CodeComponent,
                  props: { theme: defTheme },
                },
                a: defTheme?.overrides?.a || {
                  props: { className: getClassName({ tag: 'a' }) },
                },
                ol: defTheme?.overrides?.ol || {
                  props: { className: getClassName({ tag: 'ol' }) },
                },
                strong: defTheme?.overrides?.strong || {
                  props: { className: getClassName({ tag: 'strong' }) },
                },
                em: defTheme?.overrides?.em || {
                  props: { className: getClassName({ tag: 'em' }) },
                },
                blockquote: defTheme?.overrides?.blockquote || {
                  props: { className: getClassName({ tag: 'blockquote' }) },
                },
              } as MarkdownToJSX.Overrides,
            }}
          >
            {blog.blog}
          </Markdown>
        </section>
      </div>
    </article>
  );
};

export default Blog;

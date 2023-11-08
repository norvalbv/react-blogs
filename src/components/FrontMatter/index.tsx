/* eslint-disable react/no-array-index-key */
import Badge from 'components/Badge';
import { ReactElement } from 'react';
import { styles } from 'styles/themes.css';
import { FrontMatter as FrontMatterType } from 'types';

export type FrontMatterProps = {
  frontmatter: FrontMatterType;
  requireIndent?: boolean;
  keyPrefix?: number;
};

const FrontMatter = ({
  frontmatter,
  requireIndent = false,
  keyPrefix = 0,
}: FrontMatterProps): ReactElement | null => {
  if (!frontmatter) return null;

  if (Array.isArray(frontmatter)) {
    return (
      <>
        {frontmatter.map((entry, i) => {
          if ((typeof entry === 'object' || Array.isArray(entry)) && entry) {
            return (
              <FrontMatter
                key={keyPrefix + i}
                frontmatter={entry as FrontMatterType}
                keyPrefix={i}
              />
            );
          }

          const entryIs = typeof entry === 'string';

          return <Badge key={keyPrefix + i} tag={entryIs ? entry : String(entry)} />;
        })}
      </>
    );
  }

  if (typeof frontmatter === 'object') {
    return (
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
        }}
      >
        {Object.entries(frontmatter).map(([key, value], j) => {
          return (
            <div
              style={{
                flexWrap: 'wrap',
                gap: '4px',
                paddingLeft: requireIndent ? '1rem' : undefined,
              }}
              key={key}
            >
              <strong className={styles.strong} style={{ textTransform: 'capitalize' }}>
                {key}:&nbsp;
              </strong>
              {Array.isArray(value) ? (
                value.map((v, i) => {
                  return (
                    <FrontMatter
                      frontmatter={v as FrontMatterType}
                      requireIndent
                      key={keyPrefix + i}
                      keyPrefix={j}
                    />
                  );
                })
              ) : typeof value === 'object' && value ? (
                <FrontMatter
                  frontmatter={value as FrontMatterType}
                  requireIndent
                  key={keyPrefix + j}
                  keyPrefix={j}
                />
              ) : (
                <span>{String(value || '-')}</span>
              )}
            </div>
          );
        })}
      </section>
    );
  }

  return <Badge tag={frontmatter} />;
};

export default FrontMatter;

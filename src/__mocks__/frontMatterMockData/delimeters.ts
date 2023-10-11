export const frontMatterWithSemiColonDelim = `
    ;;;
    title: RAM
    user: BenjiTheGreat
    ;;;

    # This page has JSON front matter!
`;

export const frontMatterWithYAMLDelim = `
    -- YAML --
    title: RAM
    user: BenjiTheGreat
    -- YAML --

    # This page has JSON front matter!
`;

export const frontMatterWithTildeDelim = `
    ~~~
    title: custom-delims
    foo: bar
    version: 2
    ~~~
`;

export const frontMatterWithDotDelim = `
    ...
    title: custom-delims
    foo: bar
    version: 2
    ...
`;

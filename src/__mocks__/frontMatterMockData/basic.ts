export const frontMatterBasic = `
    ---
    title: yaml
    job: software engineer
    ---
`;

export const frontMatterJSON = `
    ---
    {
    "title": "JSON",
    "description": "Front Matter"
    }
    ---

    # This page has JSON front matter!
`;

export const frontMatterBasicWithContent = `
    ---
    title: RAM
    user: BenjiTheGreat
    ---
    Content
`;

export const frontMatterIncorrectFormat = `
    ---
    title: hello
    categories:
    subcategories:
    - dogs
    cats
    dolphins
    - tigers
    ---
`;

export const frontMatterIncomplete = `
    ---
    one: foo
    two: bar
    three: baz
`;

export const frontMatterEmpty = '';

export const frontMatterVoid = 'No Front Matter';
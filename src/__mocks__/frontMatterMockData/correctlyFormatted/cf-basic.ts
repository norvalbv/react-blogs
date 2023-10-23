export const frontMatterBasicWithVariousTypes = `
    ---
    job: software engineer
    doesProgram: true
    number: 10
    ---
`;

export const frontMatterBasicWithStringTypes = `
    ---
    job: software engineer
    doesProgram: "true"
    number: "10"
    ---
`;

export const frontMatterArray = `
    ---
    - apple
    - banana
    - carrot
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
    title: Admin
    user: BenjiTheGreat
    ---
    Content
`;

export const frontMatterBasicList = `
    ---
    title: Members
    users:
    - BenjiTheGreat
    - Steve_The_Great
    - John The Great
    ---
`;

export const frontMatterIndented = `
    ---
    title: Members
    users:
      BenjiTheGreat
      Steve_The_Great
      John The Great
    ---
`;

export const frontMatterWithComments = `
    ---
    # =============================================
    # User List
    # =============================================
    title: Admins
    users: BenjiTheGreat
    ---
`;

export const frontMatterWithArrayAsKey = `
    ---
    - work on YAML.py:
      - work on Store 
    ---
`;

export const frontMatterPreFormatted = `
    ---
    title: { label: 'hello', color: 'red' }
    users: [ benji, bob, mike ]
    ---
`;

export const frontMatterArrayParagraph = `
    ---
    - What's Yaml?
    - It's for writing data structures in plain text.
    - And?
    - And what? That's not good enough for you?
    - No, I mean, "And what about Yaml?"
    - Oh, oh yeah. Uh.. Yaml for Ruby.
    ---
`;

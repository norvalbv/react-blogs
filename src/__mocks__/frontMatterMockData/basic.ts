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
    title: Admin
    user: BenjiTheGreat
    ---
    Content
`;

export const frontMatterBasicListHyphenated = `
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

export const frontMatterNumerousIndented = `
    ---
    title: Members
    users:
      BenjiTheGreat
      Steve_The_Great
      John The Great
    permissions:
      members area
      chat
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

// What special characters are valid in yaml / front matter?
// ! Works without Quotes, is this a problem?
export const frontMatterSpecialCharacters = `
    ---
    title: "!@£$%^&*()[]{};\':|,./<>?\`~"
    ---
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

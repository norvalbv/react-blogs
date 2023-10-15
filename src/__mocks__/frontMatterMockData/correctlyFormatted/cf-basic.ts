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

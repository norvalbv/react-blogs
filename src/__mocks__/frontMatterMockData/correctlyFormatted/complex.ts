export const frontMatterFoldedBlockScalar = `
    ---
    fold_newlines: >
      this is really a
      single line of text
      despite appearances
    ---
`;

export const frontMatterLiteralBlockScalar = `
    ---
    include_newlines: |
        exactly as you see
        will appear these three
        lines of poetry
    ---
`;

export const frontMatterEnforceNewLine = `
    ---
    fold_same_newlines: "a b\nc d\n  e\nf\n"
    ---
`;

export const frontMatterComplexJSON = `
    ---
    {
        "cascade": [
           {
              "_target": {
                 "kind": "page",
                 "lang": "en",
                 "path": "/blog/**"
              },
              "background": "yosemite.jpg"
           },
           {
              "_target": {
                 "kind": "section"
              },
              "background": "goldenbridge.jpg"
           }
        ],
        "title": "Blog"
     }
    ---
`;

export const frontMatterQuotedValues = `
    ---
    with-random-chars: "this-is-a-test 123 : 456: abc - 890!"
    current time: "Thursday, December 22nd 2022, 10:09:56 pm"
    time tomorrow: 'Friday,--------December 23nd 2022, 10:09:55 pm'
    access areas: "all : 123"
    ---
`;

export const frontMatterColonWithNoSpace = `
    ---
    windows_path: c:\\windows
    ---
`;

export const frontMatterDeeplyNested = `
    ---
    title: Users
    users: 
    - BenjiTheGreat:
        permissions:
        -  login
        -  logout
        -  chat
        -  access control
        timezone: GMT
    - SnakeTheBate:
        permissions:
        -  login
        -  logout
        timezone: EST   
    ---
`;

export const frontMatterArraysAndObjects = `
    ---
    foo: whatever
    bar:
      -
        fruit: apple
        name: steve
        sport: baseball
      - more
      - info
      -
        python: rocks
        perl: papers
        ruby: scissorses
   ---
`;

export const frontMatterSpecialCharacters = `
    ---
    title: "!@£$%^&*()[]{};':|,./<>?\`~"
    ---
`;

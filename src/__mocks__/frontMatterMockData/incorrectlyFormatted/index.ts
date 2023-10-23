export const frontMatterIncomplete = `
    ---
    one: foo
    two: bar
    three: baz
`;

export const frontMatterIncorrectIndentation = `
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

export const frontMatterUnquotedValues = `
    ---
    categories-hello asd: hello:hi123 : 456 12£: :123:123:123:123 ''123'123'123'123'123'123
    more-random-chars: 'hello:654 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123'
    current time: Thursday,--------December 22nd 2022, 10:09:55 pm
    access areas: all : 123
    ---
`;

export const frontMatterIncorrectlyFormattedDeepList = `
    ---
    title: Users
    user: BenjiTheGreat
        group: admin
        -  permissions: all
        -  access areas: all
        timezone: GMT    
    ---
`;

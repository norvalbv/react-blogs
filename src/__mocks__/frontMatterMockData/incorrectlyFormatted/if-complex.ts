// ? Do I need a colon to define the end of the line / list in yaml front matter? is below valid?

export const isValid = `
---
title: users1
users
    benji
    bob
    mike
---

# This page has cson front matter!
`;

// are hyphens allowed as keys?
export const frontMatterUnquotedValues = `
    ---
    categories-hello asd: hello:hi123 : 456 12£: :123:123:123:123 ''123'123'123'123'123'123
    more-random-chars: 'hello:654 : 123 12£: :123:123:123:123 ''123'123'123'123'123'123'
    current time: Thursday,--------December 22nd 2022, 10:09:55 pm
    access areas: all : 123
    ---
`;

export const frontMatterIncorrectlyFormatedDeepList = `
    ---
    title: Users
    user: BenjiTheGreat
        group: admin
        -  permissions: all
        -  access areas: all
        timezone: GMT    
    ---
`;

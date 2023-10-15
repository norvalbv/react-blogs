// You can always use https://www.yamllint.com/ to check the validity of the yaml.

export const frontMatterVariousDelim = `
---
title: 'CSON'
description: '''
Front matter
    '''
categories: '''
front matter cson
    '''
---

# This page has cson front matter!
`;

export const frontMatterPreFormatted = `
    ---
    title: { label: 'hello', color: 'red' }
    users: [ benji, bob, mike ]
    ---
`;

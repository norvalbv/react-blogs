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
    windows_path: c:\windows
    ---
`;

// Single quotes let you put almost any character in your string, and won't try to parse escape codes. '\n' would be returned as the string \n.
// Double quotes parse escape codes. "\n" would be returned as a line feed character.

export const frontMatterEscapedChars = `
    ---
    more-random-chars: 'hello:654 : 123 12£: :123:123:123:123 \'\'123\'123\'123\'123\'123\'123'
    ---
`;

export const frontMatterDeeplyNestedWithHyphens = `
    ---
    title: Users
    user: BenjiTheGreat
        group: admin
        permissions:
        - login
        - logout
        - chat
        - access control
        timezone: GMT    
    ---
`;

export const frontMatterDeeplyNested = `
    ---
    title: Users
    user: BenjiTheGreat
        group: admin
        permissions:
          login
          logout
          chat
          access control
        timezone: GMT    
    ---
`;

export const frontMatterComplex = `
    ---
    # =============================================
    # BUILD CONFIG
    # =============================================

    root:             _gh_pages
    dest:             <%= site.root %>
    assets:           <%= site.dest %>/assets
    date:             <%= new Date() %>


    # Data
    data:             data

    # Templates
    templates:        templates
    pages:            <%= site.templates %>
    includes:         <%= site.templates %>/includes
    layouts:          <%= site.templates %>/layouts
    layoutext:        .hbs
    layout:           default

    # Styles
    styles:           styles
    components:       <%= site.styles %>/components


    # =============================================
    # EXTENSIONS
    # =============================================

    helpers:          <%= site.templates %>/helpers
    plugins:
    # - assemble-contrib-permalinks
    # - assemble-contrib-anchors
    # - assemble-contrib-toc


    # =============================================
    # PROJECT METADATA
    # =============================================

    brand:            ASSEMBLE
    title:            BOILERPLATE
    lead:             The most awe inspiring static site boilerplate in Northern Kentucky.

    # GitHub
    version:          <%= pkg.version %>
    author:           <%= pkg.author.name %>
    name:             <%= pkg.name %>
    description:      <%= pkg.description %>

    # URLs
    url:

    # Repo
    homepage:       <%= pkg.homepage %>
    repo:           <%= pkg.homepage %>
    issues:         <%= pkg.bugs.url %>?state=open
    ghpages:        https://<%= site.username %>.github.io/<%= pkg.name %>/

    # Site
    domain:         http://assemble.io/
    about:          <%= site.url.domain %>/about/
    blog:           <%= site.url.domain %>/blog/

    # Download Links
    download:
    source:         <%= pkg.homepage %>/archive/master.zip
    latest:         <%= pkg.homepage %>/master/dist/<%= pkg.name %>-<%= pkg.version %>.min.js


    # =============================================
    # SEO / SEM
    # =============================================

    analytics:
    alexa:           lpTeh1awA400OE
    google:
        id:             UA-XXXXXXXX-YY
        domain:         assemble.github.io
        siteid:         false
        tags:           FOO-012345 # Google Tags (see: https://www.google.com/tagmanager/)


    # =============================================
    # SOCIAL / SHARING
    # =============================================

    # Comments
    disqus:
    enabled:        false
    shortname:      <%= pkg.name %>

    # Social
    social:
    twitter:
        via:          jonschlinkert
        username:     jonschlinkert
        related:      jonschlinkert:Assemble core team.
    facebook:       false
    linkedin:       false
    gplus:          false
    hn:             false
    google:         false

    # Sharing
    sharing:
    twitter:        false
    facebook:       false
    gplus:          false
    hn:             false
    google:         false
    ---

    <span class="alert alert-info">This is an alert</span>

    ## YAML Front Matter
    Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

    \`\`\`yaml
    ---
    username: jonschlinkert
    ---
    \`\`\`
    This is probably most useful when:
    1. You need to use the same or similar templates on a number of different projects
    1. You want to supply data to the templates that won't typically be found in package.json
`;

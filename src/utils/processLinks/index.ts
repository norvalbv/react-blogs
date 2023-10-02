import blogs from 'constants/blogs';

/*
 * Using regex find the obsidian links, e.g., [[CPU]]
 * Obtain the full link including the brackets.]
 *
 * If the link contains a pipe (|) - this is the NAME
 * If the link contains a hash (#) - this is the ANCHOR / HEADING
 * The text before any hash or pipe is the KEY
 * The full link is a URN
 *
 * If the KEY is a list of the current blogs and contains a NAME. Replace text with NAME but link with KEY e.g., [[how-a-cpu-works|cpu]] -> [cpu](/blog/how-a-cpu-works)
 * If the KEY is a list of the current blogs. Replace text and link with KEY e.g., [[how-a-cpu-works]] -> [how-a-cpu-works](/blog/how-a-cpu-works)
 * If the KEY is a list of the current blogs and contains a NAME and a ANCHOR. Replace text with NAME but link with KEY and ANCHOR e.g., [[how-a-cpu-works#cpu|cpu]] -> [cpu](/blog/how-a-cpu-works#cpu)
 * If the KEY is not in a list of current blogs and contains a NAME. Replace with NAME e.g., [[how-a-cpu-works|cpu]] -> cpu
 * If the KEY is not in a list of current blogs and contains an optional ANCHOR. Replace with KEY e.g., [[how-a-cpu-works]] -> how-a-cpu-works, [[how-a-cpu-works#cpu]] -> how-a-cpu-works
 */

/**
 * TEST EXAMPLES
 * -------------
 *
 * Blogs: ['CPU', 'RAM']
 *
 * Inputs / Outputs:
 *
 * [[CPU]] -> [CPU](/blogs/CPU)
 * [[CPU#CPU1]] -> [CPU](/blogs/CPU#CPU1)
 * [[CPU|CPU2]] -> [CPU2](/blogs/CPU)
 * [[CPU#CPU1|CPU2]] -> [CPU2](/blogs/CPU#CPU1)
 * [[memory]] -> memory
 * [[memory#memory1]] -> memory
 * [[memory|memory2]] -> memory2
 * [[memory#memory1|memory2]] -> memory
 */

const regexWithBrackets = /\[\[(.*?)\]\]/g;
const regexForLinkName = /\|(.*?)\]\]/;
const regexForLinkAnchor = /#(.*?)(?=\||\]\])/;
const regexForlinkKey = /\[\[(.*?)(?=\||#|\]\])/;

const processLink = (blog: string): string => {
  const processedLinks = blog.replaceAll(regexWithBrackets, (val, group) => {
    const linkWithoutBrackets = group as string;

    const name = val.match(regexForLinkName);
    const linkName = name ? name[1] : null;

    // Use link name else full value without brackets.
    const key = val.match(regexForlinkKey);
    const lKey = key ? key[1] : null;
    const linkKey = lKey || linkWithoutBrackets;

    const hash = val.match(regexForLinkAnchor);
    const linkAnchor = hash ? hash[1] : null;

    const url = blogs.find((b) => b.id === linkKey)?.url;
    const currentUrl = window.location.href;

    // If KEY is not in blogs, remove brackets.
    if (!blogs.map((b) => b.id).includes(linkKey) || currentUrl.includes(url || '')) {
      // Use NAME if there is one, else use key.
      return linkName || linkKey;
    }

    if (linkAnchor) {
      return `[${linkName || linkKey}](/blog/${url}#${linkAnchor})`;
    }

    return `[${linkName || linkKey}](/blog/${url})`;
  });

  return processedLinks;
};

export default processLink;

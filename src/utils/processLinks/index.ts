/**
 * Using regex find the obsidian links, e.g., [[CPU]]
 * Obtain the full link including the square brackets.
 *
 * If the link contains a pipe (|) - this is the NAME
 * If the link contains a hash (#) - this is the ANCHOR / HEADING
 * The text before any hash or pipe is the KEY
 * The full link is a URN
 *
 * So, [[ KEY # ANCHOR | NAME ]]
 *
 * * To determine if the link should be a link or text, we use the KEY. Anchor and name are to change display or navigate to a header.
 * For example, blogs = [{id: memory}], blog text contains: [[memory]]. THIS WOULD BE A LINK
 *
 * * Key in list of current blogs:
 * Replace text and link with KEY e.g., [[how-a-cpu-works]] -> [how-a-cpu-works](?paramKey=how-a-cpu-works)
 * And link contains a NAME. Replace text with NAME but link with KEY e.g., [[how-a-cpu-works|cpu]] -> [cpu](?paramKey=how-a-cpu-works)
 * And contains a NAME and a ANCHOR. Replace text with NAME but link with KEY and ANCHOR e.g., [[how-a-cpu-works#cpu|cpu]] -> [cpu](?paramKey=how-a-cpu-works#cpu)
 *
 * * Key is not in list of current blogs:
 * Replace link with key e.g., [[how-a-cpu-works]] -> how-a-cpu-works
 * And contains a NAME. Replace with NAME e.g., [[how-a-cpu-works|cpu]] -> cpu
 * And contains an optional ANCHOR. Replace with KEY e.g., [[how-a-cpu-works]] -> how-a-cpu-works, [[how-a-cpu-works#cpu]] -> how-a-cpu-works
 */

import { Blogs } from 'types';

// Matches text within double brackets, e.g., "this-would-be-truthy" in [[this-would-be-truthy]]
const regexWithBrackets = /\[\[(.*?)\]\]/g;

// Matches text between a pipe "|" and double closing brackets "]]", e.g., "this-would-pass" in |this-would-pass]]
const regexForLinkName = /\|(.*?)\]\]/;

// Matches text between a hash "#" and either a pipe "|" or double closing brackets "]]", e.g., "this-would-be-truthy" in #this-would-be-truthy|
const regexForLinkAnchor = /#(.*?)(?=\||\]\])/;

// Matches text within double brackets until it hits a pipe "|", hash "#", or double closing brackets "]]", e.g., "this-would-be-truthy" in [[this-would-be-truthy|...]]
const regexForlinkKey = /\[\[(.*?)(?=\||#|\]\])/;

type Props = {
  allBlogs: Blogs[];
  /**
   * As we can replace all, we can simply replace all instances of links in one function call.
   */
  blog: string;
  paramKey: string;
};

const processLink = ({ allBlogs, blog, paramKey }: Props): string => {
  const processedLinks = blog.replaceAll(regexWithBrackets, (val, group) => {
    const linkWithoutBrackets = group;

    const name = val.match(regexForLinkName);
    const linkName = name ? name[1] : null;

    // Use link name else full value without brackets.
    const key = val.match(regexForlinkKey);
    const linkKey = key ? key[1] : linkWithoutBrackets;

    const anchor = val.match(regexForLinkAnchor);
    const linkAnchor = anchor ? anchor[1] : null;

    const url = allBlogs.find((blog) => blog.id === linkKey)?.url;
    const currentUrl = window.location.href;

    // If KEY is not in allBlogs simply remove brackets.
    if (!url || currentUrl.includes(url || '')) {
      // Use NAME if there is one, else use key.
      return linkName || linkKey;
    }

    if (linkAnchor) {
      return `[${linkName || linkKey}](?${paramKey}=${url}#${linkAnchor})`;
    }

    return `[${linkName || linkKey}](?${paramKey}=${url})`;
  });

  return processedLinks;
};

export default processLink;

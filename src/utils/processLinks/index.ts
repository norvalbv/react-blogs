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

const regexWithBrackets = /\[\[(.*?)\]\]/g;
const regexForLinkName = /\|(.*?)\]\]/;
const regexForLinkAnchor = /#(.*?)(?=\||\]\])/;
const regexForlinkKey = /\[\[(.*?)(?=\||#|\]\])/;

type Props = {
  allBlogs: Blogs[];
  blog: string;
  paramKey: string;
};

const processLink = ({ allBlogs, blog, paramKey }: Props): string => {
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

    const url = allBlogs.find((b) => b.id === linkKey)?.url;
    const currentUrl = window.location.href;

    // If KEY is not in allBlogs simply remove brackets.
    if (!allBlogs.map((b) => b.id).includes(linkKey) || currentUrl.includes(url || '')) {
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

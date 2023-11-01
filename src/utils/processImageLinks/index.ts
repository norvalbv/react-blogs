type Props = {
  blog: string;
  imagePath?: string;
};

const processImageLinks = ({ blog, imagePath }: Props): string => {
  if (!imagePath) return blog;

  // Find all images with the typical ![[image-here]] syntax common in tools like Obsidian.
  const imageRegex = /!\[\[(.*?)\]\]/g;

  const processedImages = blog.replaceAll(imageRegex, (val, group) => {
    const imageName = group as string;
    const altText = imageName;
    const link = new URL(`${imagePath}/${imageName}`, import.meta.url);
    return `<img src="${link.href}" alt="${altText}" />`;
  });

  return processedImages;
};

export default processImageLinks;

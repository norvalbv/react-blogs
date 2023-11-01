// import processImageLinks from '..';

// describe('processImageLinks', () => {
//   test('should handle single image link', () => {
//     const blog = 'This is an image: ![[image1.jpg]]';
//     const imagePath = '/assets/images';
//     expect(processImageLinks({ blog, imagePath })).toBe(
//       'This is an image: <img src="/assets/images/image1.jpg" alt="image1.jpg" />'
//     );
//   });

//   test('should handle multiple image links', () => {
//     const blog = 'These are images: ![[image1.jpg]] and ![[image2.jpg]]';
//     const imagePath = '/assets/images';
//     expect(processImageLinks({ blog, imagePath })).toBe(
//       'These are images: <img src="/assets/images/image1.jpg" alt="image1.jpg" /> and <img src="/assets/images/image2.jpg" alt="image2.jpg" />'
//     );
//   });

//   test('should handle no image links', () => {
//     const blog = 'This is a blog with no images';
//     const imagePath = '/assets/images';
//     expect(processImageLinks({ blog, imagePath })).toBe('This is a blog with no images');
//   });
// });

// import Header from 'components/Header';
// import Description from 'components/Header/Description';
// import Subtitle from 'components/Header/SubTitle';
// import { TitleProps, Title } from 'components/Header/Title';
// import React, { ReactElement } from 'react';
// import { styles, themes } from 'styles/themes.css';
// import { DefBlogs, DefTheme } from 'types';

// export type ReturnValue = {
//   blogs: DefBlogs;
//   styles: object;
//   Header: ReactElement;
//   themes: unknown;
//   //   Title: ReactElement;
//   //   Description: ReactElement;
//   //   Subtitle: ReactElement;
// };

// const Wrapper = ({
//   component,
//   theme,
// }: {
//   component: ReactElement;
//   theme: DefTheme;
// }): ReactElement => {
//   return <div className={themes[theme?.theme || 'PLAIN_DARK'].nodes}>{component}</div>;
// };

// export const useBlogs = (blogs: DefBlogs, theme: DefTheme): ReturnValue => {
//   // const Header = <Wrapper component={<Title>Hello</Title>} theme={theme} />;
//   const Header = Wrapper({ component: Title({ children: 'hello' }), theme });

//   return {
//     blogs,
//     styles,
//     Header,
//     themes,
//     // Title,
//     // Description,
//     // Subtitle,
//   };
// };

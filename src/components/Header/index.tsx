import React, { ReactElement } from 'react';
import Title from 'components/Header/Title';
import Subtitle from 'components/Header/SubTitle';
import Description, { DescriptionProps } from './Description';
import { TitleProps } from './Title';
import { SubtitleProps } from './SubTitle';

export type HeaderProps = {
  // Own props
  className?: string;
  title?: Omit<TitleProps, 'children'> & { text: string };
  subtitle?: Omit<SubtitleProps, 'children'> & { text: string | JSX.Element };
  description?: Omit<DescriptionProps, 'children'> & { text: string | JSX.Element };
};

const Header = ({ className, description, subtitle, title }: HeaderProps): ReactElement | null => {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <header className={className}>
      <section className="flex w-full flex-col gap-1">
        <Title className={title?.className} level={title?.level}>
          {title?.text}
        </Title>
        <Subtitle className={subtitle?.className}>{subtitle?.text}</Subtitle>
        <Description className={description?.className}>{description?.text}</Description>
      </section>
    </header>
  );
};

export default Header;

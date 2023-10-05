import Subtitle from 'components/Header/SubTitle';
import Title from 'components/Header/Title';
import React, { ReactElement } from 'react';
import Description, { DescriptionProps } from './Description';
import { SubtitleProps } from './SubTitle';
import { TitleProps } from './Title';

export type HeaderProps = {
  // Own props
  className?: string;
  title?: Omit<TitleProps, 'children'> & { text: string };
  subtitle?: Omit<SubtitleProps, 'children'> & { text: string | ReactElement };
  description?: Omit<DescriptionProps, 'children'> & { text: string | ReactElement };
};

const Header = ({ className, description, subtitle, title }: HeaderProps): ReactElement | null => {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <header className={className}>
      <section className="flex w-full flex-col gap-1">
        <Title {...title}>{title?.text}</Title>
        <Subtitle {...subtitle}>{subtitle?.text}</Subtitle>
        <Description {...description}>{description?.text}</Description>
      </section>
    </header>
  );
};

export default Header;

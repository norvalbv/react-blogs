import Subtitle from 'components/Header/SubTitle';
import { Title } from 'components/Header/Title';
import React, { ReactElement } from 'react';
import Description, { DescriptionProps } from './Description';
import { SubtitleProps } from './SubTitle';
import { TitleProps } from './Title';

export type HeaderProps = {
  // Own props
  className?: string;
  title?: Omit<TitleProps, 'children'> & { label: string | ReactElement };
  subtitle?: Omit<SubtitleProps, 'children'> & { label: string | ReactElement };
  description?: Omit<DescriptionProps, 'children'> & { label: string | ReactElement };
};

const Header = ({ className, description, subtitle, title }: HeaderProps): ReactElement | null => {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <header className={className}>
      <Title {...title}>{title?.label}</Title>
      <Subtitle {...subtitle}>{subtitle?.label}</Subtitle>
      <Description {...description}>{description?.label}</Description>
    </header>
  );
};

export default Header;

import { Title, Subtitle } from 'components';
import React, { ReactElement } from 'react';
import Description from './Description';

export type HeaderProps = {
  // Own props
  className?: string;
  title?: string | ReactElement;
  subtitle?: string | ReactElement;
  description?: string | ReactElement;
};

const Header = ({ className, description, subtitle, title }: HeaderProps): ReactElement | null => {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <header className={className}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Description>{description}</Description>
    </header>
  );
};

export default Header;

import React, { ReactElement } from 'react';
import Title from 'components/Header/Title';
import Subtitle from 'components/Header/SubTitle';
import { useRandomReveal } from 'hooks/useRandomReveal';
import Description, { DescriptionProps } from './Description';
import { TitleProps } from './Title';
import { SubtitleProps } from './SubTitle';

export type HeaderProps = {
  // Own props
  className?: string;
  animation?: boolean;
  title?: Omit<TitleProps, 'children'> & { text: string };
  subtitle?: Omit<SubtitleProps, 'children'> & { text: string | JSX.Element };
  description?: Omit<DescriptionProps, 'children'> & { text: string | JSX.Element };
};

const Header = ({
  className,
  description,
  subtitle,
  title,
  animation = true,
}: HeaderProps): ReactElement | null => {
  const processedTitle = useRandomReveal({
    isPlaying: true,
    duration: 1,
    characters: title?.text || '',
    revealDuration: 0.7,
  });

  if (!title && !subtitle) {
    return null;
  }

  return (
    <header className={className}>
      <section className="flex w-full flex-col gap-1">
        <Title className={title?.className} level={title?.level}>
          {animation ? processedTitle : title?.text}
        </Title>
        <Subtitle className={subtitle?.className}>{subtitle?.text}</Subtitle>
        <Description className={description?.className}>{description?.text}</Description>
      </section>
    </header>
  );
};

export default Header;

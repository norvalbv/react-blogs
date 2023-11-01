import { ReactElement } from 'react';

const ExampleOne = (): ReactElement | null => {
  const foo = { hello: 'world' };
  const { hello } = foo;

  return <h1>{hello}</h1>;
};

export default ExampleOne;

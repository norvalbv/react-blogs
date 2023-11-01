import { ReactElement, useState } from 'react';

const ExampleTwo = (): ReactElement | null => {
  const [test, setTest] = useState(false);

  return <h1 onClick={(): void => setTest(!test)}>Hello World</h1>;
};

export default ExampleTwo;

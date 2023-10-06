import '@emotion/react';
import { themes } from 'prism-react-renderer';

declare module '@emotion/react' {
  export interface Theme {
    metadata: string;
    header: string;
    code: keyof typeof themes;
  }
}

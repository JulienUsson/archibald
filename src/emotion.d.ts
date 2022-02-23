import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    spacing: number;
    borderRadius: number;
    colors: {
      text: string;
    };
  }
}

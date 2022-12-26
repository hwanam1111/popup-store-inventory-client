import 'styled-components';
import theme from '@styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: typeof theme.media;
    color: typeof theme.color;
    gradient: typeof theme.gradient;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import baseStyled, { css, CSSProp, ThemedStyledInterface } from 'styled-components';
import palette from '@styles/palette';

const sizes: { [key: string]: number } = {
  mobile: 280,
  tablet: 768,
  desktop: 1024,
};

type BackQuoteArgs = any;

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
};

const minDesktopSize = sizes.desktop;
const minTabletSize = sizes.tablet;

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${minDesktopSize}px) {
            ${args}
          }
        `;
      break;
    case 'tablet':
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${minTabletSize}px) {
            ${args}
          }
        `;
      break;
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

const theme = {
  media,
  ...palette,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;

import { theme } from 'styles';

const getTextColor = (initialColor: string): string => {
  let r, g, b;

  //Check if color is white
  if (
    initialColor === 'white' ||
    initialColor === '#ffffff' ||
    initialColor === 'white'
  ) {
    return '#000000';
  }

  // Check the format of the color, HEX or RGB?
  if (initialColor.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    const convertedColor = initialColor.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = convertedColor[1];
    g = convertedColor[2];
    b = convertedColor[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    const convertedColor = +(
      '0x' +
      initialColor.slice(1).replace(initialColor.length < 5 && /./g, '$&$&')
    );

    r = convertedColor >> 16;
    g = (convertedColor >> 8) & 255;
    b = convertedColor & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 200) {
    return theme.navy;
  } else {
    return theme.layoutContentBg;
  }
};

export default getTextColor;

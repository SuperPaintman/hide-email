'use strict';
/* tslint:disable:no-magic-numbers */
/* Interfaces */
export type Randomizer = () => number;


/* Init */
const defaultRandomizer: Randomizer = () => Math.random();


export function protectEmailFactory(randomizer: Randomizer) {
  // tslint:disable-next-line:no-shadowed-variable
  return function protectEmail(email: string, hexEncoding = false): string {
    const res = new Array(email.length);
    const randomFactor = hexEncoding ? 3 : 2;

    for (let i = 0, ii = email.length; i < ii; i++) {
      const random = randomizer() * randomFactor ^ 0;

      if (random === 0) {
        res[i] = `&#${email.charCodeAt(i)};`;
      } else if (random === 1) {
        res[i] = email.charAt(i);
      } else {
        const hexCode = email
          .charCodeAt(i)
          .toString(16);

        res[i] = `%${hexCode.length === 2 ? hexCode : `0${hexCode}`}`;
      }
    }

    const atIdx = res.indexOf('@');

    if (atIdx !== -1) {
      res[atIdx] = '&#64;';
    }

    return res.join('');
  };
}

// Yes, we could use a factory above, but it makes too much overhead.
export function protectEmailAlways(email: string): string {
  const res = new Array(email.length);

  for (let i = 0, ii = email.length; i < ii; i++) {
    res[i] = `&#${email.charCodeAt(i)};`;
  }

  return res.join('');
}

export const protectEmail = protectEmailFactory(defaultRandomizer);

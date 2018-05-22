'use strict';
/* tslint:disable:ter-prefer-arrow-callback newline-per-chained-call */
/* tslint:disable:no-implicit-dependencies no-magic-numbers */
/* Imports */
import { expect } from 'chai';
import { AllHtmlEntities } from 'html-entities';

import {
  Randomizer,
  hideEmail,
  hideEmailAlways,
  hideEmailFactory
} from './hide-email';


/* Constants */
const AT_CODE = '&#64;';


/* Helpers */
const { decode } = new AllHtmlEntities();
const encodeRandomizer: Randomizer = () => 0;
const originalRandomizer: Randomizer = () => 0.5;
const hexRandomizer: Randomizer = () => 0.7;
const fakeRandomizer: Randomizer = (() => {
  let i = 0;

  return () => i++ % 3 / 3;
})();


/* Tests */
describe('hideEmail', function () {
  const email = 'test@gmail.com';

  it('should work', () => {
    hideEmail(email);
  });

  it('should return a string', () => {
    const res = hideEmail(email);

    expect(res).to.be.a('string');
  });

  it('should contain at least a encoded "@"', () => {
    const res = hideEmail(email);

    expect(res).to.contain(AT_CODE);
  });

  it('should return a valid HTML text', () => {
    const res = hideEmail(email);

    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
  });
});

describe('hideEmailAlways', function () {
  const email = 'test@gmail.com';

  it('should work', () => {
    hideEmailAlways(email);
  });

  it('should return a string', () => {
    const res = hideEmailAlways(email);

    // tslint:disable-next-line:max-line-length
    expect(res).to.be.equal('&#116;&#101;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;');
  });

  it('should contain at least a encoded "@"', () => {
    const res = hideEmailAlways(email);

    expect(res).to.contain(AT_CODE);
  });

  it('should return a valid encoded string', () => {
    const res = hideEmailAlways(email);

    console.log(res);
  });

  it('should return a valid HTML text', () => {
    const res = hideEmailAlways(email);

    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
  });
});

describe('hideEmailFactory', function () {
  const email = 'test@gmail.com';

  const hideEmailEncode = hideEmailFactory(encodeRandomizer);
  const hideEmailOriginal = hideEmailFactory(originalRandomizer);
  const hideEmailHex = hideEmailFactory(hexRandomizer);
  const hideEmailFake = hideEmailFactory(fakeRandomizer);

  it('should work', () => {
    hideEmailFactory(() => 0);
  });

  it('should return a function', () => {
    const res = hideEmailFactory(() => 0);

    expect(res).to.be.a('function');
  });

  it('should return a function which is similar to the "hideEmail"', () => {
    const newHideEmail = hideEmailFactory(() => Math.random());

    const res = newHideEmail(email);

    expect(res).to.be.a('string');
    expect(res).to.contain(AT_CODE);
    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
    expect(newHideEmail.toString()).to.be.equal(hideEmail.toString());
  });

  describe('hideEmailEncode', () => {
    it('should return encoded string', () => {
      const res = hideEmailEncode(email);

      // tslint:disable-next-line:max-line-length
      expect(res).to.be.equal('&#116;&#101;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;');
    });
  });

  describe('hideEmailOriginal', () => {
    it('should return encoded string', () => {
      const res = hideEmailOriginal(email);

      expect(res).to.be.equal('test&#64;gmail.com');
    });
  });

  describe('hideEmailHex', () => {
    it('should return encoded string', () => {
      const res = hideEmailHex(email, true);

      expect(res).to.be.equal('%74%65%73%74%40%67%6d%61%69%6c%2e%63%6f%6d');
    });
  });

  describe('hideEmailFake', () => {
    it('should return encoded string', () => {
      const res = hideEmailFake(email);

      // tslint:disable-next-line:max-line-length
      expect(res).to.be.equal('&#116;&#101;s&#116;&#64;g&#109;&#97;i&#108;&#46;c&#111;&#109;');
      expect(decode(res)).to.be.equal(email);
    });

    it('should support "hexEncoding" parameter', () => {
      const res = hideEmailFake(email, true);

      expect(res).to.be.equal('%74&#101;s%74&#64;g%6d&#97;i%6c&#46;c%6f&#109;');
      expect(decode(res)).to.be.equal('%74es%74@g%6dai%6c.c%6fm');
    });
  });
});

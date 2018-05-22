'use strict';
/* tslint:disable:ter-prefer-arrow-callback newline-per-chained-call */
/* tslint:disable:no-implicit-dependencies no-magic-numbers */
/* Imports */
import { expect } from 'chai';
import { AllHtmlEntities } from 'html-entities';

import {
  Randomizer,
  protectEmail,
  protectEmailAlways,
  protectEmailFactory
} from './protect-email';


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
describe('protectEmail', function () {
  const email = 'test@gmail.com';

  it('should work', () => {
    protectEmail(email);
  });

  it('should return a string', () => {
    const res = protectEmail(email);

    expect(res).to.be.a('string');
  });

  it('should contain at least a encoded "@"', () => {
    const res = protectEmail(email);

    expect(res).to.contain(AT_CODE);
  });

  it('should return a valid HTML text', () => {
    const res = protectEmail(email);

    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
  });
});

describe('protectEmailAlways', function () {
  const email = 'test@gmail.com';

  it('should work', () => {
    protectEmailAlways(email);
  });

  it('should return a string', () => {
    const res = protectEmailAlways(email);

    // tslint:disable-next-line:max-line-length
    expect(res).to.be.equal('&#116;&#101;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;');
  });

  it('should contain at least a encoded "@"', () => {
    const res = protectEmailAlways(email);

    expect(res).to.contain(AT_CODE);
  });

  it('should return a valid encoded string', () => {
    const res = protectEmailAlways(email);

    console.log(res);
  });

  it('should return a valid HTML text', () => {
    const res = protectEmailAlways(email);

    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
  });
});

describe('protectEmailFactory', function () {
  const email = 'test@gmail.com';

  const protectEmailEncode = protectEmailFactory(encodeRandomizer);
  const protectEmailOriginal = protectEmailFactory(originalRandomizer);
  const protectEmailHex = protectEmailFactory(hexRandomizer);
  const protectEmailFake = protectEmailFactory(fakeRandomizer);

  it('should work', () => {
    protectEmailFactory(() => 0);
  });

  it('should return a function', () => {
    const res = protectEmailFactory(() => 0);

    expect(res).to.be.a('function');
  });

  it('should return a function which is similar to the "protectEmail"', () => {
    const newProtectEmail = protectEmailFactory(() => Math.random());

    const res = newProtectEmail(email);

    expect(res).to.be.a('string');
    expect(res).to.contain(AT_CODE);
    expect(res.length).to.be.gte(email.length);
    expect(decode(res)).to.be.equal(email);
    expect(newProtectEmail.toString()).to.be.equal(protectEmail.toString());
  });

  describe('protectEmailEncode', () => {
    it('should return encoded string', () => {
      const res = protectEmailEncode(email);

      // tslint:disable-next-line:max-line-length
      expect(res).to.be.equal('&#116;&#101;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;');
    });
  });

  describe('protectEmailOriginal', () => {
    it('should return encoded string', () => {
      const res = protectEmailOriginal(email);

      expect(res).to.be.equal('test&#64;gmail.com');
    });
  });

  describe('protectEmailHex', () => {
    it('should return encoded string', () => {
      const res = protectEmailHex(email, true);

      expect(res).to.be.equal('%74%65%73%74%40%67%6d%61%69%6c%2e%63%6f%6d');
    });
  });

  describe('protectEmailFake', () => {
    it('should return encoded string', () => {
      const res = protectEmailFake(email);

      // tslint:disable-next-line:max-line-length
      expect(res).to.be.equal('&#116;&#101;s&#116;&#64;g&#109;&#97;i&#108;&#46;c&#111;&#109;');
      expect(decode(res)).to.be.equal(email);
    });

    it('should support "hexEncoding" parameter', () => {
      const res = protectEmailFake(email, true);

      expect(res).to.be.equal('%74&#101;s%74&#64;g%6d&#97;i%6c&#46;c%6f&#109;');
      expect(decode(res)).to.be.equal('%74es%74@g%6dai%6c.c%6fm');
    });
  });
});

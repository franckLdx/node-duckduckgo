import * as chai from 'chai';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { mapParameters } from '../lib/parameters';

chai.should();

describe('should support appName parameters', () => {
  it('valid appName should be accepted', () => {
    const actual = mapParameters('appName', 'foo');
    actual.should.be.deep.equal(['appName', 'foo']);
  });

  const unvalidAppNames = [undefined, null, '', {}];
  unvalidAppNames.forEach((wrongAppName: any) => {
    it(`unvalid appName ${wrongAppName} should be rejected`, () => {
      expect(() => mapParameters('appName', wrongAppName)).to.throw(Error);
    });
  });
});

const unvalidValues = [undefined, null, '', 'foo', {}];

describe('should support format parameters', () => {
  const validFormats = ['json', 'xml'];
  validFormats.forEach(format => {
    it(`valid format ${format} should be accepted`, () => {
      const actual = mapParameters('format', format);
      actual.should.be.deep.equal(['format', format]);
    });
  });
  unvalidValues.forEach((format: any) => {
    it(`unvalid format ${format} should be rejected`, () => {
      expect(() => mapParameters('format', format)).to.throw(Error);
    });
  });
});

describe('should support parentalFilter parameters', () => {
  const validParentalFilters = {
    Activated: 1,
    Moderate: -1,
    Deactivated: -2
  };
  Object.entries(validParentalFilters).forEach(([userValue, expectedValue]) => {
    it(`valid parentalFilter ${userValue} should be accepted`, () => {
      const actual = mapParameters('parentalFilter', userValue);
      actual.should.be.deep.equal(['kp', expectedValue]);
    });
  });

  unvalidValues.forEach(userValue => {
    it(`unvalid parentalFilter ${userValue} should be rejected`, () => {
      expect(() => mapParameters('parentalFilter', userValue)).to.throw(Error);
    });
  });
});

const validBooleanValues = [true, false];
const booleanParameters = {
  noRedirect: 'no_redirect',
  noHtml: 'no_html',
  skipDisambig: 'skip_disambig'
};
Object.entries(booleanParameters).forEach(([userParam, expectedParam]) => {
  describe(`should support ${userParam} parameters`, () => {
    validBooleanValues.forEach(userValue => {
      it(`valid ${userParam} ${userValue} should be accepted`, () => {
        const actual = mapParameters(userParam, userValue);
        actual.should.be.deep.equal([expectedParam, Number(userValue)]);
      });
    });
    unvalidValues.forEach(userValue => {
      it(`unvalid ${userParam} ${userValue} should be rejected`, () => {
        expect(() => mapParameters(userParam, userValue)).to.throw(Error);
      });
    });
  });
});

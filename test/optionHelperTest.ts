import * as chai from 'chai';

const should = chai.should();
import { OptionHelper } from '../lib/optionHelper';

describe('Option Helper test', function () {
  it('Set No value, builder method should not be called', function () {
    const option = new OptionHelper('foo');
    const builder = {
      foo() { throw new Error('SHould not be called'); }
    };
    option.buildQueryParam(builder);
    should.not.exist(option.option);
  });

  it('Set a value, builder method should be called with this value', function () {
    const expecterValue = 1;

    let actualValue: any;
    const option = new OptionHelper('foo');
    option.option = expecterValue;
    const builder = {
      foo(param: any) { actualValue = param; }
    };
    option.buildQueryParam(builder);
    actualValue.should.be.deep.equal(expecterValue);
    option.option.should.be.deep.equal(expecterValue);
  });

});

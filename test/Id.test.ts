import { expect } from 'chai';
import { Id } from '../src/ts/model/Id'

describe('Id', function() {
  it('constructor', function() {
    let result = new Id();

    expect(result.uuid.length).equal(36);
    expect(result.uuid).is.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
  })
  
})

import { expect } from 'chai';
import { ArraysRoutines } from '../src/ts/model/ArraysRoutines'
import { Id } from '../src/ts/model/Id'

describe('ArraysRoutines', function() {
  it('array_ShouldRemoveUuid_WhenItPresentsAndOne', function() {
    let item1 = new Id();
    let arr = [item1];
    let result = ArraysRoutines.removeItemFromListByUuid(arr, item1.uuid);

    expect(result).is.empty;
  })

  it('array_ShouldRemoveUuid_WhenItPresentsMany', function() {
    let item1 = new Id();
    let item2 = new Id();
    let item3 = new Id();
    let arr = [item1, item2, item3];
    let resultRemove1 = ArraysRoutines.removeItemFromListByUuid(arr, item1.uuid);
    let resultRemove2 = ArraysRoutines.removeItemFromListByUuid(arr, item2.uuid);
    let resultRemove3 = ArraysRoutines.removeItemFromListByUuid(arr, item3.uuid);

    expect(resultRemove1.length).equal(2);
    expect(resultRemove1[0].uuid).equal(item2.uuid);
    expect(resultRemove1[1].uuid).equal(item3.uuid);

    expect(resultRemove2.length).equal(2);
    expect(resultRemove2[0].uuid).equal(item1.uuid);
    expect(resultRemove2[1].uuid).equal(item3.uuid);

    expect(resultRemove3.length).equal(2);
    expect(resultRemove3[0].uuid).equal(item1.uuid);
    expect(resultRemove3[1].uuid).equal(item2.uuid);
  })

  it('array_ShouldNotChangeAnything_WhenArrayIsEmpty', function() {
    let arr: Id[] = [];
    let result = ArraysRoutines.removeItemFromListByUuid(arr, 'aaa');

    expect(result).is.empty;
  })

  it('array_ShouldNotDelete_WhenItemDoesntExist', function() {
    let item1 = new Id();
    let arr = [item1];
    let result = ArraysRoutines.removeItemFromListByUuid(arr, 'aaa');

    expect(result).is.not.empty;
  })

})

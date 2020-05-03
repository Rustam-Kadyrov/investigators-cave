import { expect } from 'chai';
import { ArraysRoutines } from '../src/ts/model/ArraysRoutines'
import { Id } from '../src/ts/model/Id'

describe('ArraysRoutines', function() {
  describe("removeItemFromListByUuid", function() {
    it('ShouldRemoveUuid_WhenItPresentsAndOne', function() {
      let item1 = new Id();
      let arr = [item1];
      let result = ArraysRoutines.removeItemFromListByUuid(arr, item1._id);

      expect(result).is.empty;
    })

    it('ShouldRemoveUuid_WhenItPresentsMany', function() {
      let item1 = new Id();
      let item2 = new Id();
      let item3 = new Id();
      let arr = [item1, item2, item3];
      let resultRemove1 = ArraysRoutines.removeItemFromListByUuid(arr, item1._id);
      let resultRemove2 = ArraysRoutines.removeItemFromListByUuid(arr, item2._id);
      let resultRemove3 = ArraysRoutines.removeItemFromListByUuid(arr, item3._id);

      expect(resultRemove1.length).equal(2);
      expect(resultRemove1[0]._id).equal(item2._id);
      expect(resultRemove1[1]._id).equal(item3._id);

      expect(resultRemove2.length).equal(2);
      expect(resultRemove2[0]._id).equal(item1._id);
      expect(resultRemove2[1]._id).equal(item3._id);

      expect(resultRemove3.length).equal(2);
      expect(resultRemove3[0]._id).equal(item1._id);
      expect(resultRemove3[1]._id).equal(item2._id);
    })

    it('ShouldNotChangeAnything_WhenArrayIsEmpty', function() {
      let arr: Id[] = [];
      let result = ArraysRoutines.removeItemFromListByUuid(arr, 'aaa');

      expect(result).is.empty;
    })

    it('ShouldNotDelete_WhenItemDoesntExist', function() {
      let item1 = new Id();
      let arr = [item1];
      let result = ArraysRoutines.removeItemFromListByUuid(arr, 'aaa');

      expect(result).is.not.empty;
    })
  })
})

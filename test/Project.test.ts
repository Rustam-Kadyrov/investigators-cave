import { expect } from 'chai';
import { Project } from '../src/ts/model/Project';
import { KnownRecord } from '../src/ts/model/KnownRecord';
import { UnknownRecord } from '../src/ts/model/UnknownRecord';
import { CheckRecord } from '../src/ts/model/CheckRecord';
import { CheckResult } from '../src/ts/model/CheckRecord';
import { FreeDrawPayload } from '../src/ts/model/FreeDrawPayload';
import { TagRecord } from '../src/ts/model/TagRecord';

describe('Project', function() {
  describe("constructor", function() {
    it('ShouldInitDefaults_WhenDefaultsNotSet', function() {
      let result = new Project("Title", "Description");
      expect(result._id).to.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
      expect(result.title).equal("Title");
      expect(result.description).equal("Description");
      expect(result.known).is.empty;
      expect(result.unknown).is.empty;
      expect(result.checkList).is.empty;
      expect(result.tags).is.empty;
      expect(result.freeDrawPlanes).is.empty;
    })

    it('ShouldSetDefaults_WhenDefaultsSet', function() {
      let unknownRecord = new UnknownRecord("Some info1");
      let result = new Project(
        "Title",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [unknownRecord],
        [new CheckRecord(unknownRecord._id, CheckResult.NO_MATTER)],
        [new TagRecord("tag1"), new TagRecord("tag2")],
        [new FreeDrawPayload(), new FreeDrawPayload(), new FreeDrawPayload()]
      );

      expect(result.title).equal("Title");
      expect(result.description).equal("Description");
      expect(result.known).to.have.length(2);
      expect(result.known[0].label).equal("fact1");
      expect(result.known[1].label).equal("fact2");
      expect(result.unknown.length).equal(1)
      expect(result.unknown[0].label).is.equal("Some info1")
      expect(result.checkList).to.have.length(1);
      expect(result.checkList[0].status).is.equal(CheckResult.NO_MATTER);
      expect(result.tags.length).equal(2);
      expect(result.tags[0].label).equal("tag1");
      expect(result.tags[1].label).equal("tag2");
      expect(result.freeDrawPlanes.length).equal(3);
    })
  })
})

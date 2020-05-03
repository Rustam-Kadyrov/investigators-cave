import { expect } from 'chai';
import { RepositoryImpl } from '../src/ts/repository/Repository';
import { ConnectionImpl } from '../src/ts/repository/Connection';
import { TagRecord } from '../src/ts/model/TagRecord';

describe('RepositoryTagRecords', function() {

  let rep: RepositoryImpl<TagRecord>;

  beforeEach(() => {
    let connection = ConnectionImpl.getConnectionInMemory();
    rep = new RepositoryImpl(connection);
  });

  afterEach(() => {
    rep = null;
  });

  describe("save", function() {
    it('ShouldSave_WhenCorrectEntity', function() {
      rep.findAll(function(docs: TagRecord[]) {
        expect(docs.length).equal(0);
      });

      rep.save(new TagRecord("Tag1"), function(newDoc: TagRecord) {
        expect(newDoc._id).is.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
        expect(newDoc.label).equal("Tag1");
      });

      rep.findAll(function(docs: TagRecord[]) {
        expect(docs.length).equal(1);
      });
    })

    it('ShouldSave10Times_When10TimesSaved', function() {
      rep.findAll(function(docs: TagRecord[]) {
        expect(docs.length).equal(0);
      });

      for (let i = 0; i < 10; i++) {
        rep.save(new TagRecord("Tag" + i), function(newDoc: TagRecord) {
          expect(newDoc._id).is.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
          expect(newDoc.label).equal("Tag" + i);
        });
      }

      rep.findAll(function(docs: TagRecord[]) {
        expect(docs.length).equal(10);
      });
    })

  })

  describe("findById", function() {
    it('ShouldFindParticularEntity_WhenOthersPresented', function() {

      let storedItems: TagRecord[] = [];
      for (let i = 0; i < 10; i++) {
        rep.save(new TagRecord("Tag" + i), function(newDoc: TagRecord) {
          storedItems.push(newDoc);
        });
      }

      //This code snippet waits until array will be filled out
      let repLocal = rep; //setInterval can't see variable that declared outside this block (neither let nor var). So need to redeclare it in nearest variable
      let timeout = setInterval(function() {
        if (storedItems.length == 10) {
          clearInterval(timeout);
          repLocal.findById(storedItems[2]._id, function(docs: TagRecord[]) {
            expect(docs.length).equal(1);
            expect(docs[0]._id).equal(storedItems[2]._id);
            expect(docs[0].label).equal(storedItems[2].label);
          });
        }
      }, 100)
    })
  })

  describe("findByQuery", function() {
    beforeEach(() => {
      rep.save(new TagRecord("One tag"), function(newDoc: TagRecord) { });
      rep.save(new TagRecord(""), function(newDoc: TagRecord) { });
      rep.save(new TagRecord("Another tag"), function(newDoc: TagRecord) { });
      rep.save(new TagRecord("Another tag2"), function(newDoc: TagRecord) { });
    })

    it('ShouldFindTagByStrictEquality_WhenOthersPresented', function() {

      rep.findByQuery({ label: "Another tag" }, function(docs: TagRecord[]) {
        expect(docs.length).equal(1);
        expect(docs[0].label).is.equal("Another tag");
      });

    })

    it('ShouldFindTagByEmptyString_WhenOthersPresented', function() {

      rep.findByQuery({ label: "" }, function(docs: TagRecord[]) {
        expect(docs.length).equal(1);
        expect(docs[0].label).is.equal("");
      });

    })

    it('ShouldFindTagByRegexp_WhenOthersPresented', function() {

      rep.findByQuery({ label: /^Another.*/ }, function(docs: TagRecord[]) {
        expect(docs.length).equal(2);
        expect(docs.map(rec => { return rec.label })).to.have.members(["Another tag", "Another tag2"]);
      });

      rep.findByQuery({ label: /^.*tag.*$/ }, function(docs: TagRecord[]) {
        expect(docs.length).equal(3);
        expect(docs.map(rec => { return rec.label })).to.have.members(["One tag", "Another tag", "Another tag2"]);
      });

      rep.findByQuery({ label: /^(Another|One) tag$/ }, function(docs: TagRecord[]) {
        expect(docs.length).equal(2);
        expect(docs.map(rec => { return rec.label })).to.have.members(["One tag", "Another tag"]);
      });
    })
  })

})

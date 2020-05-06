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
    it('ShouldSave_WhenCorrectEntity', async () => {
      let itemsBefore = await rep.findAll();

      let tagStored = await rep.save(new TagRecord("Tag1"));

      let itemsAfter = await rep.findAll();

      expect(itemsBefore).to.have.length(0);
      expect(itemsAfter).to.have.length(1);
      expect(tagStored._id).to.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
      expect(tagStored.label).to.equal("Tag1");
    })

    it('ShouldSave10Times_When10TimesSaved', async () => {
      let itemsBefore = await rep.findAll();

      let promises: Promise<TagRecord>[] = [];
      for (let i = 0; i < 10; i++) {
        promises.push(rep.save(new TagRecord("Tag" + i)));
      }
      let results = await Promise.all(promises);

      let itemsAfter = await rep.findAll();

      expect(itemsBefore).to.have.length(0);
      expect(itemsAfter).to.have.length(10);
      expect(results).to.be.an('array').to.have.length(10);
      for (let i = 0; i < 10; i++) {
        expect(results[i]._id).to.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
        expect(results[i].label).to.match(/^Tag[0-9]{1,}$/);
      }
    })
  })

  describe("findById", function() {
    it('ShouldFindParticularEntity_WhenOthersPresented', async () => {
      let promises: Promise<TagRecord>[] = [];
      for (let i = 0; i < 10; i++) {
        promises.push(rep.save(new TagRecord("Tag" + i)));
      }
      let storedItems = await Promise.all(promises);

      let docs = await rep.findById(storedItems[2]._id);

      expect(docs).to.have.length(1);
      expect(docs[0]._id).to.equal(storedItems[2]._id);
      expect(docs[0].label).to.equal(storedItems[2].label);
    })
  })

  describe("findByQuery", function() {
    beforeEach(async () => {
      await Promise.all([
        rep.save(new TagRecord("One tag")),
        rep.save(new TagRecord("")),
        rep.save(new TagRecord("Another tag")),
        rep.save(new TagRecord("Another tag2"))
      ]);
    })

    it('ShouldFindTagByStrictEquality_WhenOthersPresented', async () => {
      let docs = await rep.findByQuery({ label: "Another tag" });
      expect(docs).to.have.length(1);
      expect(docs[0].label).to.equal("Another tag");
    })

    it('ShouldFindTagByEmptyString_WhenOthersPresented', async () => {
      let docs = await rep.findByQuery({ label: "" });
      expect(docs).to.have.length(1);
      expect(docs[0].label).to.equal("");
    })

    it('ShouldFindTagByRegexp_WhenOthersPresented', async () => {

      let regexp1 = await rep.findByQuery({ label: /^Another.*/ });
      expect(regexp1).to.have.length(2);
      expect(regexp1.map(rec => { return rec.label })).to.have.members(["Another tag", "Another tag2"]);

      let regexp2 = await rep.findByQuery({ label: /^.*tag.*$/ });
      expect(regexp2).to.have.length(3);
      expect(regexp2.map(rec => { return rec.label })).to.have.members(["One tag", "Another tag", "Another tag2"]);

      let regexp3 = await rep.findByQuery({ label: /^(Another|One) tag$/ });
      expect(regexp3).to.have.length(2);
      expect(regexp3.map(rec => { return rec.label })).to.have.members(["One tag", "Another tag"]);
    })
  })

})

import { expect } from 'chai';
import { RepositoryImpl } from '../src/ts/repository/Repository';
import { ConnectionImpl } from '../src/ts/repository/Connection';
import { TagRecord } from '../src/ts/model/TagRecord';

describe('RepositoryTagRecords', function() {

  let rep: RepositoryImpl<TagRecord>;

  before(() => {
    let connection = new ConnectionImpl("investigators_cave_test", "tags.db", true);
    rep = new RepositoryImpl(connection);
    connection.connect();
  });

  after(() => {
    rep = null;
  });

  it('save', function() {
    rep.findAll(function(docs: TagRecord[]) {
      expect(docs.length).equal(0);
    });

    rep.save(new TagRecord("Tag1"), function(newDoc: TagRecord) {
      expect(newDoc._id).is.not.empty;
      expect(newDoc._id.length).equal(16);
      expect(newDoc.label).equal("Tag1");
    });
    rep.save(new TagRecord("Tag2"), function(newDoc: any) {
      expect(newDoc._id).is.not.empty;
      expect(newDoc._id.length).equal(16);
      expect(newDoc.label).equal("Tag2");
    });

    rep.findAll(function(docs: TagRecord[]) {
      expect(docs.length).equal(2);
      expect(docs[0].label).is.oneOf(["Tag1", "Tag2"]);
      expect(docs[1].label).is.oneOf(["Tag1", "Tag2"].filter(f => f != docs[0].label));
    });
  })

})

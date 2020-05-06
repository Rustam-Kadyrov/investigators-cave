import { expect } from 'chai';
import { RepositoryImpl } from '../src/ts/repository/Repository';
import { SortPagination } from '../src/ts/repository/Repository';
import { ConnectionImpl } from '../src/ts/repository/Connection';
import { Project } from '../src/ts/model/Project';
import { KnownRecord } from '../src/ts/model/KnownRecord';
import { UnknownRecord } from '../src/ts/model/UnknownRecord';
import { CheckRecord } from '../src/ts/model/CheckRecord';
import { CheckResult } from '../src/ts/model/CheckRecord';
import { FreeDrawPayload } from '../src/ts/model/FreeDrawPayload';
import { TagRecord } from '../src/ts/model/TagRecord';

describe('RepositoryProject', function() {

  let rep: RepositoryImpl<Project>;

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

      let unknownRecord = new UnknownRecord("Some info1");
      let project = new Project(
        "Title",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [unknownRecord],
        [new CheckRecord(unknownRecord._id, CheckResult.NO_MATTER)],
        [new TagRecord("tag1"), new TagRecord("tag2")],
        [new FreeDrawPayload(), new FreeDrawPayload(), new FreeDrawPayload()]
      );

      let savedProject = await rep.save(project);
      let itemsAfter = await rep.findAll();

      expect(itemsBefore).to.have.length(0);
      expect(itemsAfter).to.have.length(1);
      expect(itemsAfter[0]._id).to.equal(savedProject._id);
    })
  })

  describe("update", function() {
    it('ShouldUpdateOneDocument_WhenManyPresented', async () => { //TODO
      let itemsBefore = await rep.findAll();

      let unknownRecord = new UnknownRecord("Some info1");
      let project = await rep.save(new Project(
        "Title",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [unknownRecord],
        [new CheckRecord(unknownRecord._id, CheckResult.NO_MATTER)],
        [new TagRecord("tag1"), new TagRecord("tag2")],
        [new FreeDrawPayload(), new FreeDrawPayload(), new FreeDrawPayload()]
      ));

      await rep.save(new Project(
        "Title2",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [unknownRecord],
        [new CheckRecord(unknownRecord._id, CheckResult.NO_MATTER)],
        [new TagRecord("tag1"), new TagRecord("tag2")],
        [new FreeDrawPayload(), new FreeDrawPayload(), new FreeDrawPayload()]
      ));

      let findNewBefore = await rep.findByQuery({ title: "Something new" });
      let findInitialBefore = await rep.findByQuery({ title: "Title" });

      let updateResult = await rep.updateById(project._id, { title: "Something new" });

      let findNewAfter = await rep.findByQuery({ title: "Something new" });
      let findInitialAfter = await rep.findByQuery({ title: "Title" });

      let itemsAfter = await rep.findAll();

      expect(itemsBefore).to.have.length(0);
      expect(findNewBefore).is.empty;
      expect(findInitialBefore).to.have.length(1);
      expect(findNewAfter).to.have.length(1);
      expect(findInitialAfter).is.empty;
      expect(itemsAfter).to.have.length(2);
      expect(updateResult).to.equal(1);
    })
  })

  describe("findByQueryWithOptions", () => {
    beforeEach(async () => {
      let project = new Project(
        "Title",
        "Description",
        [new KnownRecord("fact1")],
        [],
        [],
        [new TagRecord("tag1"), new TagRecord("tag2")],
        []
      );
      let project2 = new Project(
        "Project2",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [],
        [],
        [new TagRecord("tag1"), new TagRecord("tag2"), new TagRecord("tt")],
        []
      );
      let project3 = new Project(
        "Project3",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [],
        [],
        [new TagRecord("xar"), new TagRecord("xaa"), new TagRecord("abc"), new TagRecord("cc"), new TagRecord("bb")],
        []
      );
      let project4 = new Project(
        "Project4",
        "Description",
        [new KnownRecord("fact1"), new KnownRecord("fact2")],
        [],
        [new CheckRecord("123", CheckResult.NO_MATTER), new CheckRecord("333", CheckResult.LEARNED)],
        [new TagRecord("xar"), new TagRecord("xaa"), new TagRecord("abc"), new TagRecord("cc"), new TagRecord("bb")],
        []
      );
      await Promise.all([
        rep.save(project),
        rep.save(project2),
        rep.save(project3),
        rep.save(project4)]);
    })

    it("ShouldReturnOnlyTitleAndTags_WhenProjectHasManyTags", async () => {
      let docs = await rep.findByQueryProjection({ title: "Project2" }, { _id: 0, title: 1, 'tags.label': 1 });
      expect(docs).to.have.length(1);
      expect(docs[0].title).is.equal("Project2");
      expect(docs[0].tags.label).to.have.members(["tag1", "tag2", "tt"]);
      expect(docs[0].known).is.undefined;
      expect(docs[0].description).is.undefined;
    })

    it("ShouldReturnOnlyIds_WhenProjectExists", async () => {
      let docs = await rep.findByQueryProjection({ title: "Title" }, { _id: 1, 'tags._id': 1, 'known._id': 1 });
      expect(docs).to.have.length(1);
      expect(docs[0]._id).is.not.undefined;
      expect(docs[0].title).is.undefined;
      expect(docs[0].description).is.undefined;
      expect(docs[0].tags._id.length).equal(2);
      expect(docs[0].known._id.length).equal(1);
    })

    it("ShouldReturnOnlyCheckListStatus_WhenProjectExists", async () => {
      let docs = await rep.findByQueryProjection({ title: "Project4" }, { _id: 0, 'checkList.status': 1 });
      expect(docs).to.have.length(1);
      expect(docs[0].title).is.undefined;
      expect(docs[0].description).is.undefined;
      expect(docs[0].tags).is.undefined;
      expect(docs[0].known).is.undefined;
      expect(docs[0].checkList.status.length).equal(2);
      expect(docs[0].checkList.status[0]).is.equal(CheckResult.NO_MATTER);
      expect(docs[0].checkList.status[1]).is.equal(CheckResult.LEARNED);
    })

    it("ShouldReturnOnlyTagsAndTitlesSortedByTitle_When2ProjectsMatch", async () => {
      let docs = await rep.findByQueryProjection({ title: /(Title|Project2)/ }, { _id: 0, title: 1, 'tags.label': 1 },
        new SortPagination({ title: 1 }));
      expect(docs).to.have.length(2);
      let item = docs[0];
      expect(item._id).is.undefined;
      expect(item.title).equal('Project2');
      expect(item.description).is.undefined;
      expect(item.tags.label).to.have.members(["tag1", "tag2", "tt"]);
      expect(item.known).is.undefined;

      item = docs[1];
      expect(item._id).is.undefined;
      expect(item.title).equal('Title');
      expect(item.description).is.undefined;
      expect(item.tags.label).to.have.members(["tag1", "tag2"]);
      expect(item.known).is.undefined;
    })

    it("ShouldSkip2AndLimitTo1WhenSortReverse_WhenManyProjects", async () => {
      let docs = await rep.findByQueryProjection({}, { _id: 0, title: 1 },
        new SortPagination({ title: -1 }, 2, 1));
      expect(docs.length).equal(1);
      expect(docs[0]._id).is.undefined;
      expect(docs[0].title).equal('Project3');
    })
  })
})

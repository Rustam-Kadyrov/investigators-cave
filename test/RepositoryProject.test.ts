import { expect } from 'chai';
import { RepositoryImpl } from '../src/ts/repository/Repository';
import { QueryOptions } from '../src/ts/repository/Repository';
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
    it('ShouldSave_WhenCorrectEntity', function() {
      rep.findAll(function(docs: Project[]) {
        expect(docs.length).equal(0);
      });

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

      rep.save(project, function(newDoc: Project) {
        expect(newDoc._id).is.match(/^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/);
      });

      rep.findAll(function(docs: Project[]) {
        expect(docs.length).equal(1);
      });
    })
  })

  describe("findByQueryWithOptions", function() {
    beforeEach(() => {
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
      rep.save(project, function() { });
      rep.save(project2, function() { });
      rep.save(project3, function() { });
      rep.save(project4, function() { });
    })

    it("ShouldReturnOnlyTitleAndTags_WhenProjectHasManyTags", function() {
      rep.findByQueryWithOptions({ title: "Project2" }, QueryOptions.byProjection({ _id: 0, title: 1, 'tags.label': 1 }), function(docs: any) {
        expect(docs.length).equal(1);
        expect(docs[0].title).is.equal("Project2");
        expect(docs[0].tags.label).to.have.members(["tag1", "tag2", "tt"]);
        expect(docs[0].known).is.undefined;
        expect(docs[0].description).is.undefined;
      })
    })

    it("ShouldReturnOnlyIds_WhenProjectExists", function() {
      rep.findByQueryWithOptions({ title: "Title" }, QueryOptions.byProjection({ _id: 1, 'tags._id': 1, 'known._id': 1 }), function(docs: any) {
        expect(docs.length).equal(1);
        expect(docs[0].title).is.undefined;
        expect(docs[0].description).is.undefined;
        expect(docs[0].tags._id.length).equal(2);
        expect(docs[0].known._id.length).equal(1);
      })
    })

    it("ShouldReturnOnlyCheckListStatus_WhenProjectExists", function() {
      rep.findByQueryWithOptions({ title: "Project4" },
      QueryOptions.byProjection({ _id: 0, 'checkList.status': 1 }), function(docs: any) {
        expect(docs.length).equal(1);
        expect(docs[0].title).is.undefined;
        expect(docs[0].description).is.undefined;
        expect(docs[0].tags).is.undefined;
        expect(docs[0].known).is.undefined;
        expect(docs[0].checkList.status.length).equal(2);
        expect(docs[0].checkList.status[0]).is.equal(CheckResult.NO_MATTER);
        expect(docs[0].checkList.status[1]).is.equal(CheckResult.LEARNED);
      })
    })

    it("ShouldReturnOnlyTagsAndTitlesSortedByTitle_When2ProjectsMatch", function() {
      rep.findByQueryWithOptions({ title: /(Title|Project2)/ },
        new QueryOptions({ _id: 0, title: 1, 'tags.label': 1 }, { title: 1 }),
        function(docs: any) {
          expect(docs.length).equal(2);
          let item = docs[0];
          expect(item.title).equal('Project2');
          expect(item.description).is.undefined;
          expect(item.tags.label).to.have.members(["tag1", "tag2", "tt"]);
          expect(item.known).is.undefined;

          item = docs[1];
          expect(item.title).equal('Title');
          expect(item.description).is.undefined;
          expect(item.tags.label).to.have.members(["tag1", "tag2"]);
          expect(item.known).is.undefined;
        })
    })

    it("ShouldSkip2AndLimitTo1WhenSortReverse_WhenManyProjects", function() {
      rep.findByQueryWithOptions({},
        new QueryOptions({ _id: 0, title: 1 }, { title: -1 }, 2, 1), function(docs: any) {
          expect(docs.length).equal(1);
          expect(docs[0].title).equal('Project3');
        })
    })
  })
})

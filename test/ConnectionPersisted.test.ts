import { expect } from 'chai';
import { Repository, RepositoryImpl } from '../src/ts/repository/Repository';
import { Connection, ConnectionImpl } from '../src/ts/repository/Connection';
import { Id } from '../src/ts/model/Id';
import { unlink, rmdir } from 'fs';
import { dirname } from 'path';

describe('ConnectionImpl', () => {

  describe("getConnectionPersisted", () => {

    let connection: Connection;
    let repository: Repository<Id>;

    before(() => {
      let dbFileName: string = 'test.json';
      connection = ConnectionImpl.getConnectionPersisted("investigators_cave_test", dbFileName);
      repository = new RepositoryImpl<Id>(connection);
    })

    after(() => {
      let filePath = connection.getDbFileFilePath();
      unlink(filePath, () => { });
      rmdir(dirname(filePath), () => { });
    })

    it("ShouldInitSaveInHomeDirAndCleanup_WhenPersistedConnectionUsing", async () => {
      let beforeSave = await repository.findAll();

      let id1 = await repository.save(new Id());
      let id2 = await repository.save(new Id());
      let id3 = await repository.save(new Id());

      let afterSave = await repository.findAll();
      expect(beforeSave).to.have.length(0);
      expect(afterSave).to.have.length(3);
      expect(afterSave.map(item => { return item._id })).to.have.members([id1._id, id2._id, id3._id]);
    })
  })
})

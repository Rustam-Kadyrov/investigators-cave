import { v4 as uuidv4 } from 'uuid';

/**
 * class Id
 *
 * Parent class for all entities. It generates uuid for each entity despite that db is able to generate _id by itself.
 * This is to backup id for nested arrays which aren't entites and thus by default db doesn't generate id for them.
 * Ids for nested arrays are needed to manage them.
 *
 * author: Rustam Kadyrov, 2020
 * github: https://github.com/Rustam-Kadyrov
 *
 */
export class Id {
  constructor(
    public _id: string = uuidv4()
  ) { }
}

import { api, APIError } from "encore.dev/api";
import { v4 as uuidv4 } from "uuid";

import { SuccessResponse } from "../common";
import { set as db } from "../../db/tables";
import { Set } from '../../graphql/__generated__/resolvers-types';

export const getSets = api(
  { expose: true, auth: false, method: "GET", path: "/set"},
  async (): Promise<{ sets: Set[] }> => {
    const setAsyncIterator = await db.query<Set>`
      SELECT *
      FROM sets
    `;
    const sets: Set[] = [];
    for await (const set of setAsyncIterator) sets.push(set);
    return { sets };
  }
);

export const getSet = api(
  { expose: true, auth: false, method: "GET", path: "/set/:id"},
  async ( { id }: { id: string } ): Promise<Set> => {
    const set = await db.queryRow<Set>`
      SELECT *
      FROM sets
      WHERE id = ${id}
    `;
    if (!set) throw APIError.notFound("Set not found!");
    return set;
  }
);

export const postSet = api(
  { expose: true, auth: false, method: "POST", path: "/set"},
  async ( { name }: { name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      INSERT INTO sets
      VALUES (${uuidv4()}, ${name})
    `;
    return { success: true };
  }
);

export const putSet = api(
  { expose: true, auth: false, method: "PUT", path: "/set/:id"},
  async ( { id, name }: { id: string, name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      UPDATE sets
      SET name = ${name}
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

export const deleteSet = api(
  { expose: true, auth: false, method: "DELETE", path: "/set/:id"},
  async ( { id }: { id: string } ): Promise<SuccessResponse> => {
    await db.exec`
      DELETE
      FROM sets
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

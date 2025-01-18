import { api, APIError } from "encore.dev/api";
import { v4 as uuidv4 } from "uuid";

import { SuccessResponse } from "../common";
import { set as db, Element } from "../../db/tables";
import type { uuid } from "../../db/tables";

export const getElements = api(
  { expose: true, auth: false, method: "GET", path: "/element"},
  async (): Promise<{ elements: Element[] }> => {
    const elementAsyncIterator = await db.query<Element>`
      SELECT *
      FROM elements
    `;
    const elements: Element[] = [];
    for await (const element of elementAsyncIterator) elements.push(element);
    return { elements };
  }
);

export const getElement = api(
  { expose: true, auth: false, method: "GET", path: "/element/:id"},
  async ( { id }: { id: string } ): Promise<Element> => {
    const element = await db.queryRow<Element>`
      SELECT *
      FROM elements
      WHERE id = ${id}
    `;
    if (!element) throw APIError.notFound("Element not found!");
    return element;
  }
);

export const postElement = api(
  { expose: true, auth: false, method: "POST", path: "/element"},
  async ( { name, set_id }: { name: string, set_id: uuid } ): Promise<SuccessResponse> => {
    await db.exec`
      INSERT INTO elements
      VALUES (${uuidv4()}, ${name}, ${set_id})
    `;
    return { success: true };
  }
);

export const putElement = api(
  { expose: true, auth: false, method: "PUT", path: "/element/:id"},
  async ( { id, name }: { id: string, name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      UPDATE elements
      SET name = ${name}
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

export const deleteElement = api(
  { expose: true, auth: false, method: "DELETE", path: "/element/:id"},
  async ( { id }: { id: string } ): Promise<SuccessResponse> => {
    await db.exec`
      DELETE
      FROM elements
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

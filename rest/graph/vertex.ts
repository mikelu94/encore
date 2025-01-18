import { api, APIError } from "encore.dev/api";
import { v4 as uuidv4 } from "uuid";

import { SuccessResponse } from "../common";
import { graph as db, Vertex } from "../../db/tables";
import type { uuid } from "../../db/tables";

export const getVertices = api(
  { expose: true, auth: false, method: "GET", path: "/vertex"},
  async (): Promise<{ vertices: Vertex[] }> => {
    const vertexAsyncIterator = await db.query<Vertex>`
      SELECT *
      FROM vertices
    `;
    const vertices: Vertex[] = [];
    for await (const vertex of vertexAsyncIterator) vertices.push(vertex);
    return { vertices };
  }
);

export const getVertex = api(
  { expose: true, auth: false, method: "GET", path: "/vertex/:id"},
  async ( { id }: { id: string } ): Promise<Vertex> => {
    const vertex = await db.queryRow<Vertex>`
      SELECT *
      FROM vertices
      WHERE id = ${id}
    `;
    if (!vertex) throw APIError.notFound("Vertex not found!");
    return vertex;
  }
);

export const postVertex = api(
  { expose: true, auth: false, method: "POST", path: "/vertex"},
  async ( { name, graph_id }: { name: string, graph_id: uuid } ): Promise<SuccessResponse> => {
    await db.exec`
      INSERT INTO vertices
      VALUES (${uuidv4()}, ${name}, ${graph_id})
    `;
    return { success: true };
  }
);

export const putVertex = api(
  { expose: true, auth: false, method: "PUT", path: "/vertex/:id"},
  async ( { id, name }: { id: string, name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      UPDATE vertices
      SET name = ${name}
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

export const deleteVertex = api(
  { expose: true, auth: false, method: "DELETE", path: "/vertex/:id"},
  async ( { id }: { id: string } ): Promise<SuccessResponse> => {
    await db.exec`
      DELETE
      FROM vertices
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

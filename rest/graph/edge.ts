import { api, APIError } from "encore.dev/api";
import { v4 as uuidv4 } from "uuid";

import { SuccessResponse } from "../common";
import { graph as db } from "../../db/tables";
import { Edge } from '../../graphql/__generated__/resolvers-types';
import type { uuid } from "../../db/tables";

export const getEdges = api(
  { expose: true, auth: false, method: "GET", path: "/edge"},
  async (): Promise<{ edges: Edge[] }> => {
    const edgeAsyncIterator = await db.query<Edge>`
      SELECT *
      FROM edges
    `;
    const edges: Edge[] = [];
    for await (const edge of edgeAsyncIterator) edges.push(edge);
    return { edges };
  }
);

export const getEdge = api(
  { expose: true, auth: false, method: "GET", path: "/edge/:id"},
  async ( { id }: { id: string } ): Promise<Edge> => {
    const edge = await db.queryRow<Edge>`
      SELECT *
      FROM edges
      WHERE id = ${id}
    `;
    if (!edge) throw APIError.notFound("Edge not found!");
    return edge;
  }
);

export const postEdge = api(
  { expose: true, auth: false, method: "POST", path: "/edge"},
  async ( { source_vertex_id, destination_vertex_id }: { source_vertex_id: uuid, destination_vertex_id: uuid } ): Promise<SuccessResponse> => {
    await db.exec`
      INSERT INTO edges
      VALUES (${uuidv4()}, ${source_vertex_id}, ${destination_vertex_id})
    `;
    return { success: true };
  }
);

export const putEdge = api(
  { expose: true, auth: false, method: "PUT", path: "/edge/:id"},
  async ( { id, name }: { id: string, name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      UPDATE edges
      SET name = ${name}
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

export const deleteEdge = api(
  { expose: true, auth: false, method: "DELETE", path: "/edge/:id"},
  async ( { id }: { id: string } ): Promise<SuccessResponse> => {
    await db.exec`
      DELETE
      FROM edges
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

import { api, APIError } from "encore.dev/api";
import { v4 as uuidv4 } from "uuid";

import { SuccessResponse } from "../common";
import { graph as db } from "../../db/tables";
import { Graph } from '../../graphql/__generated__/resolvers-types';

export const getGraphs = api(
  { expose: true, auth: false, method: "GET", path: "/graph"},
  async (): Promise<{ graphs: Graph[] }> => {
    const graphAsyncIterator = await db.query<Graph>`
      SELECT *
      FROM graphs
    `;
    const graphs: Graph[] = [];
    for await (const graph of graphAsyncIterator) graphs.push(graph);
    return { graphs };
  }
);

export const getGraph = api(
  { expose: true, auth: false, method: "GET", path: "/graph/:id"},
  async ( { id }: { id: string } ): Promise<Graph> => {
    const graph = await db.queryRow<Graph>`
      SELECT *
      FROM graphs
      WHERE id = ${id}
    `;
    if (!graph) throw APIError.notFound("Graph not found!");
    return graph;
  }
);

export const postGraph = api(
  { expose: true, auth: false, method: "POST", path: "/graph"},
  async ( { name }: { name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      INSERT INTO graphs
      VALUES (${uuidv4()}, ${name})
    `;
    return { success: true };
  }
);

export const putGraph = api(
  { expose: true, auth: false, method: "PUT", path: "/graph/:id"},
  async ( { id, name }: { id: string, name: string } ): Promise<SuccessResponse> => {
    await db.exec`
      UPDATE graphs
      SET name = ${name}
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

export const deleteGraph = api(
  { expose: true, auth: false, method: "DELETE", path: "/graph/:id"},
  async ( { id }: { id: string } ): Promise<SuccessResponse> => {
    await db.exec`
      DELETE
      FROM graphs
      WHERE id = ${id}
    `;
    return { success: true };
  }
);

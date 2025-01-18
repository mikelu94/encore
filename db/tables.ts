import { SQLDatabase } from 'encore.dev/storage/sqldb';

export type uuid = string;

export interface Graph {
  id: uuid;
  name: string;
};

export interface Vertex {
  id: uuid;
  name: string;
  graph_id: uuid;
};

export interface Edge {
  id: uuid;
  source_vertex_id: uuid;
  destination_vertex_id: uuid;
}

export const graph = new SQLDatabase("graph", {
  migrations: "./graph",
});

export interface Set {
  id: uuid;
  name: string;
};

export interface Element {
  id: uuid;
  name: string;
  set_id: uuid;
}

export const set = new SQLDatabase("set", {
  migrations: "./set",
});

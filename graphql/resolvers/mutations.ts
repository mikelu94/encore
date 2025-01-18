import { v4 as uuidv4 } from "uuid";

import { MutationResolvers } from "../__generated__/resolvers-types";
import { graph as graphDb, set as setDb } from "../../db/tables";

const mutations: MutationResolvers = {
  addGraph: async ( _, { name, graph }) => {
    try {
      // input sanitization
      const providedInputs = [
        graph.default,
        graph.adjacency_list,
        graph.adjacency_matrix,
      ].filter(input => input != null);
      if (providedInputs.length !== 1) {
        throw new Error(
          "Please provide a single Graph representation. There are three options: " +
          "default (vertices, edges), adjacency list, or adjacency matrix."
        );
      }
      const graphId = uuidv4();
      const vertices = {};
      const edges = [];
      
      if (graph.default != null) {
        graph.default.vertices.forEach(vertexName => {
          vertices[vertexName] = uuidv4();
        });
        graph.default.edges.forEach(edge => {
          if (!(edge.source in vertices) || !(edge.destination in vertices)) {
            throw new Error("Edges contain unknown vertex or vertices.");
          }
          edges.push({ sourceId: vertices[edge.source], destinationId: vertices[edge.destination] });
        });
      }
      if (graph.adjacency_list != null) {
        graph.adjacency_list.vertices.forEach(adjacency => {
          vertices[adjacency.vertex] = uuidv4();
        });
        graph.adjacency_list.vertices.forEach(adjacency => {
          adjacency.vertices.forEach(destination => {
            if (!(destination in vertices)) {
              throw new Error("Edges contain unknown vertex or vertices.");
            }
            edges.push({ sourceId: vertices[adjacency.vertex], destinationId: vertices[destination] });
          });
        });
      }
      if (graph.adjacency_matrix != null) {
        graph.adjacency_matrix.vertices.forEach(column => {
          vertices[column.vertex] = uuidv4();
        });
        graph.adjacency_matrix.vertices.forEach(column => {
          column.vertices.forEach(row => {
            if (!(row.vertex in vertices)) {
              throw new Error("Edges contain unknown vertex or vertices.");
            }
            if (row.has_edge) edges.push({ sourceId: vertices[column.vertex], destinationId: vertices[row.vertex]} );
          });
        });
      }

      // throw new Error(JSON.stringify(vertices));
      await graphDb.exec`
        INSERT INTO graphs
        VALUES (${graphId}, ${name})
      `.then( () => {
        Object.entries(vertices).forEach(async ([vertexName, vertexId]) => {
          await graphDb.exec`
            INSERT INTO vertices
            VALUES (${vertexId}, ${vertexName}, ${graphId})
          `;
        });
      }).then( () => {
        edges.forEach(async ({ sourceId, destinationId }) => {
          await graphDb.exec`
            INSERT INTO edges
            VALUES (${uuidv4()}, ${sourceId}, ${destinationId})
          `;
        });
      });
      
    } catch (e) {
      return { success: false, message: e.message };
    }
    return { success: true };
  },
  addSet: async ( _, { name, elements } ) => {
    try {
      const setId = uuidv4();
      await setDb.exec`
        INSERT INTO sets
        VALUES (${setId}, ${name})
      `.then(() => {
        elements.forEach(async elementName => {
          await setDb.exec`
            INSERT INTO elements
            VALUES (${uuidv4()}, ${elementName}, ${setId})
          `
        });
      });
    } catch (e) {
      return { success: false, message: e.message };
    }
    return { success: true};
  },
};

export default mutations;

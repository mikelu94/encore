import { QueryResolvers, Graph, Set } from "../__generated__/resolvers-types";
import { graph as graphDb, set as setDb } from "../../db/tables";

const queries: QueryResolvers = {
  graphs: async () => {
    const selectAsyncIterator = await graphDb.query`
      SELECT
        graphs.id AS graph_id,
        graphs.name AS graph_name,
        source_vertices.id AS source_vertex_id,
        source_vertices.name AS source_vertex_name,
        destination_vertices.id AS destination_vertex_id,
        destination_vertices.name AS destination_vertex_name
      FROM graphs
      INNER JOIN vertices AS source_vertices
        ON graphs.id=source_vertices.graph_id
      INNER JOIN edges
        ON source_vertices.id=edges.source_vertex_id
      INNER JOIN vertices AS destination_vertices
        ON edges.destination_vertex_id=destination_vertices.id
    `;

    const graphs = {};
    const vertices = {};
    const edges = {};
    const adjacencyList = {};
    const hasEdge = {};
    for await (const row of selectAsyncIterator) {
      graphs[row.graph_id] = {
        id: row.graph_id,
        name: row.graph_name,
        vertices: [],
        edges: [],
        adjacency_list: [],
        adjacency_matrix: [],
      };
      vertices[row.source_vertex_id] = {
        id: row.source_vertex_id,
        name: row.source_vertex_name,
        graph_id: row.graph_id,
      };
      vertices[row.destination_vertex_id] = {
        id: row.destination_vertex_id,
        name: row.destination_vertex_name,
        graph_id: row.graph_id,
      };
      if (!(row.graph_id in edges)) edges[row.graph_id] = [];
      edges[row.graph_id].push({
        source_vertex_id: row.source_vertex_id,
        source_vertex_name: row.source_vertex_name,
        destination_vertex_id: row.destination_vertex_id,
        destination_vertex_name: row.destination_vertex_name,
      });
      if (!(row.source_vertex_id in adjacencyList)) {
        adjacencyList[row.source_vertex_id] = {
          source: {
            id: row.source_vertex_id,
            name: row.source_vertex_name,
            graph_id: row.graph_id,
          },
          destinations: [],
        }
      }
      adjacencyList[row.source_vertex_id].destinations.push({
        id: row.destination_vertex_id,
        name: row.destination_vertex_name,
        graph_id: row.graph_id,
      });
      if (!(row.source_vertex_id in hasEdge)) hasEdge[row.source_vertex_id] = {}
      hasEdge[row.source_vertex_id][row.destination_vertex_id] = true;
    }
    Object.values(vertices).forEach(vertex => {
      graphs[vertex.graph_id].vertices.push(vertex);
      if (vertex.id in adjacencyList) graphs[vertex.graph_id].adjacency_list.push(adjacencyList[vertex.id]);
    });
    Object.values(graphs).forEach(graph => {
      Object.values(graph.vertices).forEach(source => {
        graph.adjacency_matrix.push({
          vertex: source,
          vertices: Object.values(graph.vertices).map(destination => ({
            vertex: destination,
            has_edge: source.id in hasEdge && destination.id in hasEdge[source.id] && hasEdge[source.id][destination.id] === true,
          })),
        });
      })
    });
    Object.entries(edges).forEach(([graphId, edgeData]) => {
      graphs[graphId].edges = edgeData;
    });
    return Object.values(graphs);
  },
  graph: async (_, { id }) => {
    const selectAsyncIterator = await graphDb.query`
      SELECT
        graphs.id AS graph_id,
        graphs.name AS graph_name,
        source_vertices.id AS source_vertex_id,
        source_vertices.name AS source_vertex_name,
        destination_vertices.id AS destination_vertex_id,
        destination_vertices.name AS destination_vertex_name
      FROM graphs
      INNER JOIN vertices AS source_vertices
        ON graphs.id=source_vertices.graph_id
      INNER JOIN edges
        ON source_vertices.id=edges.source_vertex_id
      INNER JOIN vertices AS destination_vertices
        ON edges.destination_vertex_id=destination_vertices.id
      WHERE graphs.id = ${id}
    `;

    const graph: Graph = { id, vertices: [], adjacency_list: [], adjacency_matrix: [] };
    const vertices = {};
    const edges = [];
    const adjacencyList = {};
    const hasEdge = {};
    for await (const row of selectAsyncIterator) {
      graph.name = row.graph_name;
      vertices[row.source_vertex_id] = {
        id: row.source_vertex_id,
        name: row.source_vertex_name,
        graph_id: row.graph_id,
      };
      vertices[row.destination_vertex_id] = {
        id: row.destination_vertex_id,
        name: row.destination_vertex_name,
        graph_id: row.graph_id,
      };
      edges.push({
        source_vertex_id: row.source_vertex_id,
        source_vertex_name: row.source_vertex_name,
        destination_vertex_id: row.destination_vertex_id,
        destination_vertex_name: row.destination_vertex_name,
      });
      if (!(row.source_vertex_id in adjacencyList)) {
        adjacencyList[row.source_vertex_id] = {
          source: {
            id: row.source_vertex_id,
            name: row.source_vertex_name,
            graph_id: row.graph_id,
          },
          destinations: [],
        };
      }
      adjacencyList[row.source_vertex_id].destinations.push({
        id: row.destination_vertex_id,
        name: row.destination_vertex_name,
        graph_id: row.graph_id,
      });
      if (!(row.source_vertex_id in hasEdge)) hasEdge[row.source_vertex_id] = {}
      hasEdge[row.source_vertex_id][row.destination_vertex_id] = true;
    }
    Object.values(vertices).forEach(vertex => {
      graph.vertices.push(vertex);
      if (vertex.id in adjacencyList) graph.adjacency_list.push(adjacencyList[vertex.id]);
    });
    Object.values(graph.vertices).forEach(source => {
      graph.adjacency_matrix.push({
        vertex: source,
        vertices: Object.values(graph.vertices).map(destination => ({
          vertex: destination,
          has_edge: source.id in hasEdge && destination.id in hasEdge[source.id] && hasEdge[source.id][destination.id] === true,
        })),
      });
    });
    graph.edges = edges;
    return graph;
  },
  sets: async() => {
    const selectAsyncIterator = await setDb.query`
      SELECT
        sets.id AS set_id,
        sets.name AS set_name,
        elements.id AS element_id,
        elements.name AS element_name
      FROM sets
      INNER JOIN elements
        ON sets.id=elements.set_id
    `;
    const sets = {};
    for await (const row of selectAsyncIterator) {
      if (!(row.set_id in sets)) sets[row.set_id] = { id: row.set_id, name: row.set_name, elements: [] };
      sets[row.set_id].elements.push({ id: row.element_id, name: row.element_name, set_id: row.set_id });
    }
    return Object.values(sets);
  },
  set: async (_, { id }) => {
    const rowAsyncIterator = await setDb.query`
      SELECT
        sets.id AS set_id,
        sets.name AS set_name,
        elements.id AS element_id,
        elements.name AS element_name
      FROM sets 
      INNER JOIN elements on sets.id = elements.set_id
      WHERE sets.id = ${id}
    `;
    const set: Set = { id, elements: [] };
    for await (const row of rowAsyncIterator) {
      set.name = row.set_name;
      set.elements.push({
        id: row.element_id,
        name: row.element_name,
        set_id: row.set_id,
      });
    }
    return set;
  },
};

export default queries;

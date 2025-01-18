CREATE TABLE IF NOT EXISTS graphs (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vertices (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL,
    graph_id uuid NOT NULL REFERENCES graphs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS edges (
    id uuid PRIMARY KEY,
    source_vertex_id uuid NOT NULL REFERENCES vertices(id) ON DELETE CASCADE,
    destination_vertex_id uuid NOT NULL REFERENCES vertices(id) ON DELETE CASCADE,
    UNIQUE (source_vertex_id, destination_vertex_id)
);

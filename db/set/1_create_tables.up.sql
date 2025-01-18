CREATE TABLE IF NOT EXISTS sets (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS elements (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL,
    set_id uuid NOT NULL REFERENCES sets(id) ON DELETE CASCADE
);

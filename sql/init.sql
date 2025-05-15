-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert project data
INSERT INTO projects (id, name, description) VALUES
    (1, 'Project Alpha', 'A React project.'),
    (2, 'Project Beta', 'A Node.js project.'); 
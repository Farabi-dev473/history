

-- @block
SELECT * FROM courses;
-- @block
SELECT * FROM courses WHERE to_tsvector(title || ' ' || description) @@ to_tsquery('computer' || 'Science');

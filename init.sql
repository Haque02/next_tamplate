CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    age INTEGER 
)

INSERT INTO 
"public"."student" 
("id", "created_at", "name", "age") 
VALUES 
('1', '2025-07-22 05:59:57.885907+00', '张三', '18'), 
('2', '2025-07-22 06:00:20.063022+00', '李四', '17'), 
('3', '2025-07-22 06:00:48.164964+00', '王五', '16');



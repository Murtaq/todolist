-- Example data for our todo list
INSERT INTO todoitem(id, todotext, ischecked) VALUES (1, 'This is the first test item', TRUE);
INSERT INTO todoitem(id, todotext, ischecked) VALUES (2, 'This is the second item', FALSE);
INSERT INTO todoitem(id, todotext, ischecked) VALUES (3, 'This is the third one', FALSE);
ALTER SEQUENCE todoitem_seq RESTART WITH 4;
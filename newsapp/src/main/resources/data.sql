-- POSTS DATA
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (1, 'Post title 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (2, 'Post title 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (3, 'Post title 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (4, 'Post title 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (5, 'Post title 5', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (6, 'Post title 6', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (7, 'Post title 7', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '3');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (8, 'Post title 8', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '2');
INSERT IGNORE INTO posts (id, title, text, created_at, user_id) VALUES (9, 'Post title 9', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt eius mollitia officia soluta. Aliquam beatae commodi ea eveniet illo ipsam iure laborum nisi quo repudiandae tempora ut vel, voluptatum.', '2019-01-01', '1');

-- COMMENTS DATA
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci blanditiis commodi corporis dolor ducimus fugiat iusto laborum', '2019-01-01', '9', '2');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (2, 'Ab aspernatur dignissimos dolorem doloribus eos eveniet exercitationem, illum impedit laboriosam laudantium, maxime, molestiae nihil?', '2019-01-01', '9', '3');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (3, 'Accusamus alias aliquid atque commodi, cum cumque cupiditate dolor dolores error esse et eum, incidunt iste laudantium maiores', '2019-01-01', '9', '4');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (4, 'Asperiores beatae, doloribus earum eius esse excepturi harum impedit iste libero necessitatibus obcaecati officia provident quas', '2019-01-01', '9', '3');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (5, 'Accusamus adipisci asperiores at aut consequuntur cum cumque deleniti dignissimos dolore error expedita illum impedit iure laborum', '2019-01-01', '9', '4');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (6, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate debitis doloremque facere illo in iusto praesentium sint unde', '2019-01-01', '9', '3');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (7, 'Ab aspernatur dignissimos dolorem doloribus eos eveniet exercitationem, illum impedit laboriosam laudantium,maxime, molestiae nihil', '2019-01-01', '9', '2');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (8, 'Accusamus alias aliquid atque commodi, cum cumque cupiditate dolor dolores error esse et eum, incidunt iste laudantium maiores minus', '2019-01-01', '9', '4');
INSERT IGNORE INTO comments (id, text, created_at, post_id, user_id) VALUES (9, 'Asperiores beatae, doloribus earum eius esse excepturi harum impedit iste libero necessitatibus obcaecati officia provident quas', '2019-01-01', '9', '2');

-- IMAGES DATA
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '1.jpg', 138144, 'image/jpeg', '5411d177-6774-4863-b5bb-b01ab4f1d452', 1);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '2.jpg', 196163, 'image/jpeg', '0700d45b-7c5d-4936-a2fd-d621be0d040f', 2);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '3.jpg', 216368, 'image/jpeg', 'df7084ef-0e14-4b16-8734-02a82e347f36', 3);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '4.jpg', 215441, 'image/jpeg', 'd3d7a893-167d-42e8-b9c3-3a54aa2dfecb', 4);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '5.jpg', 224441, 'image/jpeg', 'f599a4d4-b073-466c-acc8-49867cb73c1e', 5);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '6.jpg', 177173, 'image/jpeg', '25368c47-ac59-40ee-9be5-7bd3d7d9d511', 6);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '7.jpg', 151902, 'image/jpeg', '4d903e2c-70bc-4a46-8752-870c51e00f98', 7);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '8.jpg', 171432, 'image/jpeg', '91dd2e5a-6474-449f-90f5-9fca4ce8e834', 8);
# INSERT IGNORE INTO images (created_at, file_name, file_size, file_type, file_uuid, file_owner_id) VALUES ('2019-01-01', '9.jpg', 249145, 'image/jpeg', 'e6482bf6-b0b1-4294-8692-87b8a8fd3d72', 9);

-- ROLES DATA
INSERT IGNORE INTO roles (id, name, created_at) VALUES (1, 'AVATAR_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (2, 'COMMENT_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (3, 'IMAGE_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (4, 'POST_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (5, 'ROLE_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (6, 'USER_MANAGEMENT', '2019-01-01');
INSERT IGNORE INTO roles (id, name, created_at) VALUES (7, 'VIDEO_MANAGEMENT', '2019-01-01');

-- ROLES_PERMISSIONS DATA
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('1', 'ROLE_AVATAR_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('1', 'ROLE_AVATAR_DELETE');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('2', 'ROLE_COMMENT_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('2', 'ROLE_COMMENT_DELETE');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('3', 'ROLE_IMAGE_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('3', 'ROLE_IMAGE_DELETE');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('4', 'ROLE_POST_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('4', 'ROLE_POST_DELETE');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('5', 'ROLE_ROLE_READ');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('5', 'ROLE_ROLE_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('5', 'ROLE_ROLE_DELETE');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('6', 'ROLE_USER_ROLE_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('6', 'ROLE_USER_PROFILE_READ');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('6', 'ROLE_USER_PROFILE_EDIT');

INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('7', 'ROLE_VIDEO_EDIT');
INSERT IGNORE INTO roles_permissions (role_id, permission) VALUES ('7', 'ROLE_VIDEO_DELETE');

-- USERS_ROLES DATA
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '1');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '2');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '3');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '4');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '5');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '6');
INSERT IGNORE INTO users_roles (user_id, role_id) VALUES ('1', '7');

-- USERS DATA
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (1, 'admin@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');

INSERT IGNORE INTO users (id, username, password, created_at) VALUES (2, 'user2@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (3, 'user3@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (4, 'user4@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (5, 'user5@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (6, 'user6@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (7, 'user7@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (8, 'user8@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');
INSERT IGNORE INTO users (id, username, password, created_at) VALUES (9, 'user9@email.com', '$2a$10$c3IISqrvOtYWXbOJkvVOnu7FFhMDn3501F3wCENK1IvTWDP3gxAUi', '2019-01-01');

-- USER_PROFILES DATA
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (1, 'Admin', 'Root', null, null, '2019-01-01');

INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (2, 'Julia', 'Vika', null, null, '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (3, 'Alisa', 'Kristina', '2019-07-13', null, '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (4, 'Kristina', 'Julia', '2019-07-15', '0', '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (5, 'Vika', 'Alisa', '2019-07-15', '1', '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (6, 'Nastya', 'Sveta', '2019-07-14', '0', '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (7, 'Margarita', 'Galina', '2019-07-14', '1', '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (8, 'Galina', 'Margarita', '2019-07-14', '1', '2019-01-01');
INSERT IGNORE INTO user_profiles (upr_id, upr_first, upr_last, upr_birth_date, sex, created_at) VALUES (9, 'Sveta', 'Nastya', null, '1', '2019-01-01');

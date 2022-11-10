CREATE DATABASE bookface;

CREATE TABLE users (
id BIGSERIAL NOT NULL PRIMARY KEY, 
first_name VARCHAR(50) NOT NULL, 
last_name VARCHAR(50) NOT NULL,
username VARCHAR(50) UNIQUE,
email VARCHAR(50) NOT NULL UNIQUE, 
password VARCHAR(200) NOT NULL,
profile_pic VARCHAR(200),
cover_pic VARCHAR(200),
city VARCHAR(50),
website VARCHAR(200),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
id BIGSERIAL NOT NULL PRIMARY KEY,
content VARCHAR(250) NOT NULL,
img VARCHAR(250) NOT NULL,
user_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
id BIGSERIAL NOT NULL PRIMARY KEY,
content VARCHAR(250) NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
user_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
post_id BIGSERIAL REFERENCES posts (id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE follows (
id BIGSERIAL NOT NULL PRIMARY KEY,
follower_user_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
followed_user_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
id BIGSERIAL NOT NULL PRIMARY KEY,
user_id BIGSERIAL REFERENCES users (id) ON DELETE CASCADE NOT NULL,
post_id BIGSERIAL REFERENCES posts (id) ON DELETE CASCADE NOT NULL
);
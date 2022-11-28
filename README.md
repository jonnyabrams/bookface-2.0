# Bookface 2.0

<img width="1440" alt="bookface-2 0" src="https://user-images.githubusercontent.com/97295867/204341063-ed131a61-c85d-4b7f-b060-0ac92aa185fd.png">

A Facebook clone using TypeScript and the PERN stack (PostgreSQL, Express, React, Node), with React Query/Context API for state management and Sass CSS.

Users can sign up, sign in, customise their profile, post with optional images, follow other users, like and comment on their posts, delete posts/comments and sign out again.

A user's profile displays only their own posts, while their home feed displays both their own posts and those of the users they follow. Posts are always displayed in order of the most recent.

This is a sequel to my previous [Bookface](https://github.com/jonnyabrams/bookface), which used the MERN stack (without TypeScript) and Redux for state management.

---

## Video Demo

https://user-images.githubusercontent.com/97295867/204340988-d38976ec-c332-4d76-819e-d591b75225da.mp4

---

## Technologies Used

* TypeScript
* React
* Node
* Express
* PostgreSQL
* TanStack/React Query
* Context API
* Sass CSS

---

## Instructions For Use

1. Clone this repo and go into the directory with `cd bookface-ts`
2. Install frontend and backend dependencies with `npm i` in both the client and server folders
3. Set up a psql database following the steps in database.sql in the server folder
4. Create a server-side .env file with environment variables for psql username and password
5. Run `npm run dev` from the server folder to run the client and server concurrently
6. Create your own Bookface account and go make some imaginary friends!

---

## For Own Reference

TypeScript/Node setup: https://khalilstemmler.com/blogs/typescript/node-starter-project/

---

[Jonny Abrams](https://github.com/jonnyabrams)

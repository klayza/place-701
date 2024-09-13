// // src/routes/api/subscribe/+server.js
// import { json } from '@sveltejs/kit';
// import { initDB, createTable } from '$lib/db';

// export async function POST({ request }) {
//   const { email } = await request.json();

//   if (!email || !email.includes('@')) {
//     return json({ error: 'Invalid email address' }, { status: 400 });
//   }

//   const db = await initDB();

//   // Ensure the table is created before inserting any data
//   createTable(db);

//   return new Promise((resolve, reject) => {
//     db.run('INSERT INTO subscribers (email) VALUES (?)', [email], function (err) {
//       if (err) {
//         console.error(err);
//         resolve(json({ error: 'Database error' }, { status: 500 }));
//       } else {
//         resolve(json({ message: 'Thank you for subscribing!' }));
//       }
//     });
//   });
// }

// // src/routes/admin/+page.server.js
// import { json, error } from '@sveltejs/kit';

// export const actions = {
//     default: async ({ request, locals }) => {
//         const formData = await request.formData();
//         const password = formData.get('password');
        
//         if (password !== process.env.ADMIN_PASSWORD) {
//             throw error(401, 'Unauthorized');
//         }
        
//         // Logic to send emails to all subscribers
//         const subscribers = await getSubscribers(); // Assuming a function that fetches all subscribers
//         const emailStatus = await sendEmails(subscribers); // Send emails using Cloudflare Workers

//         return json({ success: true, emailStatus });
//     }
// };

// async function getSubscribers() {
//     // Your logic to get subscribers from the database
//     return []; // return subscribers array
// }

// async function sendEmails(subscribers) {
//     // Your logic to trigger Cloudflare Workers
//     return 'Emails sent'; // return status or result
// }

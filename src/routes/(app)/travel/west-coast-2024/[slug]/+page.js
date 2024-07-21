
/** @type {import('./$types').PageLoad} */
export function load({ params }) {

    // tbh I am lazy. fuck validation

    return {id: params.slug}
}

import * as db from '$lib/server/database.js';
import { error, fail } from '@sveltejs/kit'

export function load({cookies}) {

    let id = cookies.get('userid');

    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, {path : '/'});
    }

    return {
        todos: db.getTodos(id)
    }
}
//receives POST method form, for the try and catch errors, you can view it in the .svelte file via the form props.
export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        try {
            db.createTodo(cookies.get('userid'), data.get('description'));    
        } catch(error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            });
        }
        
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        db.deleteTodo(cookies.get('userid'), data.get('todoid'));
    }

}
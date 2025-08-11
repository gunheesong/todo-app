<script>
    import { enhance } from "$app/forms";
    import { fly, slide } from 'svelte/transition'
    let { data, form } = $props();

    let creating = $state(false);
    /*let deleting = $state([]); <- Not gonna do it for the deleting form, but you can implement similarly to use:enhance on the delete form.*/
    
    

</script>

<div class="centered">
    <h1>Todos</h1>

    {#if creating === true}
        <p>saving...</p>
    {/if}
    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}
    <!--To add a create todo list, we add forms to the eqn-->
    <!--By using use:enhance, it doesnt reload the entire page on submit. Essentially updating page instead of reloading it-->
    <form method="POST" action="?/create" use:enhance={() => {
        creating = true;

        return async ({ update }) => {
            await update();
            creating = false;
        }

    }}>
            <input 
                type="text" 
                name="description"
                autocomplete="off"
                placeholder="add a todo"
                required
                disabled={creating}
                value={form?.description ?? ''}
            />
        <button>submit</button>
    </form>

    <ul class="todos">
        {#each data.todos as todo (todo.id)}
        <li in:fly={{ y: 20}} out:slide>
            <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="todoid" value={todo.id}>
                <span>{todo.description}</span>
                <button class="delete">delete</button>
            </form>
            
        </li>
            
        {/each}
    </ul>
    

</div>

<style>
    .centered {
        max-width: 20em;
        margin: 0 auto;
    }

    .error {
        color: red;
    }

    button {
        border: none;
        background-size: 1rem 1rem;
        cursor: pointer;
        opacity: 0.5;
    }
    ul {
        list-style: none;
    }

    ul.todos {
        padding: 0;
    }
    ul.todos li form {
        background: #fff;
        filter: drop-shadow(2px 3px 6px #0000001a);
        border-radius: 8px;
        align-items: center;
        gap: .5em;
        padding: .5em .5em .5em 1em;
        display: flex;
        transition: filter .2s, opacity .2s;
        justify-content: space-between;

    }
</style>
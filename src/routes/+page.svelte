<script>
    let { data, form } = $props();

</script>

<div class="centered">
    <h1>Todos</h1>

    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}
    <!--To add a create todo list, we add forms to the eqn-->
    <form method="POST" action="?/create">
            <input 
                type="text" 
                name="description"
                autocomplete="off"
                placeholder="add a todo"
                required
                value={form?.description ?? ''}
            />
        <button>submit</button>
    </form>

    <ul class="todos">
        {#each data.todos as todo (todo.id)}
        <li>
            <form method="POST" action="?/delete">
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
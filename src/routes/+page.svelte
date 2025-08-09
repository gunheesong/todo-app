<script>
    let { data } = $props();

</script>

<div class="centered">
    <h1>todos</h1>

    <!--To add a create todo list, we add forms to the eqn-->
    <form method="POST">
        <label>add a todo:
            <input 
                type="text" 
                name="description"
                autocomplete="off"
            />

        </label>
        <button>submit</button>
    </form>

    <ul class="todos">
        {#each data.todos as todo (todo.id)}

            <li>{todo.description}</li>
        {/each}
    </ul>

</div>

<style>
    .centered {
        max-width: 20em;
        margin: 0 auto;
    }
</style>
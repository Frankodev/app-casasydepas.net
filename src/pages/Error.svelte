<script>
    import { replace } from 'svelte-spa-router'

    const handleToHome = () => {
        replace('/')
    }
</script>


<div class="text-center mt-5">
    <h1 class="text-danger">404 Page Not Found</h1>
    <button class="btn btn-outline-warning" on:click={handleToHome}>Regresar</button>
</div>

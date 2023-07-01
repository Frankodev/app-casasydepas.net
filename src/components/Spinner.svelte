<script>
    
</script>

<div class="container__spinner">
    <div class="spinner" ></div>
</div>

<style>
.container__spinner {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
gap: 2rem;
justify-content: center;
align-items: center;
margin: auto;
}

.spinner {
height: 2.6rem;
width: 2.6rem;
border: 4px solid #d1d5db;
border-top-color: #3b82f6;
border-radius: 50%;
animation: spinner 800ms linear infinite running;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

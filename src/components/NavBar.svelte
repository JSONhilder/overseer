<script>
    import MenuModal from "./modals/MenuModal.svelte";

    export let header = "What's on the agenda?";
</script>

<section id="navbar">
    
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <h3>{header}</h3>
            </div>
            <div class="col-12 nav-user-actions">
                <p data-toggle="modal" data-target="#staticBackdrop">menu</p>
            </div>
        </div>
    </div>
    
    <MenuModal />
</section>
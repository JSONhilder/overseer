<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Loader from "../components/Loader.svelte";
    import NavBar from "../components/NavBar.svelte";
    export let id;

    // Dummy data
    let fetchedProject = {
        "id": id,
        "name": "project-1",
        "desc": "Some quick example text to build on the card title and make up the bulk of the card's content."
    };

    let loading = true;
    let project;

    onMount(() => {
        // Remove this an make async call to api
        setTimeout(() => {
            project = fetchedProject;
            loading = false;
        }, 1000)
    })

</script>

{#if loading}
    <Loader />
{:else}
    <NavBar header={project.name}/>

    <section id="project-detail" transition:fade >
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <h3>Tasks Todo</h3>
                </div>
                <div class="col-12">
                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action">
                          Cras justo odio
                          <span style="float:right;">timer</span>
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">
                            Dapibus ac facilisis in
                            <span style="float:right;">timer</span>
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">
                            Morbi leo risus
                            <span style="float:right;">timer</span>
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">
                            Porta ac consectetur ac
                            <span style="float:right;">timer</span>
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">
                            Vestibulum at eros
                            <span style="float:right;">timer</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 text-center">
                    <h3>Tasks Completed</h3>
                </div>
            </div>
        </div>
        <!-- Bottom row for adding new projects -->
        <div class="row control-bar">
            <div class="col-12">
                <button class="btn-success btn-circle btn-xl">+</button>
            </div>
        </div>
    </section>
{/if}
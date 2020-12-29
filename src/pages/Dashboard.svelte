<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Loader from "../components/Loader.svelte";
    import NavBar from "../components/NavBar.svelte";
    
    // Model some dummy data for testing
    let dummyData = {
        projects: [
            {   
                "id": 1,
                "name": "project-1",
                "desc": "Some quick example text to build on the card title and make up the bulk of the card's content."
            },
            {
                "id": 2,
                "name": "project-2",
                "desc": "Some quick example text to build on the card title and make up the bulk of the card's content."
            },
            {
                "id": 3,
                "name": "project-3",
                "desc": "Some quick example text to build on the card title and make up the bulk of the card's content."
            },
        ]
    }

    let loading = true;
    let userData = [];

    onMount(() => {
        // Remove this an make async call to api
        setTimeout(() => {
            userData = dummyData.projects;
            loading = false;
        }, 1000)
    });

</script>

{#if loading}
        <Loader />
{:else}
    <NavBar />
    <section id="dashboard-page" transition:fade>
        <div class="container-fluid">
            <!-- project listings -->
            <div class="row project-list">
                <!-- @todo map over data and render clickable cards -->
                {#each userData as project}
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-12 project-item">
                        <a href="/project/{project.id}">
                            <div class="card border-info mb-3">
                                <div class="card-header">
                                    {project.name}
                                    <span style="float:right;">X</span>
                                </div>
                                <div class="card-body text-info">
                                    <h5 class="card-title">Info card {project.name}</h5>
                                    <p class="card-text">{project.desc}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
        <!-- Bottom row for adding new projects -->
        <div class="row control-bar">
            <div class="col-12">
                <button class="btn-danger btn-circle btn-xl">+</button>
            </div>
        </div>
    </section>
{/if}

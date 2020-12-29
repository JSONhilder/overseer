<script>
    // Props
    export let id;
    
    // Imports
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Icon from "svelte-awesome";
    import { play, plus } from "svelte-awesome/icons";
    import Loader from "../components/Loader.svelte";
    import NavBar from "../components/NavBar.svelte";
    import ProjectModal from "../components/modals/ProjectModal.svelte";
    // Dummy data
    let fetchedProject = {
        "id": id,
        "name": "project-1",
        "desc": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "tasks": [
            {
                "title": "buy milk",
                "desc": "testing",
                "completed": false
            },
            {
                "title": "buy bread",
                "desc": "testing",
                "completed": false
            },
        ]
    };

    // Component specific variables
    let project;
    let loading         = true;
    let editing         = false;
    let tasks           = [];
    let completedTasks  = [];

    // Component functions
    function startTimer(e) {
        e.stopPropagation();
        console.log("Start timer!")
    };

    function editTask() {
        editing = true;
    };

    onMount(() => {
        // Remove this an make async call to api
        setTimeout(() => {
            project = fetchedProject;
            tasks = fetchedProject.tasks;
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
                        {#each tasks as task}
                        <li class="list-group-item" data-toggle="modal" data-target="#projectModal" on:click="{editTask}">
                            {task.title}
                            <span class="timer-icon" on:click="{startTimer}" >
                                <Icon data={play} style="color:green;" scale="1.5"/>
                            </span>
                        </li>
                        {/each}
                    </div>
                </div>
               
            </div>
        </div>

        <!-- Bottom row for adding new projects -->
        <div class="row control-bar">
            <div class="col-12">
                <button class="btn-success btn-circle btn-xl" data-toggle="modal" data-target="#projectModal">
                    <Icon data={plus} />
                </button>
            </div>
        </div>

        <ProjectModal isEditing={editing}/>
    </section>
{/if}
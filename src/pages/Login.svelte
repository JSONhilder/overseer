<script>
    // Import the signIn and Signup components
    import SignIn from "../components/SignIn.svelte";
    import SignUp from "../components/SignUp.svelte";

    // states for if signIn or SignUp
    let userSignIn = false;

    // Function to switch component
    function toggleForm() {
        userSignIn = !userSignIn
    }
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                {#if userSignIn}
                    <SignIn/>
                    <br/>
                    <p><i>Don't have an account? <span on:click={toggleForm}>Create one here</span></i></p>
                {:else}
                    <SignUp/>
                    <br/>
                    <p><i>Already have an account? <span on:click={toggleForm}>Sign in here</span></i></p>
                {/if}
            </div>
        </div>
    </div>
</main>
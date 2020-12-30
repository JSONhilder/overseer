<script>
    import { authLib } from "../services/auth";
    import Icon from "svelte-awesome";
    import { google, github } from "svelte-awesome/icons";

    const { loginWithEmailPassword, loginWithGoogle } = authLib();

    let formDetails = {
        "email": "",
        "password": ""
    };

    async function handleLogin(e) {
        e.preventDefault()
        loginWithEmailPassword(formDetails.email, formDetails.password)
    };

</script>

<main>
    <div class="container">
        <div class="row justify-content-center">
            <div class="mt-5 col-7 text-center">
                <div class="card">
                    <div id="formContent">
                        <h3 class="mt-4"> Overseer </h3>
                        <div class="card-body">
                            <!-- Login Form -->
                            <form>
                                <div class="form-group">
                                    <input type="text" id="email" name="email" placeholder="email" bind:value="{formDetails.email}">
                                </div>

                                <div class="form-group">
                                    <input type="password" id="password" name="login" placeholder="password" bind:value="{formDetails.password}">
                                </div>

                                <button class="btn btn-info">
                                    Register
                                </button>
                                <button class="btn btn-info" on:click="{handleLogin}">
                                    Log In
                                </button>
                            </form>
                            <div class="alternates">
                                <p> Or Login/Register with: </p>
                                <span on:click="{loginWithGoogle}">
                                    <Icon data={google} scale="2"/>
                                </span>
                                <span>
                                    <Icon data={github} scale="2" />
                                </span>
                            </div>

                            <div id="formFooter">
                                <span>Forgot Password?</span>
                            </div>
                        </div>
                    </div>
                  </div>
            </div>
        </div>
    </div>
</main>
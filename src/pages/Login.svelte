<script>
    import { authLib } from "../services/auth";
    import Icon from "svelte-awesome";
    import { google, github} from "svelte-awesome/icons";

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
                            <br>
                            <p> Or Login/Register with: </p>
                            <span on:click="{loginWithGoogle}" style="cursor:pointer">
                                <Icon data={google} scale="2"/>
                            </span>
                            <span style="cursor:pointer">
                                <Icon data={github} scale="2" />
                            </span>
                            <!-- Remind Passowrd
                            <div id="formFooter">
                                <a class="underlineHover" href="#">Forgot Password?</a>
                            </div> -->
                        </div>
                    </div>
                  </div>
            </div>
        </div>
    </div>
</main>

<style>
    #formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
 
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

</style>
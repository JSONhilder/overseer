<script>
	import { Router, Route, navigate} from "svelte-routing";
	import Login from "./pages/Login.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import Project from "./pages/Project.svelte";
	import Loader from "./components/Loader.svelte";
	import { authLib } from "./services/auth";

	// This is needed to avoid ignoring the Router
	export let url = "";

	/**
	 * Had to make a work around authlib sets user as object or false
	 * Otherwise it is nul so in template we can check for null explictly
	 * And load to avoid the brief view of login page... 
	 * What implications does this have...
	 */
	const { user } = authLib();
	
</script>

{#if $user === null}
 	<Loader />
{:else}
	<Router url="{url}">
		<div class="i-am-in-app-file">
			{#if !$user} 
				<Route path="*" component="{Login}"/>
			{:else}
				<Route path="/" component="{Dashboard}"/>
				<Route path="login" component="{Login}"/>
				<Route path="project/:id" let:params >
					<Project id="{params.id}"/>
				</Route>	
			{/if}
		</div>
	</Router>
{/if}


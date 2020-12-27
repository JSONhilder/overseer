<script>
	import { Router, Route } from "svelte-routing";

	import Login from "./pages/Login.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import Project from "./pages/Project.svelte";

	// This is needed to avoid ignoring the Router
	export let url = "";
</script>

<Router url="{url}">
	<div class="i-am-in-app-file">
		<Route path="/" component="{Login}"/>
		<Route path="home" component="{Dashboard}"/>
		<Route path="project/:id" let:params >
			<Project id="{params.id}"/>
		</Route>	
	</div>
</Router>
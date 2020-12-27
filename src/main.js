import "bootstrap";
import "./scss/main.scss";
import App from './App.svelte';

const app = new App({
	target: document.body,
	hydratable: true
});

export default app;
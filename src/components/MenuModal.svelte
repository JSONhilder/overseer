<!-- 
    Menu Modal Component
    @NOTE: Only to be used within the NavBar component
-->
<script>
    import { Link } from "svelte-routing";
</script>

<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         	<nav>
                <Link to="/"> 
                    <span data-dismiss="modal">Login</span>
                </Link>
                <Link to="/home">
                    <span data-dismiss="modal">Dashboard</span>
                 </Link>
                <Link to="/project">
                    <span data-dismiss="modal">Projects</span>
                </Link>
	        </nav>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
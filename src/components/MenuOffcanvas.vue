<template>
  <div
    id="menu-offcanvas"
    aria-labelledby="menu-offcanvas-label"
    class="offcanvas offcanvas-end"
    data-bs-backdrop="false"
    tabindex="-1"
  >
    <div class="offcanvas-header">
      <h5 id="menu-offcanvas-label" class="offcanvas-title">Menu</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Explore</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </div>
  </div>
</template>

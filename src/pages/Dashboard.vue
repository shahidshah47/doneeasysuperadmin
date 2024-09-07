<template>
  <div>
    <!-- Cards Section -->
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex justify-content-between">
            <div>
              <h5 class="card-title">Total Sales</h5>
              <p class="card-text display-6">1,234</p>
              <p class="text-success fw-bold">50%</p>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 text-muted">
            Lifetime
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex justify-content-between">
            <div>
              <h5 class="card-title">Total Sales</h5>
              <p class="card-text display-6">1,234</p>
              <p class="text-success fw-bold">50%</p>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 text-muted">
            Lifetime
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex justify-content-between">
            <div>
              <h5 class="card-title">Total Sales</h5>
              <p class="card-text display-6">1,234</p>
              <p class="text-success fw-bold">50%</p>
            </div>
          </div>
          <div class="card-footer bg-transparent border-0 text-muted">
            Lifetime
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card mt-5 shadow-sm border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4 gap-4">
          <!-- Filter Buttons -->
          <div class="d-flex justify-content-center gap-1">
            <button class="btn btn-primary me-2">All</button>
            <button class="btn btn-light me-2">Approved</button>
            <button class="btn btn-light">Pending</button>
          </div>
          <!-- Search and Filter Inputs -->
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search...">
            <button class="btn btn-outline-secondary" type="button">Filter</button>
            <button class="btn btn-outline-secondary" type="button">Columns</button>
          </div>
        </div>

        <!-- Responsive Table -->
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col"><input type="checkbox" /></th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Role</th>
                <th scope="col">Usage</th>
                <th scope="col">Limit</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>1</td>
                <td>John Doe</td>
                <td>Approved</td>
                <td>01/01/2022</td>
                <td>Admin</td>
                <td>80%</td>
                <td>100GB</td>
                <td><a href="#" class="text-primary">Edit</a></td>
              </tr>
              <!-- Additional rows go here -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 2rem;
  font-weight: 600;
}

.display-6 {
  font-size: 1.5rem;
}

.table-responsive {
  overflow-x: auto;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>

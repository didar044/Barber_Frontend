<template>
    <div class="animated-container">
        <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
        <router-link to="/addservice"><i class="bi bi-plus-circle"></i> Add Service</router-link>
    </div>
 

  <div class="table-container">
    <h2>Service List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id">
          <td>{{ service.id }}</td>
          <td>{{ service.name }}</td>
          <td>{{ service.category?.name || 'N/A' }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.price }}</td>
          <td>{{ service.duration_minutes }} min</td>
          <td>
            <!-- <select v-model="service.status" disabled>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> -->

            <select
                disabled
                v-model="service.status"
                :style="{
                    color: 'white',
                    backgroundColor: service.status === 'active' ? 'green' : 'red'
                }"
                >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
          </td>
          <td>
            <router-link :to="`/editservice/${service.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>

            <button class="action-button delete-button" @click="deleteService(service.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="services.length === 0">
          <td colspan="8">No services found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ServiceList",
  data() {
    return {
      services: [],
    };
  },
  methods: {
    async fetchServices() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/services");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        this.services = data.data;
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    },

    async deleteService(id) {
      if (!confirm("Are you sure you want to delete this service?")) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
          },
        });
        if (!res.ok) throw new Error("Delete failed");

        this.services = this.services.filter(s => s.id !== id);
        alert("Service deleted successfully.");
      } catch (error) {
        console.error("Failed to delete service:", error);
        alert("Failed to delete.");
      }
    }
  },
  mounted() {
    this.fetchServices();
  },
};
</script>

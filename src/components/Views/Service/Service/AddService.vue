<template>

    <div class="animated-container">
        <router-link to="/servicelist"><i class="bi bi-arrow-left"></i> Back To Service List</router-link>
        <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  
    </div>
 
  <div class="barber-form-container">
    <h2 class="barber-title">Add New Service</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Name <span class="barber-required">*</span></label>
          <input v-model="form.name" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Category <span class="barber-required">*</span></label>
          <select v-model.number="form.service_category_id" required>
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Price <span class="barber-required">*</span></label>
          <input v-model.number="form.price" type="number" step="0.01" min="0" required />
        </div>

        <div class="barber-form-group">
          <label>Duration (minutes) <span class="barber-required">*</span></label>
          <input v-model.number="form.duration_minutes" type="number" min="1" required />
        </div>

        

        <div class="barber-form-group">
          <label>Status</label>
          <select v-model="form.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div class="barber-form-group">
          <label>Description</label>
          <textarea v-model="form.description"></textarea>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">Save Service</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddService",
  data() {
    return {
      categories: [],
      form: {
        name: "",
        service_category_id: "",
        price: 0,
        duration_minutes: 1,
        description: "",
        status: "active",
      },
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/servicecategories");
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    },
    async submitForm() {
      try {
        const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Validation error:", errorData);
          alert("Failed to save service. Check inputs.");
          return;
        }

        alert("Service created successfully.");
        this.$router.push("/servicelist"); // adjust as needed
      } catch (error) {
        console.error("Server error:", error);
        alert("Server error while saving.");
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

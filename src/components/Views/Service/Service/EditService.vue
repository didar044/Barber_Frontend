<template>
  <div class="barber-form-container">
    <h2 class="barber-title">Edit/Update Service</h2>

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

      <button type="submit" class="barber-submit-btn">Update Service</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditService",
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
        const response = await fetch("http://127.0.0.1:8000/api/servicecategories");
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    },

    async fetchService() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`);
        const data = await response.json();
        this.form = {
          name: data.name,
          service_category_id: data.service_category_id,
          price: parseFloat(data.price),
          duration_minutes: data.duration_minutes,
          description: data.description || "",
          status: data.status,
        };
      } catch (error) {
        console.error("Failed to load service", error);
        alert("Could not load service data.");
      }
    },

    async submitForm() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Validation error:", errorData);
          alert("Failed to update service. Check inputs.");
          return;
        }

        alert("Service updated successfully.");
        this.$router.push("/servicelist");
      } catch (error) {
        console.error("Server error:", error);
        alert("Failed to update service.");
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchService();
  },
};
</script>

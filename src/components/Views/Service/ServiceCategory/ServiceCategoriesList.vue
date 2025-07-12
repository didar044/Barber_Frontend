<template>
   

<div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addservicecategory"><i class="bi bi-plus-circle"></i> Add Category</router-link>
</div>
  <div class="table-container">
    <h2>Service Categories</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <router-link :to="`/editservicecategory/${category.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>

            <button
              class="action-button delete-button"
              @click="deleteCategory(category.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="categories.length === 0">
          <td colspan="4">No categories found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ServiceCategoriesList",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/servicecategories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async deleteCategory(id) {
      if (!confirm("Are you sure you want to delete this category?")) return;

      try {
        const response = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/servicecategories/${id}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete category");

        // Remove the deleted category from the local list
        this.categories = this.categories.filter(cat => cat.id !== id);
        alert("Category deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete category. Because it is linked to existing services.");
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>


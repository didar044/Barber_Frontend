<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addexpansecategorie" class="ms-3">
      <i class="bi bi-plus-circle"></i> Add Category
    </router-link>
  </div>

  <div class="table-container">
    <h2>Expense Categories</h2>

    <table class="table">
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
          <td>{{ category.description || '—' }}</td>
          <td>
            <router-link :to="`/editexpansecategorie/${category.id}`">
              <button class="action-button edit-button me-2">
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
          <td colspan="4" class="text-center text-muted py-2">No categories found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ExpenseCategoriesList",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/expensecategories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        this.categories = data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Try again.");
      }
    },

    async deleteCategory(id) {
      if (!confirm("Are you sure you want to delete this category?")) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/expensecategories/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete category");

        this.categories = this.categories.filter(cat => cat.id !== id);
        alert("Category deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete category. It might be linked to existing data.");
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

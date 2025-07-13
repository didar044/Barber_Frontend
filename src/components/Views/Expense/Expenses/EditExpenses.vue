<template>
  <div class="animated-container">
    <router-link to="/expanselists"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="barber-form-container">
    <h2 class="barber-title">{{ isEditMode ? 'Edit Expense' : 'Add Expense' }}</h2>

    <form @submit.prevent="submitForm" class="barber-form" enctype="multipart/form-data">
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Category <span class="barber-required">*</span></label>
          <select v-model="form.expense_category_id" required>
            <option disabled value="">-- Select Category --</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Reference No <span class="barber-required">*</span></label>
          <input v-model="form.reference_number" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Expense For <span class="barber-required">*</span></label>
          <input v-model="form.expense_for" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Amount <span class="barber-required">*</span></label>
          <input v-model="form.amount" type="number" step="0.01" required />
        </div>

        <div class="barber-form-group">
          <label>Date <span class="barber-required">*</span></label>
          <input v-model="form.expense_date" type="date" required />
        </div>

        <div class="barber-form-group">
          <label>Description</label>
          <textarea v-model="form.description" rows="3"></textarea>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">
        {{ isEditMode ? 'Update Expense' : 'Save Expense' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddOrEditExpense",
  data() {
    return {
      form: {
        expense_category_id: "",
        reference_number: "",
        expense_for: "",
        amount: "",
        expense_date: "",
        description: "",
      },
      categories: [],
      isEditMode: false,
      expenseId: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expensecategories");
        const data = await res.json();
        this.categories = data.data || data;
      } catch (err) {
        console.error("Failed to load categories:", err);
        alert("Could not load expense categories.");
      }
    },

    async fetchExpense() {
      try {
        const res = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses/${this.expenseId}`);
        if (!res.ok) throw new Error("Failed to load expense");
        const data = await res.json();
        this.form = {
          expense_category_id: data.expense_category_id,
          reference_number: data.reference_number,
          expense_for: data.expense_for,
          amount: data.amount,
          expense_date: data.expense_date,
          description: data.description,
        };
      } catch (err) {
        console.error("Failed to fetch expense:", err);
        alert("Failed to load expense for editing.");
      }
    },

    async submitForm() {
      try {
        const url = this.isEditMode
          ? `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses/${this.expenseId}`
          : "http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses";

        const method = this.isEditMode ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        const result = await res.json();

        if (!res.ok) {
          console.error("Validation error:", result);
          alert("Failed to save expense. Check your input.");
          return;
        }

        alert(this.isEditMode ? "Expense updated successfully!" : "Expense saved successfully!");
        this.$router.push("/expanselists");
      } catch (err) {
        console.error("Error saving expense:", err);
        alert("Server error occurred.");
      }
    },
  },
  mounted() {
    this.fetchCategories();

    // Check if route param id exists for edit mode
    this.expenseId = this.$route.params.id;
    if (this.expenseId) {
      this.isEditMode = true;
      this.fetchExpense();
    }
  },
};
</script>

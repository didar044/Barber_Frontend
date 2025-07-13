<template>
  <div>
    <div class="animated-container mb-3">
      <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
      <router-link to="/addexpanses" class="ms-3">
        <i class="bi bi-plus-circle"></i> Add Expense
      </router-link>
    </div>

    <div class="table-container">
      <h2>Expense List</h2>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Reference</th>
            <th>Expense For</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="text-center text-muted py-3">Loading...</td>
          </tr>

          <tr v-else-if="expenses.length === 0">
            <td colspan="8" class="text-center text-muted py-3">No expenses found.</td>
          </tr>

          <tr v-else v-for="expense in expenses" :key="expense.id">
            <td>{{ expense.id }}</td>
            <td>{{ expense.expensecategorie?.name || '—' }}</td>
            <td>{{ expense.reference_number }}</td>
            <td>{{ expense.expense_for }}</td>
            <td>{{ parseFloat(expense.amount).toFixed(2) }}</td>
            <td>{{ expense.expense_date }}</td>
            <td>{{ expense.description || '—' }}</td>
            <td>
              <router-link :to="`/editexpanses/${expense.id}`">
                <button class="action-button edit-button me-2">
                  <i class="bi bi-pencil"></i>
                </button>
              </router-link>
              <button class="action-button delete-button" @click="deleteExpense(expense.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenseList",
  data() {
    return {
      expenses: [],
      loading: false,
    };
  },
  methods: {
    async fetchExpenses() {
      this.loading = true;
      try {
        const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses");
        if (!response.ok) throw new Error("Failed to fetch expenses");
        const data = await response.json();
        this.expenses = data.data || data;
      } catch (error) {
        console.error("Error fetching expenses:", error);
        alert("Failed to load expenses. Try again.");
      } finally {
        this.loading = false;
      }
    },

    async deleteExpense(id) {
      if (!confirm("Are you sure you want to delete this expense?")) return;

      try {
        const response = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses/${id}`, {
          method: "DELETE",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete expense");

        this.expenses = this.expenses.filter(e => e.id !== id);
        alert("Expense deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete. It might be linked to other records.");
      }
    },
  },
  mounted() {
    this.fetchExpenses();
  },
};
</script>

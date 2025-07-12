<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addcustomer"><i class="bi bi-plus-circle"></i> Add Haircut Crew</router-link>
  </div>

  <div class="table-container">
    <h2>Customer List</h2>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>ID</th>
          <th>Photo</th>
          <th>Mobile nu.</th>
          <th>Email</th>
          <th>Total visits</th>
          <th>Last Visite</th>
          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers.data" :key="customer.id">
          <td>{{ index + 1 + (customers.current_page - 1) * customers.per_page }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.id }}</td>
          <td>
            <img
              v-if="customer.photo"
              :src="`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${customer.photo}`"
              alt="customer Photo"
              width="60"
              height="60"
              style="object-fit: cover; border-radius: 6px;"
            />
          </td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.total_visits }}</td>
          <td>{{ customer.last_visit }}</td>
          
          <td>
            <router-link :to="`/showcustomer/${customer.id}`">
            <button class="action-button view-button">
              <i class="bi bi-eye"></i>
            </button>
            </router-link>
            <router-link :to="`/editcustomer/${customer.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>
            <button class="action-button delete-button" @click="deletecustomer(customer.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !customers.prev_page_url }">
        <button class="page-link" @click="fetchcustomers(customers.current_page - 1)">Previous</button>
      </li>

      <li
        class="page-item"
        v-for="page in customers.last_page"
        :key="page"
        :class="{ active: page === customers.current_page }"
      >
        <button class="page-link" @click="fetchcustomers(page)">
          {{ page }}
        </button>
      </li>

      <li class="page-item" :class="{ disabled: !customers.next_page_url }">
        <button class="page-link" @click="fetchcustomers(customers.current_page + 1)">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      customers: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 5,
      },
    };
  },
  mounted() {
    this.fetchcustomers(1);
  },
  methods: {
    fetchcustomers(page = 1) {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          this.customers = data;
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    },

    deletecustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete customer.");
          return res.json();
        })
        .then(() => {
          this.fetchcustomers(this.customers.current_page); // refresh the table
        })
        .catch((error) => {
          console.error("Delete error:", error);
          alert("Something went wrong while deleting.");
        });
    }
  }
  },
};
</script>

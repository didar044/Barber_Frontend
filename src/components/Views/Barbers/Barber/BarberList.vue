<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addbarbers"><i class="bi bi-plus-circle"></i> Add Haircut Crew</router-link>
  </div>

  <div class="table-container">
    <h2>Haircut Crew List</h2>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>ID</th>
          <th>Photo</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Specialization</th>
          <th>Experience (Years)</th>
          <th>Shift</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(barber, index) in barbers.data" :key="barber.id">
          <td>{{ index + 1 + (barbers.current_page - 1) * barbers.per_page }}</td>
          <td>{{ barber.name }}</td>
          <td>{{ barber.id }}</td>
          <td>
            <img
              v-if="barber.photo"
              :src="`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${barber.photo}`"
              alt="Barber Photo"
              width="60"
              height="60"
              style="object-fit: cover; border-radius: 6px;"
            />
          </td>
          <td>{{ barber.mobile_number }}</td>
          <td>{{ barber.email }}</td>
          <td>{{ barber.specialization }}</td>
          <td>{{ barber.exprence_years }}</td>
          <td>{{ barber.shift?.name || 'N/A' }}</td>
          <td>
            <router-link :to="`/showbarbers/${barber.id}`">
            <button class="action-button view-button">
              <i class="bi bi-eye"></i>
            </button>
            </router-link>
            <router-link :to="`/editbarbers/${barber.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>
            <button class="action-button delete-button" @click="deleteBarber(barber.id)">
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
      <li class="page-item" :class="{ disabled: !barbers.prev_page_url }">
        <button class="page-link" @click="fetchBarbers(barbers.current_page - 1)">Previous</button>
      </li>

      <li
        class="page-item"
        v-for="page in barbers.last_page"
        :key="page"
        :class="{ active: page === barbers.current_page }"
      >
        <button class="page-link" @click="fetchBarbers(page)">
          {{ page }}
        </button>
      </li>

      <li class="page-item" :class="{ disabled: !barbers.next_page_url }">
        <button class="page-link" @click="fetchBarbers(barbers.current_page + 1)">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      barbers: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 5,
      },
    };
  },
  mounted() {
    this.fetchBarbers(1);
  },
  methods: {
    fetchBarbers(page = 1) {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          this.barbers = data;
        })
        .catch((error) => {
          console.error("Error fetching barbers:", error);
        });
    },

    deleteBarber(id) {
      if (confirm("Are you sure you want to delete this barber?")) {
        fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete barber.");
            return res.json();
          })
          .then(() => {
            this.fetchBarbers(this.barbers.current_page);
          })
          .catch((error) => {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
          });
      }
    },
  },
};
</script>

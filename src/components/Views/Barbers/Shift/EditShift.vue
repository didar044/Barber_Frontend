<template>
  <div class="animated-container">
   <router-link to="/shiftslist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="container mt-4">
    <h2 class="mb-3">Shift Edit</h2>
    <form @submit.prevent="updateShift" class="mb-4">
      <div class="input-group">
        <input
          v-model="newShift"
          type="text"
          class="form-control"
          placeholder="Enter shift name"
          required
        />
        <button type="submit" class="btn btn-success" style="margin-left: 10px;"> 
          <i class="bi bi-check-circle"></i> Update
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const newShift = ref("");
    const id = route.params.id;

    onMounted(() => {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          newShift.value = data.name;
        });
    });

    const updateShift = () => {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newShift.value }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Shift updated successfully!");
          router.push("/shiftslist");
        });
    };

    return {
      newShift,
      updateShift,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

<template>
  <div class="animated-container">
    <router-link to="/shiftslist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="container mt-4">
    <h2 class="mb-3">Shift Edit</h2>
    <form @submit.prevent="updateShift" class="mb-4">
      <div class="mb-3">
        <label for="shiftName" class="form-label">Shift Name</label>
        <input
          id="shiftName"
          v-model="newShift.name"
          type="text"
          class="form-control"
          placeholder="Enter shift name"
          required
        />
      </div>

      <div class="mb-3">
        <label for="startTime" class="form-label">Start Time</label>
        <input
          id="startTime"
          v-model="newShift.start_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="endTime" class="form-label">End Time</label>
        <input
          id="endTime"
          v-model="newShift.end_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-success" style="margin-left: 10px;">
        <i class="bi bi-check-circle"></i> Update
      </button>
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
    const id = route.params.id;
    const newShift = ref({
      name: "",
      start_time: "",
      end_time: "",
    });

    onMounted(() => {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          newShift.value = {
            name: data.name || "",
            start_time: data.start_time || "00:00",
            end_time: data.end_time || "00:00",
          };
        })
        .catch(() => {
          alert("Failed to load shift data");
        });
    });

    const updateShift = () => {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShift.value),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update shift");
          return res.json();
        })
        .then(() => {
          alert("Shift updated successfully!");
          router.push("/shiftslist");
        })
        .catch((error) => {
          alert(error.message);
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

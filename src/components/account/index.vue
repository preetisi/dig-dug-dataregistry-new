<template>
  <div>
    <div class="headline">
      <img src="../../assets/broadlogo.jpeg" />
      <h1>Welcome to KPN Data Registry</h1>
    </div>
    <p v-if="profile.name">
      <strong>Name:</strong>
      {{ profile.title }} {{ profile.name }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-top: 1em;
  display: flex;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "account",
  computed: mapState({ profile: state => state.user.profile })
};
</script>

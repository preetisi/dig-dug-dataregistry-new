/** * Created by vouill on 11/13/17. */

<template>
  <div class="feed-item">
    <h4>{{ feed.name }}</h4>
    <p>{{ feed.content }}</p>
  </div>
</template>

<style scoped>
.feed-item {
  padding: 1em;
  width: 850px;
}
</style>
<script>
export default {
  name: "feedItem",
  props: { feed: Object }
};
</script>

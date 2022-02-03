<template>
    <div>
        <loading v-if="loading" />
        <div v-if="isAuthenticated">
            <h1>Welcome to KPN Data registry</h1>
            <feed-item v-for="(feed, index) in fakeFeed" :key="index" :feed="feed" />
            <v-btn to="/datasetsList" block elevation="2">Registered datasets</v-btn>
            <span>&nbsp;</span>
            <v-btn to="/addDatasets" block elevation="2">Add new datasets</v-btn>
        </div>
        <div v-if="!isAuthenticated && authStatus !== 'loading'">
            <h1>Welcome to KPN Data Registry !</h1>
            <p>Please login or signup to register your datasets to KPN Data registry.</p>

            <v-btn to="/login" block elevation="2">Sign in</v-btn>
            <span>&nbsp;</span>
            <v-btn to="/signup" block elevation="2">Sign up</v-btn>
        </div>
    </div>
</template>

<style>
.home {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>

<script>
import fakeFeed from "./fakeFeed";
import FeedItem from "./feedItem.vue";
import { mapGetters } from "vuex";
import Login from "components/login";
import Signup from "components/signup";

export default {
    components: {
        Login,
        FeedItem,
        Signup
    },

    name: "home",
    methods: {},
    computed: {
        shownSignin: function() {
            this.$router.push("/login");
        },
        shownSignup() {
            this.$router.push("/signup");
        },
        ...mapGetters(["isAuthenticated", "authStatus"]),
        loading: function() {
            return this.authStatus === "loading" && !this.isAuthenticated;
        }
    },
    data() {
        return { fakeFeed };
    }
};
</script>

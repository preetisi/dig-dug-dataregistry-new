
<template>
    <div>
        <form>
            <h1>Sign up</h1>
            <label>Email id</label>
            <input required v-model="emailid" type="email" />
            <label>Instituition</label>
            <input required v-model="instituition" type="text" />
            <label>Password</label>
            <input required v-model="password" type="password" />
            <hr />
            <button class="button is-primary">Submit</button>
        </form>
    </div>
</template>

<style>
.login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
}
</style>

<script>
import { AUTH_REQUEST } from "actions/auth";

export default {
    name: "signup",

    data() {
        return {
            emailid: "",
            instituition: "",
            password: ""
        };
    },
    methods: {
        signup: function() {
            const { emailid, instituition, password } = this;
            //     this.$store
            //         .dispatch(AUTH_REQUEST, { username, password })
            //         .then(() => {
            //             this.$router.push("/");
            //         });
        }
    }
};
</script>



<template>
    <div class="submit-form">
        <p class="headline">Register to Broad KPN Data registry</p>

        <div v-if="!submitted">
            <v-form ref="form" lazy-validation>
                <v-text-field
                    v-model="emailid"
                    :rules="[(v) => !!v || 'Email id is required']"
                    label="Email ID"
                    required
                    outlined
                    dense
                ></v-text-field>
                <v-text-field
                    v-model="instituition"
                    :rules="[(v) => !!v || 'Instituition is required']"
                    label="Instituition"
                    required
                    outlined
                    dense
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="[(v) => !!v || 'Password is required']"
                    label="Password"
                    required
                    outlined
                    dense
                ></v-text-field>
            </v-form>

            <v-btn color="primary" class="mt-3" @click="saveUser">Register</v-btn>
        </div>
        <div v-else>
            <v-card>
                <v-card-title>User Submitted successfully!</v-card-title>

                <v-card-subtitle>Click the button to add new Dataset.</v-card-subtitle>
                <v-btn to="/addDatasets" block elevation="2">Add new datasets</v-btn>
                <v-btn to="/datasetsList" block elevation="2">View your registered datasets</v-btn>
            </v-card>
        </div>
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
import DataRegistrationService from "/src/services/DataRegistrationService.js";
export default {
    name: "signup",

    data() {
        return {
            emailid: "",
            instituition: "",
            password: "",
            submitted: false
        };
    },
    methods: {
        saveUser() {
            var data = {
                emailid: this.emailid,
                password: this.publication,
                instituition: this.instituition
            };

            DataRegistrationService.createUser(data)
                .then(response => {
                    this.emaild = response.data.emailid;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newUser() {
            this.submitted = false;
            // this.dataset = {};
        }
    }
};
</script>

<template>
    <div class="submit-form">
        <p class="headline">Register new dataset to Broad KPN Data registry</p>

        <div v-if="!submitted">
            <v-form width="1000px" ref="form" lazy-validation>
                <v-text-field
                    v-model="dataset.datasetid"
                    :rules="[(v) => !!v || 'Dataset id is required']"
                    label="Dataset ID"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.username"
                    :rules="[(v) => !!v || 'Dataset name is required']"
                    label="Dataset Name"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="dataset.status"
                    :rules="[(v) => !!v || 'Status is required']"
                    label="Status"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.Notes"
                    :rules="[(v) => !!v || 'Dataset Notes are required']"
                    label="Dataset Notes"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.Origin"
                    :rules="[(v) => !!v || 'Origin required']"
                    label="Origin"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.PI"
                    :rules="[(v) => !!v || 'PI name required']"
                    label="Principal Investigator"
                    required
                ></v-text-field>
            </v-form>

            <v-btn color="primary" class="mt-3" @click="saveTutorial">Submit</v-btn>
        </div>

        <div v-else>
            <v-card>
                <v-card-title>Submitted successfully!</v-card-title>

                <v-card-subtitle>Click the button to add new Tutorial.</v-card-subtitle>

                <v-card-actions>
                    <v-btn color="success" @click="newTutorial">Add</v-btn>
                </v-card-actions>
            </v-card>
            <datasetsList></datasetsList>
        </div>
    </div>
</template>

<script>
import DataRegistrationService from "/Users/psingh/broadProjects/vue-authentication-example/src/services/DataRegistrationService.js";
import DatasetsList from "/Users/psingh/broadProjects/vue-authentication-example/src/components/partials/datasetsList.vue";

export default {
    name: "addDatasets",
    data() {
        return {
            dataset: {
                id: null,
                dataset_id: ""
            },
            submitted: false
        };
    },
    components: {
        DatasetsList
    },

    methods: {
        saveTutorial() {
            var data = {
                username: this.dataset.username,
                dataset_id: this.dataset.dataset_id,
                datasetname: this.dataset.datasetname,
                status: this.dataset.status,
                Notes: this.dataset.notes,
                PI: this.dataset.PI,
                Origin: this.dataset.Origin
            };

            DataRegistrationService.create(data)
                .then(response => {
                    this.dataset.id = response.data.dataset_id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newTutorial() {
            this.submitted = false;
            this.dataset = {};
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
}
</style>
<template>
    <div>
        <p class="headline">Register new dataset to Broad KPN Data registry</p>

        <div v-if="!submitted">
            <v-form ref="form" lazy-validation>
                <v-text-field
                    v-model="dataset.emailid"
                    :rules="[(v) => !!v || 'Email id is required']"
                    label="Email ID"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.publication"
                    :rules="[(v) => !!v || 'Publication is required']"
                    label="Publication link"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="dataset.phenotypes"
                    :rules="[(v) => !!v || 'Phenotype name is required']"
                    label="Phenotype Name"
                    required
                ></v-text-field>

                <v-text-field
                    v-model.number="dataset.samplesize"
                    type="number"
                    :rules="[(v) => !!v || 'Sample Size is required']"
                    label="Sample Size"
                    required
                ></v-text-field>
                <!-- <span>Pick the category of your Phenotype</span> -->

                <!-- <select v-model="ancestry">
                    <option
                        v-for="ancestor in ancestries"
                        v-bind:value="ancestor.value"
                    >{{ ancestor.text }}</option>
                </select>
                <span>Selected: {{ ancestry }}</span>-->
                &nbsp;&nbsp;
                <!-- <Dropdown
                    :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'}]"
                    v-on:selected="validateSelection"
                    v-on:filter="getDropdownValues"
                    :disabled="false"
                    name="zipcode"
                    :maxItem="10"
                    placeholder="Please select an option"
                ></Dropdown>-->

                <select v-model="ancestry">
                    <option disabled value>Please select one of the ancestries</option>
                    <option v-for="ancestor in ancestries" :value="ancestor.value">{{ancestor.text}}</option>
                </select>
                <br />
                <span>&nbsp;</span>
                <input type="radio" id="dichotomous" value="Dichotomous" v-model="picked" />
                <span>&nbsp;</span>
                <label for="dichotomous">Dichotomous</label>
                <span>&nbsp;</span>
                <input type="radio" id="continuous" value="Continuous" v-model="picked" />
                <span>&nbsp;</span>
                <label for="continuous">Continuous</label>
                <br />

                <v-text-field
                    v-if="picked == `Dichotomous`"
                    v-model.number="dataset.case"
                    type="number"
                    :rules="[(v) => !!v || 'Number of cases is required']"
                    label="Cases"
                    required
                ></v-text-field>

                <v-text-field
                    v-if="picked == `Dichotomous`"
                    v-model.number="dataset.control"
                    type="number"
                    :rules="[(v) => !!v || 'Control is required']"
                    label="Controls"
                    required
                ></v-text-field>
                <v-text-field
                    v-if="picked == `Dichotomous`"
                    v-model.number="dataset.totalsamplesize"
                    type="number"
                    :rules="[(v) => !!v || 'Total Sample Size is required']"
                    label="Total Sample Size"
                    required
                ></v-text-field>
                <v-text-field
                    v-if="picked == `Continuous`"
                    v-model.number="dataset.totalsamplesize"
                    type="number"
                    :rules="[(v) => !!v || 'Total Sample Size is required']"
                    label="Total Sample Size"
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
<script type="text/javascript" src="node_modules/vue-simple-search-dropdown/dist/vue-simple-search-dropdown.min.js"></script>

<script>
import DataRegistrationService from "/src/services/DataRegistrationService.js";
import DatasetsList from "/src/components/partials/datasetsList.vue";
import Dropdown from "vue-simple-search-dropdown";
export default {
    name: "addDatasets",
    data() {
        return {
            column: null,
            row: null,
            emailid: "",
            picked: "",
            Dichotomous: true,
            Continuous: false,

            dataset: {
                id: null,
                dataset_id: ""
            },
            submitted: false,
            ancestry: "",
            ancestries: [
                { text: "One", value: "A" },
                { text: "Two", value: "B" },
                { text: "Three", value: "C" }
            ]
        };
    },
    components: {
        DatasetsList,
        Dropdown
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
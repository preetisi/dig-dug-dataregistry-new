<template>
    <div class="submit-form">
        <p class="headline">Register new dataset to Broad KPN Data registry</p>

        <div v-if="!submitted">
            <v-form ref="form" lazy-validation>
                <!-- <v-text-field
                    v-model="dataset.emailid"
                    :rules="[(v) => !!v || 'Email id is required']"
                    label="Email ID"
                    required
                    outlined
                    dense
                ></v-text-field>-->
                <v-text-field
                    v-model="dataset.publication"
                    :rules="[(v) => !!v || 'Publication is required']"
                    label="Publication link"
                    required
                    outlined
                    dense
                ></v-text-field>
                <v-text-field
                    v-model="dataset.phenotypes"
                    :rules="[(v) => !!v || 'Phenotype name is required']"
                    label="Phenotype Name"
                    required
                    outlined
                    dense
                ></v-text-field>
                <!-- Ancestries -->
                <v-select v-model="dataset.ancestry" :items="ancestries" label="Ancestries" dense></v-select>
                <v-select v-model="dataset.tech" :items="tech" label="Technology" dense></v-select>

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
                <v-card-title>Dataset Submitted successfully! Tracking id of this submission is {{trackingnumber}}</v-card-title>

                <v-card-subtitle>Click the button to add new Dataset.</v-card-subtitle>

                <v-card-actions>
                    <v-btn color="success" @click="newTutorial">Add</v-btn>
                </v-card-actions>
            </v-card>
            <v-btn to="/datasetsList" block elevation="2">View your registered datasets</v-btn>
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
            trackingnumber: 123,

            dataset: {
                id: null,
                dataset_id: ""
            },
            submitted: false,
            ancestry: "",
            ancestries: [
                { text: "African American", value: "AA" },
                { text: "Eruropean American", value: "EA" },
                { text: "African", value: "AF" },
                { text: "Eruropean", value: "EU" },
                { text: "Hispanic", value: "HS" },
                { text: "South American", value: "SA" },
                { text: "Mixed", value: "Mixed" }
            ],
            tech: ["GWAS", "ExChip", "ExSeq", "FM", "IChip", "WGS"]
        };
    },
    components: {
        DatasetsList,
        Dropdown
    },

    methods: {
        saveTutorial() {
            var data = {
                emailid: this.dataset.emailid,
                publication: this.dataset.publication,
                phenotype: this.dataset.phenotype,
                ancestry: this.dataset.ancestry,
                technology: this.dataset.technology,
                dichotomous: this.dataset.dichotomous,
                continuous: this.dataset.continuous,
                case: this.dataset.case,
                control: this.dataset.control,
                samplesize: this.dataset.samplesize
            };

            DataRegistrationService.create(data)
                .then(response => {
                    this.dataset.emaild = response.data.emailid;
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
    margin: auto;
    max-width: 1500px;
}
.radiostyle {
    opacity: 1;
}
</style>
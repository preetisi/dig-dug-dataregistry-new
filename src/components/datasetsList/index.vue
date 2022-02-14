<template>
    <v-row align="center" class="list">
        <!-- <v-col cols="12" md="8">
            <v-text-field v-model="dataset_id" label="Search by email id"></v-text-field>
        </v-col>-->

        <!-- <v-col>
            <v-btn small @click="searchByEmailID">Search</v-btn>
        </v-col>-->

        <v-col cols="12" sm="12">
            <v-card-title>Registered Datasets</v-card-title>

            <v-data-table
                style="width = 100%"
                :headers="headers"
                :items="datasets"
                disable-pagination
                :hide-default-footer="true"
            >
                <template v-slot:item.actions="item">
                    <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
                </template>
            </v-data-table>

            <v-card-actions v-if="datasets.length > 0">
                <v-btn small color="error" @click="removeAllTutorials">Remove All</v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
</template>

<script>
import DataRegistrationService from "/src/services/DataRegistrationService.js";
import { mapGetters, mapState } from "vuex";
import index from "/src/components/login/index.vue";
export default {
    name: "datasetsList",
    data() {
        return {
            datasets: [],
            dataset_id: "",
            username: "",
            name: "datasets-list",
            currentTutorial: null,
            currentIndex: -1,
            dataset: "",
            headers: [
                // {
                //     text: "Email id",
                //     align: "start",
                //     sortable: false,
                //     value: "emailid"
                // },
                {
                    text: "Publication",
                    align: "start",
                    sortable: false,
                    value: "publication"
                },
                {
                    text: "Phenotype",
                    align: "start",
                    sortable: false,
                    value: "phenotype"
                },
                {
                    text: "Ancestry",
                    align: "start",
                    sortable: false,
                    value: "ancestry"
                },
                {
                    text: "Technology",
                    align: "start",
                    sortable: false,
                    value: "technology"
                },
                {
                    text: "Dichotomous",
                    align: "start",
                    sortable: false,
                    value: "dichotomous"
                },
                {
                    text: "Continuous",
                    align: "start",
                    sortable: false,
                    value: "continuous"
                },
                {
                    text: "Case",
                    align: "start",
                    sortable: false,
                    value: "case"
                },
                {
                    text: "Control",
                    align: "start",
                    sortable: false,
                    value: "control"
                },
                {
                    text: "Sample size",
                    align: "start",
                    sortable: false,
                    value: "samplesize"
                }
            ]
        };
    },
    computed: mapState({ profile: state => state.user.profile }),

    methods: {
        updateCheckedRows(rowsKey) {
            // do your checkbox click event
            console.log(rowsKey);
        },
        retrieveTutorials() {
            DataRegistrationService.getAll()
                .then(response => {
                    this.datasets = response.data
                        .map(this.getDisplayTutorial)
                        .filter(x => x.datasetname !== "")
                        .filter(x => x.datasetid !== "");

                    console.log(
                        response.data.filter(x => x.datasetname !== "")
                    );
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveTutorials();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },

        setActiveTutorial(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removeAllTutorials() {
            DataRegistrationService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchByEmailID() {
            DataRegistrationService.findByEmailid(this.emailid)
                .then(response => {
                    this.datasets = response.data
                        .map(this.getDisplayTutorial)
                        .filter(x => x.emailid !== "")
                        .filter(x => x.publication !== "");

                    console.log("filtered by email id", response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        editTutorial(id) {
            this.$router.push({ name: "tutorial-details", params: { id: id } });
        },
        getDisplayTutorial(tutorial) {
            return {
                emailid: tutorial.emailid,
                publication: tutorial.publication,
                phenotype: tutorial.phenotype,
                ancestry: tutorial.ancestry,
                technology: tutorial.technology,
                dichotomous: tutorial.dichotomous
                    ? tutorial.dichotomous
                    : false,
                continuous: tutorial.continuous ? tutorial.continuous : false,
                case: tutorial.case,
                control: tutorial.control,
                samplesize: tutorial.samplesize
            };
        }
    },

    mounted() {
        this.retrieveTutorials();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 1250px;
    margin: auto;
}
</style>
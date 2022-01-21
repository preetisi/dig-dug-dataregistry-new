<template>
    <v-row align="center" class="list">
        <!-- <v-col cols="12" md="8">
            <v-text-field v-model="dataset_id" label="Search by Dataset id"></v-text-field>
        </v-col>-->

        <v-col>
            <v-btn small @click="searchByDatasetID">Search</v-btn>
        </v-col>

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
import DataRegistrationService from "/Users/psingh/broadProjects/vue-authentication-example/src/services/DataRegistrationService.js";
import { mapGetters, mapState } from "vuex";

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
                {
                    text: "Dataset Name",
                    align: "start",
                    sortable: false,
                    value: "datasetname"
                },
                {
                    text: "Username",
                    align: "start",
                    sortable: false,
                    value: "username"
                },
                {
                    text: "PI",
                    align: "start",
                    sortable: false,
                    value: "PI"
                },
                {
                    text: "Origin",
                    align: "start",
                    sortable: false,
                    value: "Origin"
                },
                { text: "status", value: "status", sortable: false }
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

        searchByDatasetID() {
            DataRegistrationService.findByDatasetId(this.dataset_id)
                .then(response => {
                    this.datasets = response.data.map(this.getDisplayTutorial);

                    console.log("filtered by dataset id", response.data);
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
                dataset_id: tutorial.dataset_id,
                datasetname: tutorial.datasetname,
                status: tutorial.status,
                Origin: tutorial.Origin,
                PI: tutorial.PI,

                username: tutorial.username
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
    max-width: 750px;
    margin: auto;
}
</style>
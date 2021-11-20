<template>
    <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" md="8">
            <v-text-field v-model="dataset" label="Search by Dataset name"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-btn small @click="searchByDatasetName">Search</v-btn>
        </v-col>

        <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
                <v-card-title>datasets</v-card-title>

                <v-data-table
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
            </v-card>
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
            username: "",
            name: "datasets-list",
            currentTutorial: null,
            currentIndex: -1,
            dataset: "",
            headers: [
                {
                    text: "datasetid",
                    align: "start",
                    sortable: false,
                    value: "datasetid"
                },
                { text: "Description", value: "description", sortable: false },
                { text: "Status", value: "status", sortable: false },
                { text: "Actions", value: "actions", sortable: false }
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
                    this.datasets = response.data.map(this.getDisplayTutorial);
                    console.log(response.data);
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

        searchByDatasetName() {
            DataRegistrationService.findByUsername(this.username)
                .then(response => {
                    this.datasets = response.data;
                    this.setActiveTutorial(null);
                    console.log("filtered by dataset name", response.data);
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
                id: tutorial.id,
                datasetid:
                    tutorial.username.length > 30
                        ? tutorial.datasetid.substr(0, 30) + "..."
                        : tutorial.datasetid,
                description:
                    tutorial.description.length > 30
                        ? tutorial.description.substr(0, 30) + "..."
                        : tutorial.description,
                status: tutorial.published ? "Published" : "Pending"
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
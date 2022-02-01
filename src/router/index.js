import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import Account from "components/account";
import Account2 from "components/account2";
import AddDatasets from "components/addDatasets";
import DatasetsList from "components/datasetsList";

import Datasets from "components/dataset";

import Login from "components/login";
import Signup from "components/signup";
import store from "../store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/account2",
      name: "Account2",
      component: Account2,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/addDatasets",
      name: "AddDatasets",
      component: AddDatasets,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/datasetsList",
      name: "DatasetsList",
      component: DatasetsList,
      beforeEnter: ifAuthenticated
    },

    {
      path: "/dataset",
      name: "Datasets",
      component: Datasets,
      beforeEnter: ifAuthenticated
    },

    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      beforeEnter: ifNotAuthenticated
    }
  ]
});

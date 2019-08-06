"use strict";

const db = firebase.database();
const auth = firebase.auth();

const data = {
    page: null,
    uid: null,
    username: null,
    isLoggedIn: false,
    rooms: [],
    room: null,
}

const vm = new Vue({
    el: "#app",
    data: data,
    beforeCreate: function () {
    },
    created: function () {
    },
    mounted: function () {
    },
    watch: {
    },
    computed: {
    },
    methods: {
    }
});

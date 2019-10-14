<template>
  <div id="navbar">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>
        <i class="fas fa-clipboard"></i> Kanban Board
      </b-navbar-brand>
      <b-button id="addTask" v-b-modal.add variant="success">
        <i class="fas fa-plus"></i> Add Task
      </b-button>
    </b-navbar>

    <!--Modal to add new task-->
    <div id="modalAdd">
      <b-modal
        id="add"
        title="Add task"
        ok-title="Create"
        @ok="create"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">
          <b-form-group id="taskTitleGroup" label="Task title:" label-for="taskTitleLabel">
            <b-form-input
              v-model="title"
              id="taskTitleEntry"
              required
              placeholder="Enter task title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="taskDescriptionGroup"
            label="Task owner:"
            label-for="taskDescriptionLabel"
          >
            <b-form-textarea
              v-model="owner"
              id="taskDescriptionEntry"
              required
              placeholder="Enter task owner"
              rows="3"
              max-rows="5"
            ></b-form-textarea>
          </b-form-group>
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import db from "@/apis/firebase.js";
import firebase from "firebase/app";
// const { db, timestamp } = firebase;
const tasks = db.collection("tasks");
export default {
  data: function() {
    return {
      title: "",
      owner: ""
    };
  },
  methods: {
    create() {
      tasks
        .add({
          title: this.title,
          owner: this.owner,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          status: "backlog"
        })
        .then(result => {
          console.log(result);
          this.title = "";
          this.owner = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#navbar {
  font-family: Nunito;
}
#addTask {
  margin-left: 30px;
}
</style>
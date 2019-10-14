<template>
  <div>
    <Navbar />

    <b-container fluid>
      <b-row class="justify-content-center">
        <h4>Please drag and drop box to move the task around</h4>
        <div id="kanbanBlanket" class="row bg-light justify-content-center w-100">
          <b-col sm="6" md="3">
            <div id="backlogBlanket" class="ml-1 mt-1">
              <b-card
                id="backlogHeader"
                header="Backlog"
                header-bg-variant="primary"
                header-text-variant="light"
                header-tag="header"
                header-class="text-center"
              >
                <draggable class="dragArea list-group" :list="list1" group="kanban">
                  <b-card
                    id="taskBacklog"
                    class="my-1 p-3 text-wrap"
                    v-for="task in list1"
                    :key="task.id"
                  >
                    <b-card-title id="taskDescription">
                      <i class="fas fa-thumbtack"></i>
                      <strong>Task:</strong>
                      <br />
                      {{task.title}}
                    </b-card-title>
                    <b-card-text id="taskOwner">Assigned to: {{task.owner}}</b-card-text>
                    <b-card-text id="taskCreatedAt">Created at: {{task.createdAt}}</b-card-text>
                    <b-button
                      id="deleteButton"
                      variant="outline-danger btn-block"
                      @click.prevent="remove(task.id)"
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </b-button>
                  </b-card>
                </draggable>
              </b-card>
            </div>
          </b-col>
          <b-col sm="6" md="3">
            <div id="toDoBlanket" class="ml-1 mt-1">
              <b-card
                id="toDoHeader"
                header="To-Do"
                header-bg-variant="danger"
                header-text-variant="light"
                header-tag="header"
                header-class="text-center"
              >
                <draggable class="dragArea list-group" :list="list2" group="kanban">
                  <b-card
                    id="taskToDo"
                    class="my-1 p-3 text-wrap"
                    v-for="task in list2"
                    :key="task.id"
                  >
                    <b-card-title id="taskDescription">
                      <i class="fas fa-thumbtack"></i>
                      <strong>Task:</strong>
                      <br />
                      {{task.title}}
                    </b-card-title>
                    <b-card-text id="taskOwner">Assigned to: {{task.owner}}</b-card-text>
                    <b-card-text id="taskCreatedAt">Created at: {{task.createdAt}}</b-card-text>
                    <b-button
                      id="deleteButton"
                      @click.prevent="remove(task.id)"
                      variant="outline-danger btn-block"
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </b-button>
                  </b-card>
                </draggable>
              </b-card>
            </div>
          </b-col>
          <b-col sm="6" md="3">
            <div id="inProgressBlanket" class="ml-1 mt-1">
              <b-card
                id="inProgressHeader"
                header="In Progress"
                header-bg-variant="warning"
                header-text-variant="dark"
                header-tag="header"
                header-class="text-center"
              >
                <draggable class="dragArea list-group" :list="list3" group="kanban">
                  <b-card
                    id="taskInProgress"
                    class="my-1 p-3 text-wrap"
                    v-for="task in list3"
                    :key="task.id"
                  >
                    <b-card-title id="taskDescription">
                      <i class="fas fa-thumbtack"></i>
                      <strong>Task:</strong>
                      <br />
                      {{task.title}}
                    </b-card-title>
                    <b-card-text id="taskOwner">Assigned to: {{task.owner}}</b-card-text>
                    <b-card-text id="taskCreatedAt">Created at: {{task.createdAt}}</b-card-text>
                    <b-button
                      id="deleteButton"
                      variant="outline-danger btn-block"
                      @click.prevent="remove(task.id)"
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </b-button>
                  </b-card>
                </draggable>
              </b-card>
            </div>
          </b-col>
          <b-col sm="6" md="3">
            <div id="doneBlanket" class="ml-1 mt-1">
              <b-card
                id="doneHeader"
                header="Done"
                header-bg-variant="success"
                header-text-variant="light"
                header-tag="header"
                header-class="text-center"
              >
                <draggable class="dragArea list-group" :list="list4" group="kanban">
                  <b-card
                    id="taskDone"
                    class="my-1 p-3 text-wrap"
                    v-for="task in list4"
                    :key="task.id"
                  >
                    <b-card-title id="taskDescription">
                      <i class="fas fa-thumbtack"></i>
                      <strong>Task:</strong>
                      <br />
                      {{task.title}}
                    </b-card-title>
                    <b-card-text id="taskOwner">Assigned to: {{task.owner}}</b-card-text>
                    <b-card-text id="taskCreatedAt">Created at: {{task.createdAt}}</b-card-text>
                    <b-button
                      @click.prevent="remove(task.id)"
                      id="deleteButton"
                      variant="outline-danger btn-block"
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </b-button>
                  </b-card>
                </draggable>
              </b-card>
            </div>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar.vue";
import draggable from "vuedraggable";
import db from "@/apis/firebase.js";
const tasks = db.collection("tasks");

export default {
  components: {
    draggable,
    Navbar
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: []
    };
  },
  methods: {
    remove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          tasks
            .doc(id)
            .delete()
            .then(result => {
              console.log(result);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  watch: {
    list1() {
      for (let el of this.list1) {
        if (el.status !== "backlog") {
          tasks
            .doc(el.id)
            .update({
              status: "backlog"
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    list2() {
      for (let el of this.list2) {
        if (el.status !== "todo") {
          tasks
            .doc(el.id)
            .update({
              status: "todo"
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    list3() {
      for (let el of this.list3) {
        if (el.status !== "inprogress") {
          tasks
            .doc(el.id)
            .update({
              status: "inprogress"
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    list4() {
      for (let el of this.list4) {
        if (el.status !== "done") {
          tasks
            .doc(el.id)
            .update({
              status: "done"
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  },
  created() {
    Swal.showLoading();
    tasks.onSnapshot(snapshot => {
      Swal.close();
      this.list1 = [];
      this.list2 = [];
      this.list3 = [];
      this.list4 = [];
      snapshot.forEach(obj => {
        const id = obj.id;
        const data = obj.data();
        const createdAt = new Date(
          data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1e6
        );
        if (data.status === "backlog") {
          this.list1.push({
            id,
            title: data.title,
            owner: data.owner,
            createdAt,
            status: data.status
          });
        } else if (data.status === "todo") {
          this.list2.push({
            id,
            title: data.title,
            owner: data.owner,
            createdAt,
            status: data.status
          });
        } else if (data.status === "inprogress") {
          this.list3.push({
            id,
            title: data.title,
            owner: data.owner,
            createdAt,
            status: data.status
          });
        } else if (data.status === "done") {
          this.list4.push({
            id,
            title: data.title,
            owner: data.owner,
            createdAt,
            status: data.status
          });
        }
      });
    });
  }
};
</script>

<style scoped>
#kanbanBlanket {
  font-family: Nunito;
  display: flex;
}

/* #backlogBlanket,
#toDoBlanket,
#inProgressBlanket,
#doneBlanket {
  width: 22vw;
} */

#backlogHeader {
  font-size: 1.1rem;
  background-image: url(https://images.alphacoders.com/881/thumb-1920-881287.jpg);
}

#toDoHeader {
  font-size: 1.1rem;
  background-image: url(https://img.wallpapersafari.com/desktop/1920/1080/22/40/JZgSWb.jpg);
}

#inProgressHeader {
  font-size: 1.1rem;
  background-image: url(https://img.freepik.com/free-vector/beautiful-colorful-polygon-background-vector_1035-15173.jpg?size=338&ext=jpg);
}

#doneHeader {
  font-size: 1.1rem;
  background-image: url(https://www.setaswall.com/wp-content/uploads/2018/02/Green-Background-18-3500x2500.jpg);
}

#taskBacklog {
  width: 100%;
  background-color: #def3fd;
}

#taskToDo {
  width: 100%;
  background-color: #fddfdf;
}

#taskInProgress {
  width: 100%;
  background-color: #fcf7de;
}

#taskDone {
  width: 100%;
  background-color: #defde0;
}
</style>
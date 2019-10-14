<template>
  <div id="kanbanBlanket" class="d-flex flex-wrap bg-light justify-content-center">
    <div id="backlogBlanket" class="ml-1 mt-1">
      <b-card
        id="backlogHeader"
        header="Backlog"
        header-bg-variant="primary"
        header-text-variant="light"
        header-tag="header"
        header-class="text-center"
      >
        <b-card id="taskBacklog" class="p-3 text-wrap">
          <b-card-title id="taskTitle">Masak Indomie</b-card-title>
          <b-card-text
            id="taskDescription"
          >Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi.</b-card-text>
          <b-button id="toDoButton" v-b-modal.move variant="dark btn-block">To-Do</b-button>
          <b-button id="deleteButton" v-b-modal.delete variant="outline-danger btn-block">Delete</b-button>
        </b-card>
      </b-card>
    </div>

    <div id="toDoBlanket" class="ml-1 mt-1">
      <b-card
        id="toDoHeader"
        header="To-Do"
        header-bg-variant="danger"
        header-text-variant="light"
        header-tag="header"
        header-class="text-center"
      >
        <b-card id="taskToDo" class="p-3 text-wrap">
          <b-card-title id="taskTitle">Masak Indomie</b-card-title>
          <b-card-text
            id="taskDescription"
          >Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi.</b-card-text>
          <b-button id="backlogButton" v-b-modal.move variant="dark btn-block">Backlog</b-button>
          <b-button id="inProgressButton" v-b-modal.move variant="dark btn-block">In Progress</b-button>
          <b-button id="deleteButton" v-b-modal.delete variant="outline-danger btn-block">Delete</b-button>
        </b-card>
      </b-card>
    </div>

    <div id="inProgressBlanket" class="ml-1 mt-1">
      <b-card
        id="inProgressHeader"
        header="In Progress"
        header-bg-variant="warning"
        header-text-variant="dark"
        header-tag="header"
        header-class="text-center"
      >
        <b-card id="taskInProgress" class="p-3 text-wrap">
          <b-card-title id="taskTitle">Cuci panci</b-card-title>
          <b-card-text
            id="taskDescription"
          >Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi.</b-card-text>
          <b-button id="toDoButton" v-b-modal.move variant="dark btn-block">To-Do</b-button>
          <b-button id="doneButton" v-b-modal.move variant="dark btn-block">Done</b-button>
          <b-button id="deleteButton" v-b-modal.delete variant="outline-danger btn-block">Delete</b-button>
        </b-card>
      </b-card>
    </div>

    <div id="doneBlanket" class="ml-1 mt-1">
      <b-card
        id="doneHeader"
        header="Done"
        header-bg-variant="success"
        header-text-variant="light"
        header-tag="header"
        header-class="text-center"
      >
        <b-card id="taskDone" class="p-3 text-wrap">
          <b-card-title id="taskTitle">Masak Indomie</b-card-title>
          <b-card-text
            id="taskDescription"
          >Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi. Mau gw pake buat masak Indomie lagi.</b-card-text>
          <b-button id="inProgressButton" v-b-modal.move variant="dark btn-block">In Progress</b-button>
          <b-button id="deleteButton" v-b-modal.delete variant="outline-danger btn-block">Delete</b-button>
        </b-card>
      </b-card>
    </div>

    <div id="modalDelete">
      <b-modal
        id="delete"
        title="Delete task"
        ok-title="Yes"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">Are you sure you want to delete task?</p>
      </b-modal>
    </div>

    <div id="modalMove">
      <b-modal
        id="move"
        title="Move task"
        ok-title="Yes"
        ok-variant="success"
        cancel-variant="danger"
      >
        <p class="my-2">Are you sure you want to move task?</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#kanbanBlanket {
  font-family: Nunito;
}
#backlogHeader {
  background-image: url(https://images.alphacoders.com/881/thumb-1920-881287.jpg);
}

#toDoHeader {
  background-image: url(https://img.wallpapersafari.com/desktop/1920/1080/22/40/JZgSWb.jpg);
}

#inProgressHeader {
  background-image: url(https://st3.depositphotos.com/5479200/13341/v/1600/depositphotos_133411100-stock-illustration-geometric-yellow-background-with-triangular.jpg);
}

#doneHeader {
  background-image: url(https://www.setaswall.com/wp-content/uploads/2018/02/Green-Background-18-3500x2500.jpg);
}

#taskBacklog {
  width: 15rem;
  background-color: #def3fd;
}

#taskToDo {
  width: 15rem;
  background-color: #fddfdf;
}

#taskInProgress {
  width: 15rem;
  background-color: #fcf7de;
}

#taskDone {
  width: 15rem;
  background-color: #defde0;
}
</style>
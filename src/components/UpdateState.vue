<template>
  <div class="hello">
    <div class="container">
      <div class="">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h1>Page 2</h1>
              <P>{{ stateData }}</P>

              <div class="form-group">
                <input type="text" v-model="updateState" class="form-control" />
              </div>
              <button @click="Update()" class="btn btn-outline-secondary">
                Update state
              </button>
              <router-link
                to="/"
                @click="Update()"
                class="btn btn-outline-secondary"
              >
                Back
              </router-link>
              <hr />
              <div class="form-group">
                <small class="btn-outline-danger"
                  >Notice that the text value is still the same because it is
                  coming from the state. Use the form above to update the state.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // stateData: '',
      updateState: '',
    };
  },

  computed: {
    stateData: function () {
      return this.$store.getters.getMessage;
    },
  },

  methods: {
    // mutation
    Update() {
      if (this.updateState != '') {
        // this.$store
        //   .commit('changeAsyncMessageValue', this.updateState)
        //   .then((message) => {
        //     console.log(message);
        //     console.log(this.stateData);
        //   });

        this.$store
          .dispatch('changeAsyncMessageValue', this.updateState)
          .then((message) => {
            console.log(message);
            console.log(this.stateData);
          });

        // this.stateData = this.updateState;
        // alert('state updated');
      } else {
        alert('Emtyp form field');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

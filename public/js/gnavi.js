// register the grid component
Vue.component('rest-grid', {
  template: `
    <div class="rest-grid">
      <modal 
        v-if="showModal" 
        @close="showModal = false"
        :rest="clicked"></modal>
      <table>
      <tr v-for="rest in restraunt" v-on:click="showDetail(rest)">
        <td><img :src="rest.image_url.shop_image1" height="50" /></td>
        <td>{{ rest.name }}</td>
      </tr>
      </table>
    </div>
  `,
  props: {
    restraunt: Array, 
  }, 
  data: () => {
    return {
      clicked: {}, 
      showModal: false
    }
  }, 
  methods: {
    showDetail(rest) {
      this.clicked = rest;
      this.showModal = true;
    } 
  }
})

Vue.component('modal', {
  template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body" id="rest-detail">
              <img id="image" :src="rest.image_url.shop_image1" height="50" />
              <div id="detail">{{ rest.name }}</div>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>`, 
  props: {
    rest: Object
  }, 
})

// bootstrap the demo
var rest = new Vue({
  el: '#rest',
  data: {
    gridData: [
    ]
    
  }, 
  methods: {
    restSearch: function() {
      let that = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          const request = new XMLHttpRequest();
          request.open("GET", `http://localhost:4567/RestSearchAPI/?latitude=${latitude}&longitude=${longitude}&range=3`);
          request.addEventListener("load", (event) => {
              console.log(event.target.status); // => 200
              console.log(event.target.responseText)
              that.gridData = JSON.parse(event.target.responseText)["rest"];
          });
          request.send();
        });
      } else {
        /* geolocation IS NOT available */
      }
    }
  }
})

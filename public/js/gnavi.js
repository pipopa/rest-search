// register the grid component
Vue.component('rest-grid', {
  template: `
    <div class="rest-grid">
      <table>
      <tr v-for="rest in restraunt">
        <td><img :src="rest.image_url.shop_image1" height="50" /></td>
        <td>{{ rest.name }}</td>
      </tr>
      </table>
    </div>
  `,
  props: {
    restraunt: Array
  }, 
  methods: {
  }
})

// bootstrap the demo
var rest = new Vue({
  el: '#rest',
  data: {
    searchQuery: '',
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

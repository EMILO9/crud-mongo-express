<template>
  <div class="Home">
      <p v-if="posts">Posts: {{posts.length}}</p>
      <div class="Grid">
          <div class="gridItem" v-for="post in posts" :key="post._id">{{post.title}}
              <div>
                  <input type="text" placeholder="new value">
                  <button>Update</button>
                  <button>Delete</button>
              </div>
          </div>
      </div>
      <input type="text" placeholder="title" v-model="title">
      <button @click="post">Post</button>
  </div>
</template>

<script>
import Posts from '../services/Posts'
export default {
  name: "Home",
  data () {
      return {
          posts: null,
          title: ''
      }
  },
  created () {
      Posts.getPosts().then(result => this.posts = result)
  },
  methods: {
      async post () {
          if (this.title.length >= 3) {
              await Posts.createPost(this.title)
              Posts.getPosts().then(result => this.posts = result)
          }
      }
  }
};
</script>

<style scoped>
.Grid {
    display: grid;
    grid-template-rows: repeat(10, 1fr);
    height: 300px;
    overflow-y: scroll;
    border: solid black 2px;
    width: 500px;
    margin: auto;
    margin-bottom: 10px;
}
.gridItem {
    border: solid black 2px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
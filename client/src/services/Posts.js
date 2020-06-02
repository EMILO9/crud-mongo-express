const axios = require("axios");

export async function getPosts() {
  try {
    const response = await axios.get("http://localhost:3000/posts");
    console.log("Get", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(myTitle) {
  try {
    const response = await axios.post("http://localhost:3000/posts", {
      title: myTitle,
    });
    console.log("Post", response.data);
  } catch (err) {
    console.error(err);
  }
}

export async function updatePost(title, id) {
  try {
    const response = await axios.put("http://localhost:3000/posts", {
      title: title,
      _id: id
    });
    console.log("Put", response.data);
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost (id) {
    try {
      const response = await axios.delete("http://localhost:3000/posts", {
        id: id
        })
        console.log('Delete', response.data)
    } catch (err) {
        console.error(err)
    }
}

export default { getPosts, createPost, updatePost, deletePost };

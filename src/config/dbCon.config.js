const ip = "http://192.168.101.173:8000"

const registerURL = `${ip}/auth/register`
const loginURL = `${ip}/auth/login`
const postsURL = `${ip}/posts`
const usersURL = `${ip}/user`
const getMeURL = `${ip}/auth/me`;

const APIUsersURL = `${ip}/api/user`

const feedPostsURL = `${ip}/api/posts`
const postsByIDURL = `${ip}/posts.by.id`

const putLikeToPost = `${postsURL}/putlike`

export {registerURL, loginURL, APIUsersURL, postsURL, usersURL, ip, putLikeToPost, getMeURL, feedPostsURL, postsByIDURL};
// User
const __APIUSER__ = 'http://192.168.1.217:8080/user'
// Vote
const __APIVOTE__ = 'http://192.168.1.217:8080/vote'
// Admin
const __APIADMIN__ = 'http://192.168.1.219:8080/admin'

const userApiMaker = (path) => {
  return `${__APIUSER__}/${path}`
}
const voteApiMaker = (path) => {
  return `${__APIVOTE__}/${path}`
}
const adminApiMaker = (path) => {
  return `${__APIADMIN__}/${path}`
}

export default {
  // user
  register: userApiMaker('register'),
  login: userApiMaker('login'),
  verify: userApiMaker('verify'),
  logout: userApiMaker('logout'),
    // vote
  info: voteApiMaker('info'),
    // admin
  changeVisibility: adminApiMaker('changeVisibility'),
  create: adminApiMaker('create'),
  delete: adminApiMaker(':voteId/delete'),
  singleInfo: adminApiMaker(':voteId/info'),
  pageInfo: adminApiMaker('info?page=pnum&rows=rnum'),
  beforeUpdate: adminApiMaker(':voteId/beforeUpdate'),
  voteUpdate: adminApiMaker('updateVote'),
  adminLogin: adminApiMaker('login')
}
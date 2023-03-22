const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user.user,
  token: state => state.user.token,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters

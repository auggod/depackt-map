const html = require('choo/html')

module.exports = (View) => {
  return (state, emit) => {
    return html`
      <div id="app" class="layout ${state.sideBarOpen ? 'js-sidebar--open' : 'js-sidebar--closed'}">
        ${View(state, emit)}
      </div>
    `
  }
}

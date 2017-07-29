const microcomponent = require('microcomponent')
const html = require('choo/html')
const morph = require('nanomorph')
const css = require('sheetify')
// const isEmpty = require('lodash/isEmpty')
// const slug = require('slug/slug-browser')
// const icon = require('./icon.js')
const translate = require('./translate.js')
// const api = require('../lib/depackt-api.js')

const prefix = css`
  :host ul li {
    list-style: none;
    margin: 0;
  }
  :host li {
    cursor: pointer;
    line-height: 48px;
    position: relative;
    padding-left: 1rem;
  }
  :host li:focus {
    outline: none;
    background: #f0f0f0;
  }
  :host li .list-icon {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
  }
  :host .input-outer {
    padding: 6px;
    background: #333;
  }
  :host .sticky {
    top: 60px;
    z-index: 500;
  }
  @media(min-width: 960px) {
    :host .sticky {
      top: 100px;
    }
  }
  :host input[type="search"] {
    appearance: none;
    border: none;
    position: relative;
    background: transparent;
    border-radius: 48px;
    box-shadow: none;
    color: #fff;
    font-size: 1rem;
    padding-left: 1.5rem;
    width: 100%;
    z-index: 1;
  }
  :host input[type="search"]:focus {
    background: rgba(200, 200, 200, .1);
    outline: none;
  }
  :host input[type="search"]::-webkit-input-placeholder {
    color: #f6f6f6;
    font-size: .8rem;
  }
  :host input[type="search"]::-webkit-search-cancel-button {
    appearance: none;
    height: 12px;
    width: 12px;
    color: #333;
    cursor: pointer;
    right: 1.5rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-size: 12px 12px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGcgZmlsbD0ibm9uZSI+PGcgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTU5LjYgNTBMOTggMTEuNkMxMDAuNyA4LjkgMTAwLjcgNC42IDk4IDIgOTUuNC0wLjcgOTEtMC43IDg4LjQgMkw1MCA0MC40IDExLjYgMkM5LTAuNyA0LjYtMC43IDIgMiAtMC43IDQuNi0wLjcgOSAyIDExLjZMNDAuNCA1MCAyIDg4LjRDLTAuNyA5MS0wLjcgOTUuNCAyIDk4IDQuNiAxMDAuNyA5IDEwMC43IDExLjYgOThMNTAgNTkuNiA4OC40IDk4QzkxLjEgMTAwLjcgOTUuNCAxMDAuNyA5OCA5OCAxMDAuNyA5NS40IDEwMC43IDkxIDk4IDg4LjRMNTkuNiA1MFoiLz48L2c+PC9nPjwvc3ZnPg==);
  }
`

module.exports = Search

function Search () {
  const component = microcomponent({
    input: '',
    name: 'search-typeahead', // component name used to set a css class
    data: [],
    translations: {},
    state: {
      search: {
        input: '',
        filtred: []
      },
      name: 'search-typeahead',
      translations: {},
      data: [],
      selected: {}
    }
  })

  component.on('render', render)
  component.on('update', update)
  component.on('load', load)
  component.on('unload', unload)

  return component

  function render () {
    const self = this
    const state = this.state

    state.name = this.props.name
    state.translations = this.props.translations
    state.data = component.props.data

    return html`
      <div class="${prefix} ${state.name}">
        <div class="input-outer sticky">
          <input
            autoFocus
            aria-label="search"
            autocomplete="false"
            id="searchinput"
            name="search"
            oninput=${handleInput}
            placeholder=${translate(state.translations, { term: 'SEARCH_PLACEHOLDER' })}
            type="search"
            value=${state.search.input}
          />
        </div>
        ${renderResults()}
      </div>
    `

    function handleInput (e) {
      const oldValue = state.search.input
      const newValue = e.target.value
      state.search.input = newValue

      if (oldValue !== newValue) {
        // morph(self._element.querySelector('.value'), renderValue(newValue))
        morph(self._element.querySelector('.results'), renderResults(newValue))
      }
    }

    function renderResults (value = state.search.input) {
      console.log(value)

      return html`
        <div class="results ${prefix}">
        </div>
      `
    }
  }

  function load () {
    console.log('loaded')
  }

  function unload () {
    console.log('unloaded')
    component._element = null
  }

  function update (props) {
    return props.input !== component.state.search.input ||
      props.data.length !== component.state.data.length ||
      props.translations !== component.state.translations
  }
}
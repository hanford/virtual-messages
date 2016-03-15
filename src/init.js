var Delegator = require('dom-delegator')
var vdom = require('virtual-dom')
var mainLoop = require('main-loop')
var sf = require('sheetify')
var cuid = require('cuid')
var DataUri = require('create-data-uri')
var FastClick = require('fastclick')
var raf = require('raf')
var Tween = require('micro-tween')

var messages = require('./messages.json')
var App = require('./components/app')

module.exports = function init () {
  sf('reset.css', {global: true})
  sf('./global.css', {global: true})

  FastClick(document.body)
  Delegator()
  tick()

  var state = App({
    messages: messages
  })
  var loop = mainLoop(state(), App.render, vdom)
  var root = document.getElementById('app')

  root.appendChild(loop.target)

  state(loop.update)

  return state
}

function tick () {
  Tween.update()
  raf(tick)
}
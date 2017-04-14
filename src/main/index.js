import reducers from './reducers'
import { createStore } from 'redux'
import SpaceComponent from './SpaceComponent'
import AppComponent from './AppComponent'
import { SPACE_CREATED, SPACE_UPDATED, SPACE_DELETED, APP_CREATED, APP_UPDATED, APP_DELETED } from './actionTypes'

const store = createStore(reducers)
const apiBaseURL = 'http://localhost:8080'

const resetSpaceList = () => {
  let root = document.getElementById('root')
  let oldList = root.lastChild
  root.removeChild(oldList)
}

const addAppHandler = (evt) => {
  let name = 'New App'
  let memoryAllocationMB = 256
  let diskAllocationMB = 256
  let data = { name, memoryAllocationMB, diskAllocationMB }

  window.fetch(apiBaseURL + '/spaces/' + evt.spaceId + '/apps', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }, (error) => {
    error.message
  }).then((data) => {
    let type = APP_CREATED
    let spaceId = data.spaceId
    let memoryAllocationMB = data.memoryAllocationMB
    let name = data.name
    let id = data.id
    let diskAllocationMB = data.diskAllocationMB
    let action = { type, id, spaceId, name, memoryAllocationMB, diskAllocationMB }
    store.dispatch(action)
  })
}

const addSpaceHandler = (evt) => {
  let name = 'New Space'
  let memoryQuotaMB = 1024
  let diskQuotaMB = 1024
  let data = { name, memoryQuotaMB, diskQuotaMB }

  window.fetch(apiBaseURL + '/spaces', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }, (error) => {
    error.message
  }).then((data) => {
    let type = SPACE_CREATED
    let id = data.id
    let name = data.name
    let memoryQuotaMB = data.memoryQuotaMB
    let diskQuotaMB = data.diskQuotaMB
    let action = {type, id, name, memoryQuotaMB, diskQuotaMB}
    store.dispatch(action)
  })
}

const ingestSpaces = (spaces) => {


  spaces.forEach((space) => {
      console.log("Space: ");
      console.log(space);

      let type = SPACE_CREATED
    let memoryQuotaMB = space.memoryQuotaMB
    let name = space.name
    let id = space.id
    let diskQuotaMB = space.diskQuotaMB
    let action = { type, id, name, diskQuotaMB, memoryQuotaMB }
    store.dispatch(action)
    if (space.apps && Array.isArray(space.apps)) {
      space.apps.forEach((app) => {
          console.log("App: ");
        console.log(app);
        let type = APP_CREATED
        let id = app.id
        let spaceId = space.id
        let name = app.name
        let memoryAllocationMB = app.memoryAllocationMB
        let diskAllocationMB = app.diskAllocationMB
        let action = { type, id, spaceId, name, memoryAllocationMB, diskAllocationMB }
        store.dispatch(action)
      })
    }
  })
}

const initButtons = () => {
  let addSpaceBtn = document.getElementById('addSpaceBtn')
  addSpaceBtn.onclick = addSpaceHandler
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}

const deleteSpace = (spaceId) => {
  window.fetch(apiBaseURL + '/spaces/' + spaceId, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then((response) => {
      store.dispatch({
        type: SPACE_DELETED,
        id: spaceId
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateSpace = (space) => {
  window.fetch(apiBaseURL + '/spaces/' + space.id, {
    method: 'PUT',
    body: JSON.stringify(space),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      store.dispatch({
        type: SPACE_UPDATED,
        id: response.id,
        name: response.name,
        memoryQuotaMB: response.memoryQuotaMB,
        diskQuotaMB: response.diskQuotaMB
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteApp = (app) => {
  window.fetch(apiBaseURL + '/spaces/' + app.spaceId + '/apps/' + app.id, {
    method: 'DELETE'
  })
    .then(checkStatus)
    .then((response) => {
      store.dispatch({
        type: APP_DELETED,
        id: app.id
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateApp = (app) => {
  window.fetch(apiBaseURL + '/spaces/' + app.spaceId + '/apps/' + app.id, {
    method: 'PUT',
    body: JSON.stringify(app),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      store.dispatch({
        type: APP_UPDATED,
        id: response.id,
        spaceId: response.spaceId,
        name: response.name,
        memoryAllocationMB: response.memoryAllocationMB,
        diskAllocationMB: response.diskAllocationMB
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const render = () => {
  resetSpaceList()

  let spacesList = document.createElement('ul')
  spacesList.setAttribute('id', 'spacesList')

  store.getState().spaces.forEach((space, index) => {
    let spaceComponent = new SpaceComponent(space, store, document, index, index)
      console.log(spaceComponent);
    spaceComponent.deleteSpaceHandler = deleteSpace
    spaceComponent.updateSpaceHandler = updateSpace
    spaceComponent.addAppHandler = addAppHandler

    let spaceApps = store.getState().apps.filter((a) => {
      return a.spaceId === space.id
    })

    spaceApps.forEach((app, i) => {
      let appComponent = new AppComponent(app, store, document, i)
      appComponent.deleteAppHandler = deleteApp
      appComponent.updateAppHandler = updateApp
      spaceComponent.appsList.appendChild(appComponent.root)
    })

    spacesList.appendChild(spaceComponent.root)
  })

  root.appendChild(spacesList)
}

const loadData = () => {
  window.fetch(apiBaseURL + '/spaces')
    .then(checkStatus)
    .then(parseJSON)
    .then(ingestSpaces)
    .then(render)
    .catch((error) => {
      console.log('request failed', error)
    })
}

window.onload = () => {

  initButtons()
  loadData()
}

store.subscribe(render)

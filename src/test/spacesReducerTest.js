/* eslint-env jasmine */
import spaces from '../main/spacesReducer'
import apps from '../main/appsReducer'
import { SPACE_CREATED, SPACE_UPDATED, SPACE_DELETED, APP_CREATED } from '../main/actionTypes'

describe('Spaces reducer', () => {
  it('initializes with no Spaces', () => {
    const s = spaces()
    expect(s.length).toEqual(0)
  })

  it('can add a Space to spaces', () => {
    const before = [
      {
        id: 1,
        spaceName: 'Space One',
        memory: 0,
        disk: 0
      }
    ]

    const after = spaces(before, {
      type: SPACE_CREATED,
      id: 2,
      spaceName: 'New Space',
      memory: 0,
      disk: 0
    })

    expect(after.length).toEqual(2)
  })

  it('can update a Space in spaces', () => {
    const before = [
      {
        id: 1,
        name: 'Space One',
        memoryQuotaMB: 0,
        diskQuotaMB: 0
      }
    ]

    const after = spaces(before, {
      type: SPACE_UPDATED,
      id: 1,
      name: 'Space Updated',
      memoryQuotaMB: 128,
      diskQuotaMB: 128
    })

    expect(after[0].name).toEqual('Space Updated')
    expect(after[0].memoryQuotaMB).toEqual(128)
    expect(after[0].diskQuotaMB).toEqual(128)
  })

  it('can delete a Space from spaces', () => {
    const before = [
      {
        id: 1,
        spaceName: 'Space One',
        memory: 0,
        disk: 0
      }
    ]

    const spacesResult = spaces(before, {
      type: SPACE_CREATED,
      id: 2,
      spaceName: 'Space To Delete',
      memory: 0,
      disk: 0
    })

    expect(spacesResult.length).toEqual(2)

    const spacesResult2 = spaces(spacesResult, {
      type: SPACE_DELETED,
      id: 2
    })

    expect(spacesResult2.length).toEqual(1)
  })

  it('can add an App to a Space', () => {
    let addAppAction = {
      type: APP_CREATED,
      id: 1,
      appName: 'New App',
      appMemory: 512,
      appDisk: 512,
      spaceId: 1
    }

    const before = []

    const after = apps(before, addAppAction)
    expect(after.length).toEqual(1)

    const afterAfterApps = apps(after, addAppAction)
    expect(afterAfterApps.length).toEqual(2)
  })
})

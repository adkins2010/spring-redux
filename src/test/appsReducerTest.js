/* eslint-env jasmine */
import apps from '../main/appsReducer'
import UUID from 'uuid/v4'
import { APP_CREATED, APP_UPDATED, APP_DELETED } from '../main/actionTypes'

describe('Apps reducer', () => {
  it('should initialize without any apps', () => {
    const afterApps = apps()
    expect(afterApps.length).toEqual(0)
  })

  it('can add an App to apps', () => {
    const beforeSpaceId = UUID()

    const beforeAppId = UUID()
    const beforeApps = [
      {
        appId: beforeAppId,
        appName: 'App One',
        appMemory: 512,
        appDisk: 512,
        spaceId: beforeSpaceId
      }
    ]

    const afterApps = apps(beforeApps, {
      type: APP_CREATED,
      appId: UUID(),
      appName: 'App Two',
      spaceId: beforeSpaceId
    })

    expect(afterApps.length).toEqual(2)
  })
})

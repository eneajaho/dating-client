import { Status } from '@core/models';

/**
 * @param entity Can be any object that also extends Status
 * @param callback The function that should be called to load the entity
 */
export function loadEntity(entity: any & Status, callback: Function): void {
  // if entity doesn't exist don't do anything
  if (!entity) {
    return;
  }
  // if entity isn't loading and isn't loaded and doesn't have any error, then load it
  if (!entity.loading && !entity.loaded && !entity.error) {
    callback();
  }
}

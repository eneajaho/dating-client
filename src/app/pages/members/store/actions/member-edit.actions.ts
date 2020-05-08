import { createAction, props } from "@ngrx/store";
import { User } from "@models/User";

export const editMember = createAction(
  '[Member Edit Page] Edit Member', props<{ user: User }>());

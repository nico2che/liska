import { combineReducers } from "redux";
import { combineStores } from "redux-zap";

import events from "./events.js";
import users from "./users.js";
import resources from "./resources.js";
import customFields from "./customFields.js";
import settings from "./settings.js";
import session from "./session.js";

export const { reducers, actions, initialState } = combineStores({
  events,
  resources,
  customFields,
  settings,
  session,
  users,
});

export default combineReducers(reducers);

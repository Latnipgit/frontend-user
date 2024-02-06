

import { createSelector } from 'reselect';

const subscriptionReducer = (state) => state.SubscriptionReducer;

export const subscriptionReducerSelector = createSelector(
  [subscriptionReducer],
  (subscribe) => subscribe.SubscriptionList
);

export const addSubscribeSelector = createSelector(
  [subscriptionReducer],
  (subscribe) => subscribe.addSubscribe
);



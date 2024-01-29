import { SELECT_COMPANY_OPNE } from "./selectCompany.action";

import { createAction } from "store/utils/reducer/reducer.utils";

export const setSelectCopenOpen = (boolean) => createAction(SELECT_COMPANY_OPNE, boolean);
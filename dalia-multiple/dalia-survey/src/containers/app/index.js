import { toggleLoader } from "../../utils/helper";

import "./style.css";

(function() {
  window.globalLoader = toggleLoader("loader"); // assigning loader to global level
  import(
    /* webpackChunkName: "surveyOptions" */
    /* webpackPreload: true */
    "../surveyOptions/index"
  ).then(module => {
    module.default();
  });
})();

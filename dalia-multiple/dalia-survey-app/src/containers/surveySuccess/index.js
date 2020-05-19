import model from "../../store";
import {
  assignEventListener,
  toggleElementVisibility
} from "../../utils/helper";

import "./style.css";

const successElement = document.getElementById("successScreenHolder");

function resetDataAndElements() {
  document.getElementById("surveyQuestionsList").innerHTML = "";
  model.resetState();
}

function onRestartSurvey() {
  toggleElementVisibility("surveyOptionsHolder", "show");
  toggleElementVisibility("successScreenHolder", "hide");
  resetDataAndElements();
}

function initiateSuccessScreenToRender() {
  toggleElementVisibility("successScreenHolder", "show");
  assignEventListener(successElement, "click", onRestartSurvey);
}

export default initiateSuccessScreenToRender;

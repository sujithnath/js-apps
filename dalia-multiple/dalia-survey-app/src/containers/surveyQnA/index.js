import model from "../../store";
import constructInputOptions from "../../components/inputRadio";
import {
  assignEventListener,
  toggleElementVisibility,
  enableDisableButton
} from "../../utils/helper";

import { API_METHODS } from "../../utils/constants";
import surveyApi from "../../services";

import "./style.css";

const surveyQuestionActionsHolder = document.getElementById(
  "surveyActionHolders"
);
const restart = document.getElementById("restart");
const { POST } = API_METHODS;

const surveyQuestionsList = document.getElementById("surveyQuestionsList");

function setCurrentActiveQuestionIndex(currentActiveQuestionIndex) {
  model.setState({
    otherOptions: {
      currentActiveQuestionIndex
    }
  });
}

function renderPrevsSurveyQuestionIfExist(questionId) {
  const { selectedQuestionList } = model.getState();
  if (selectedQuestionList.indexOf(questionId) !== -1) {
    toggleElementVisibility(questionId, "show");
    return false;
  }
  return true;
}

function onClickSurveyAnswerHandler(event) {
  const { otherOptions, surveyQuestions } = model.getState();
  const { currentActiveQuestionIndex } = otherOptions;

  if (event.target && event.target.value) {
    let newOptions = {};
    newOptions[event.target.name] = event.target.id;
    model.setState({
      currentOptions: newOptions
    });
    if (surveyQuestions.length !== currentActiveQuestionIndex + 1) {
      enableDisableButton("surveyActionHolders", "enable", "block-next");
    }

    if (surveyQuestions.length === currentActiveQuestionIndex + 1) {
      enableDisableButton("surveyActionHolders", "enable", "block-submit");
    }
  }
}

function renderTitle(value, surveyQuestionsLength) {
  const { currentTitle, currentTagLine } = model.getState();
  let fragment = document.createDocumentFragment();
  const mainTitle = document.getElementById("mainTitle");
  let element = document.createElement("span");
  element.className = "count";
  element.innerText = `(${value}/${surveyQuestionsLength})`;
  fragment.appendChild(element);
  mainTitle.innerText = `${currentTitle} : ${currentTagLine} `;
  mainTitle.appendChild(fragment);
}

async function submitSurvey() {
  const { currentSurveyId, currentOptions } = model.getState();
  globalLoader(true);
  const { status } = await surveyApi(
    POST,
    `surveys/${currentSurveyId}/completions`,
    currentOptions
  );
  globalLoader(false);
  if (status === "ok") {
    toggleElementVisibility("surveyQuestionsHolder", "hide");
    document.getElementById("surveyActionHolders").classList =
      "block-next hide-submit block-prev text-right";
    import(
      /* webpackChunkName: "surveySuccess" */
      /* webpackPrefetch: true */
      "../surveySuccess/index"
    ).then(module => {
      module.default();
    });
  }
}

function nextPrevsActionHandlers(event) {
  let questionIndex;
  const {
    otherOptions,
    surveyQuestions,
    selectedQuestionList,
    currentOptions
  } = model.getState();

  const { currentActiveQuestionIndex } = otherOptions;
  const elemId = selectedQuestionList[currentActiveQuestionIndex];

  if (event && event.target.id === "next") {
    questionIndex = currentActiveQuestionIndex + 1;
  } else if (event && event.target.id === "prev") {
    questionIndex = currentActiveQuestionIndex - 1;
  } else if (event && event.target.id === "submit") {
    enableDisableButton("surveyActionHolders", "disable", "block-prev");
    enableDisableButton("surveyActionHolders", "disable", "block-next");
    submitSurvey();
    return;
  } else {
    return;
  }

  setCurrentActiveQuestionIndex(questionIndex);

  const propertyFound = currentOptions.hasOwnProperty(
    selectedQuestionList[questionIndex]
  );

  if (!questionIndex) {
    enableDisableButton("surveyActionHolders", "disable", "block-prev");
  } else {
    enableDisableButton("surveyActionHolders", "enable", "block-prev");
  }

  if (!propertyFound || surveyQuestions.length == questionIndex + 1) {
    enableDisableButton("surveyActionHolders", "disable", "block-next");
  } else {
    enableDisableButton("surveyActionHolders", "enable", "block-next");
  }

  if (surveyQuestions.length == questionIndex + 1) {
    enableDisableButton("surveyActionHolders", "enable", "hide-submit");
  }

  toggleElementVisibility(elemId, "hide");

  //Show the previous Question which is hidden is DOM
  const questionToRender = surveyQuestions[questionIndex];
  renderTitle(questionIndex + 1, surveyQuestions.length);
  renderSurveyQuestionToDom(questionToRender);
}

function renderSurveyQuestionToDom(question) {
  const { id, title, options } = question;

  if (!renderPrevsSurveyQuestionIfExist(id)) {
    return;
  }

  let fragment = document.createDocumentFragment();
  const radioOptions = constructInputOptions(options, id);
  let element = document.createElement("div");
  let titleHolder = document.createElement("h5");
  titleHolder.className = "mini-title";
  element.id = id;
  titleHolder.innerText = title;
  element.appendChild(titleHolder);
  element.appendChild(radioOptions);

  fragment.appendChild(element);
  document.getElementById("surveyQuestionsList").appendChild(fragment);

  // Saving selected Option
  model.setState({
    selectedQuestionList: [id]
  });
}

function initiateSurveyQuestionsToRender() {
  const { surveyQuestions } = model.getState();

  if (surveyQuestions && surveyQuestions.length) {
    toggleElementVisibility("surveyQuestionsHolder", "show");

    assignEventListener(
      surveyQuestionsList,
      "click",
      onClickSurveyAnswerHandler
    );

    assignEventListener(
      surveyQuestionActionsHolder,
      "click",
      nextPrevsActionHandlers
    );

    // assignEventListener(restart, "click", resetDataAndElements);

    renderTitle(1, surveyQuestions.length);
    renderSurveyQuestionToDom(surveyQuestions[0]);
  }
}

function resetDataAndElements() {
  // implemenet later
  // document.getElementById("surveyQuestionsHolder").innerHTML = "";
  // toggleElementVisibility("surveyOptionsHolder", "show");
  // model.resetState();
}

export default initiateSurveyQuestionsToRender;

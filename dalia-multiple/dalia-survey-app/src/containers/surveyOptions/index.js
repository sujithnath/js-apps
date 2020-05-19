import "./style.css";

import {
  assignEventListener,
  toggleElementVisibility
} from "../../utils/helper";
import model from "../../store";

import surveyApi from "../../services";
import { API_METHODS, ELEM } from "../../utils/constants";

const surveyOptionElem = document.getElementById("surveyOptions");
const { GET } = API_METHODS;
const { LI } = ELEM;

async function surveyOptionOnClickHandler(event) {
  // Gets Questions for the particular Option selected and renders Questions for the Option
  if (event.target.tagName === LI || event.target.parentNode.tagName === LI) {
    const parentTarget =
      event.target.tagName === LI ? event.target : event.target.parentNode;

    if (!parentTarget || !parentTarget.id) {
      return;
    }

    toggleElementVisibility("surveyOptionsHolder", "hide");
    globalLoader(true);
    const { survey } = await surveyApi(GET, `surveys/${parentTarget.id}`);
    globalLoader(false);
    model.setState({
      surveyQuestions: survey.questions || [],
      currentTitle: survey.title,
      currentTagLine: survey.tagline,
      currentSurveyId: parentTarget.id
    });

    import(
      /* webpackChunkName: "surveyQnA" */
      /* webpackPrefetch: true */
      "../surveyQnA/index"
    ).then(module => {
      module.default();
    });
  }
}

function renderSurveyOptionsToView(surveyList) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < surveyList.length; i++) {
    const { tagline, title, id } = surveyList[i];

    let listElement = document.createElement("li");
    let titleHolder = document.createElement("h3");
    let taglineHolder = document.createElement("p");

    listElement.id = id;
    titleHolder.innerText = title;
    taglineHolder.innerText = tagline;

    listElement.className = "list-item";
    titleHolder.className = "list-item__heading";
    taglineHolder.className = "list-item__desc";

    listElement.appendChild(titleHolder);
    listElement.appendChild(taglineHolder);
    fragment.appendChild(listElement);
  }

  surveyOptionElem.appendChild(fragment);
}

async function initiateSurveyOptionsToRender() {
  globalLoader(true);
  const { surveys } = await surveyApi(GET, "surveys");
  renderSurveyOptionsToView(surveys);
  globalLoader(false);
  // Assigning event listeners to surveyList holder (UL)
  assignEventListener(surveyOptionElem, "click", surveyOptionOnClickHandler);
}

export default initiateSurveyOptionsToRender;

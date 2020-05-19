import deepmerge from "deepmerge";

const defaultModelData = {
  currentOptions: {},
  currentSurveyId: null,
  selectedQuestionList: [],
  otherOptions: {
    currentActiveQuestionIndex: 0
  },
  surveyQuestions: []
};

function SingletonStoreInstance() {
  let storeInstance;
  const state = Object.freeze(defaultModelData);

  function createStoreInstance() {
    return new Object(state);
  }

  function getStore() {
    return storeInstance ? storeInstance : createStoreInstance();
  }

  return getStore();
}

function appModel() {
  let state = SingletonStoreInstance();

  function getState() {
    return state;
  }

  function setState(newState) {
    state = deepmerge(state, newState);
  }

  function resetState() {
    state = deepmerge({}, defaultModelData);
  }

  return {
    getState,
    setState,
    resetState
  };
}

export default appModel();

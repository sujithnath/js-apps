export function assignEventListener(eventBinder, eventType, callbackFn) {
  eventBinder.addEventListener(eventType, e => {
    callbackFn(e);
  });
}

export function toggleElementVisibility(elemId, type, extraClassNames = null) {
  const element = document.getElementById(elemId);
  if (type === "hide") {
    element.classList.add("hide");
    element.classList.remove("show");
  } else if (type === "show") {
    element.classList.remove("hide");
    element.classList.add("show", extraClassNames);
  }
}

export function enableDisableButton(elemId, type, extraClassNames = null) {
  if (!extraClassNames) {
    return;
  }
  const element = document.getElementById(elemId);
  if (type === "enable") {
    element.classList.remove(extraClassNames);
  } else if (type === "disable") {
    element.classList.add(extraClassNames);
  }
}

export function toggleLoader(id) {
  // remove garbage collection later
  let elem = id;

  return function(status = false) {
    const className = status ? "show" : "hide";
    document.getElementById(elem).classList.value = className;
  };
}

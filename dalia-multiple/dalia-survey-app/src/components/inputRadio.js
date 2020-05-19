function constructInputOptions(options, name) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < options.length; i++) {
    const labelName = options[i];
    const inputLabelElement = document.createElement("label");
    const inputElement = document.createElement("input");
    const labelNameHolder = document.createElement("span");

    inputElement.name = name;
    inputElement.id = labelName;
    inputElement.type = "radio";
    inputLabelElement.for = name;
    inputLabelElement.className = "item-label";
    labelNameHolder.innerText = labelName;

    inputLabelElement.appendChild(inputElement);
    inputLabelElement.appendChild(labelNameHolder);
    fragment.appendChild(inputLabelElement);
  }
  return fragment;
}

export default constructInputOptions;

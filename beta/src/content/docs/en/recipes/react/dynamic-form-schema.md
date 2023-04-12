---
title: Dynamic form schema
redirectFrom:
  - /docs/recipes/react/dynamic-form-schema
  - /recipes/react/dynamic-form-schema
---

[Try it](https://share.effector.dev/fow5fA0A)

```js
import { createEvent, createEffect, createStore, createApi, sample } from "effector";
import { useList, useUnit } from "effector-react";

const submitForm = createEvent();
const addMessage = createEvent();
const changeFieldType = createEvent();

const showTooltipFx = createEffect(() => new Promise((rs) => setTimeout(rs, 1500)));

const saveFormFx = createEffect((data) => {
  localStorage.setItem("form_state/2", JSON.stringify(data, null, 2));
});
const loadFormFx = createEffect(() => {
  return JSON.parse(localStorage.getItem("form_state/2"));
});

const $fieldType = createStore("text");
const $message = createStore("done");
const $mainForm = createStore({});
const $types = createStore({
  username: "text",
  email: "text",
  password: "text",
});

const $fields = $types.map((state) => Object.keys(state));

$message.on(addMessage, (_, message) => message);

$mainForm.on(loadFormFx.doneData, (form, result) => {
  let changed = false;

  form = { ...form };
  for (const key in result) {
    const { value } = result[key];
    if (value == null) continue;
    if (form[key] === value) continue;
    changed = true;
    form[key] = value;
  }
  if (!changed) return;

  return form;
});

const mainFormApi = createApi($mainForm, {
  upsertField(form, name) {
    if (name in form) return;

    return { ...form, [name]: "" };
  },
  changeField(form, [name, value]) {
    if (form[name] === value) return;

    return { ...form, [name]: value };
  },
  addField(form, [name, value = ""]) {
    if (form[name] === value) return;

    return { ...form, [name]: value };
  },
  deleteField(form, name) {
    if (!(name in form)) return;
    form = { ...form };
    delete form[name];

    return form;
  },
});

$types.on(mainFormApi.addField, (state, [name, value, type]) => {
  if (state[name] === type) return;

  return { ...state, [name]: value };
});
$types.on(mainFormApi.deleteField, (state, name) => {
  if (!(name in state)) return;
  state = { ...state };
  delete state[name];

  return state;
});
$types.on(loadFormFx.doneData, (state, result) => {
  let changed = false;

  state = { ...state };
  for (const key in result) {
    const { type } = result[key];

    if (type == null) continue;
    if (state[key] === type) continue;
    changed = true;
    state[key] = type;
  }
  if (!changed) return;

  return state;
});

const changeFieldInput = mainFormApi.changeField.prepend((e) => [
  e.currentTarget.name,
  e.currentTarget.type === "checkbox" ? e.currentTarget.checked : e.currentTarget.value,
]);

const submitField = mainFormApi.addField.prepend((e) => [
  e.currentTarget.fieldname.value,
  e.currentTarget.fieldtype.value === "checkbox"
    ? e.currentTarget.fieldvalue.checked
    : e.currentTarget.fieldvalue.value,
  e.currentTarget.fieldtype.value,
]);

const submitRemoveField = mainFormApi.deleteField.prepend((e) => e.currentTarget.field.value);

$fieldType.on(changeFieldType, (_, e) => e.currentTarget.value);
$fieldType.reset(submitField);

submitForm.watch((e) => {
  e.preventDefault();
});
submitField.watch((e) => {
  e.preventDefault();
  e.currentTarget.reset();
});
submitRemoveField.watch((e) => {
  e.preventDefault();
});

sample({
  clock: [submitForm, submitField, submitRemoveField],
  source: { values: $mainForm, types: $types },
  target: saveFormFx,
  fn({ values, types }) {
    const form = {};

    for (const [key, value] of Object.entries(values)) {
      form[key] = {
        value,
        type: types[key],
      };
    }

    return form;
  },
});

sample({
  clock: addMessage,
  target: showTooltipFx,
});
sample({
  clock: submitField,
  fn: () => "added",
  target: addMessage,
});
sample({
  clock: submitRemoveField,
  fn: () => "removed",
  target: addMessage,
});
sample({
  clock: submitForm,
  fn: () => "saved",
  target: addMessage,
});

loadFormFx.finally.watch(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

function useFormField(name) {
  const type = useStoreMap({
    store: $types,
    keys: [name],
    fn(state, [field]) {
      if (field in state) return state[field];

      return "text";
    },
  });
  const value = useStoreMap({
    store: $mainForm,
    keys: [name],
    fn(state, [field]) {
      if (field in state) return state[field];

      return "";
    },
  });
  mainFormApi.upsertField(name);

  return [value, type];
}

function Form() {
  const pending = useUnit(saveFormFx.pending);

  return (
    <form onSubmit={submitForm} data-form autocomplete="off">
      <header>
        <h4>Form</h4>
      </header>
      {useList($fields, (name) => (
        <InputField name={name} />
      ))}

      <input type="submit" value="save form" disabled={pending} />
    </form>
  );
}

function InputField({ name }) {
  const [value, type] = useFormField(name);
  let input = null;

  switch (type) {
    case "checkbox":
      input = (
        <input
          id={name}
          name={name}
          value={name}
          checked={value}
          onChange={changeFieldInput}
          type="checkbox"
        />
      );
      break;
    case "text":
    default:
      input = <input id={name} name={name} value={value} onChange={changeFieldInput} type="text" />;
  }

  return (
    <>
      <label htmlFor={name} style={{ display: "block" }}>
        <strong>{name}</strong>
      </label>
      {input}
    </>
  );
}

function FieldForm() {
  const currentFieldType = useUnit($fieldType);
  const fieldValue =
    currentFieldType === "checkbox" ? (
      <input id="fieldvalue" name="fieldvalue" type="checkbox" />
    ) : (
      <input id="fieldvalue" name="fieldvalue" type="text" defaultValue="" />
    );

  return (
    <form onSubmit={submitField} autocomplete="off" data-form>
      <header>
        <h4>Insert new field</h4>
      </header>
      <label htmlFor="fieldname">
        <strong>name</strong>
      </label>
      <input id="fieldname" name="fieldname" type="text" required defaultValue="" />
      <label htmlFor="fieldvalue">
        <strong>value</strong>
      </label>
      {fieldValue}
      <label htmlFor="fieldtype">
        <strong>type</strong>
      </label>
      <select id="fieldtype" name="fieldtype" onChange={changeFieldType}>
        <option value="text">text</option>
        <option value="checkbox">checkbox</option>
      </select>
      <input type="submit" value="insert" />
    </form>
  );
}

function RemoveFieldForm() {
  return (
    <form onSubmit={submitRemoveField} data-form>
      <header>
        <h4>Remove field</h4>
      </header>
      <label htmlFor="field">
        <strong>name</strong>
      </label>
      <select id="field" name="field" required>
        {useList($fields, (name) => (
          <option value={name}>{name}</option>
        ))}
      </select>
      <input type="submit" value="remove" />
    </form>
  );
}

const Tooltip = () => {
  const [visible, text] = useUnit([showTooltipFx.pending, $message]);

  return <span data-tooltip={text} data-visible={visible} />;
};

const App = () => (
  <>
    <Tooltip />
    <div id="app">
      <Form />
      <FieldForm />
      <RemoveFieldForm />
    </div>
  </>
);

await loadFormFx();

css`
  [data-tooltip]:before {
    display: block;
    background: white;
    width: min-content;
    content: attr(data-tooltip);
    position: sticky;
    top: 0;
    left: 50%;
    color: darkgreen;
    font-family: sans-serif;
    font-weight: 800;
    font-size: 20px;
    padding: 5px 5px;
    transition: transform 100ms ease-out;
  }

  [data-tooltip][data-visible="true"]:before {
    transform: translate(0px, 0.5em);
  }

  [data-tooltip][data-visible="false"]:before {
    transform: translate(0px, -2em);
  }

  [data-form] {
    display: contents;
  }

  [data-form] > header {
    grid-column: 1 / span 2;
  }

  [data-form] > header > h4 {
    margin-block-end: 0;
  }

  [data-form] label {
    grid-column: 1;
    justify-self: end;
  }

  [data-form] input:not([type="submit"]),
  [data-form] select {
    grid-column: 2;
  }

  [data-form] input[type="submit"] {
    grid-column: 2;
    justify-self: end;
    width: fit-content;
  }

  #app {
    width: min-content;
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 8px;
    grid-template-columns: repeat(2, 3fr);
  }
`;

function css(tags, ...attrs) {
  const value = style(tags, ...attrs);
  const node = document.createElement("style");
  node.id = "insertedStyle";
  node.appendChild(document.createTextNode(value));
  const sheet = document.getElementById("insertedStyle");

  if (sheet) {
    sheet.disabled = true;
    sheet.parentNode.removeChild(sheet);
  }
  document.head.appendChild(node);

  function style(tags, ...attrs) {
    if (tags.length === 0) return "";
    let result = " " + tags[0];

    for (let i = 0; i < attrs.length; i++) {
      result += attrs[i];
      result += tags[i + 1];
    }

    return result;
  }
}
```

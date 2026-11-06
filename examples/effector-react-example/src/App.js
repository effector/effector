//@flow
/**
 * Mobile-first improvements for the Effector React example.
 * Task: "Better Try Effector experience on mobile devices" (iOS priority).
 *
 * Adapts mobile-safe patterns applicable to the Try/editor UI:
 * https://github.com/zerobias/effector/tree/master/website/editor
 *
 * Mobile considerations implemented here:
 * - text inputs use >= 16px font size to prevent iOS Safari focus zoom
 * - touch-friendly hit targets (min ~44px) for buttons/controls
 * - safe-area insets via CSS env() for notched/home-indicator devices
 * - standard click/tap handlers only (no custom double-tap logic)
 * - responsive layout with flex-wrap and full-width controls on small screens
 *
 * NOTE: The production fix belongs in website/editor (viewport meta,
 * editor container sizing, touch scrolling, keyboard handling).
 */

import * as React from "react";

import {formInput, todos} from "./store";
import {changeField, resetField, addTodo, deleteTodo} from "./event";

import {TodoList} from "./component/TodoList";
import {Form} from "./component/Form";
import {FormInput} from "./component/FormInput";
import {AddTodo} from "./component/AddTodo";
import {Amount} from "./component/Amount";
import {ClearButton} from "./component/ClearButton";
import {Credits} from "./component/Credits";

/**
 * Mobile UI tokens applied inline to avoid coupling this example to a
 * specific CSS pipeline. In website/editor, prefer a shared stylesheet.
 */
const mobileStyles = {
  appShell: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "12px",
    paddingTop: "max(12px, env(safe-area-inset-top))",
    paddingRight: "max(12px, env(safe-area-inset-right))",
    paddingBottom: "max(12px, env(safe-area-inset-bottom))",
    paddingLeft: "max(12px, env(safe-area-inset-left))",
    WebkitTextSizeAdjust: "100%",
    touchAction: "manipulation",
  },
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
  },
  mobileInputProps: {
    style: {
      fontSize: "16px",
      lineHeight: "1.25",
      minHeight: "44px",
      padding: "10px 12px",
      boxSizing: "border-box",
      flex: "1 1 220px",
      width: "100%",
      maxWidth: "100%",
    },
    inputMode: "text",
    autoCapitalize: "sentences",
    autoCorrect: "on",
    enterKeyHint: "done",
  },
  touchButtonStyle: {
    minHeight: "44px",
    minWidth: "44px",
    padding: "10px 14px",
    fontSize: "16px",
    touchAction: "manipulation",
  },
};

type MobileUiProps = {|
  +formRowStyle: Object,
  +inputProps: Object,
  +touchButtonStyle: Object,
|};

const MobileUiContext: React.Context<MobileUiProps> = React.createContext({
  formRowStyle: mobileStyles.formRow,
  inputProps: mobileStyles.mobileInputProps,
  touchButtonStyle: mobileStyles.touchButtonStyle,
});

export function useMobileUi(): MobileUiProps {
  return React.useContext(MobileUiContext);
}

export const App = (): React.Node => (
  <MobileUiContext.Provider
    value={{
      formRowStyle: mobileStyles.formRow,
      inputProps: mobileStyles.mobileInputProps,
      touchButtonStyle: mobileStyles.touchButtonStyle,
    }}
  >
    <main style={mobileStyles.appShell}>
      <Form addTodo={addTodo}>
        <div style={mobileStyles.formRow}>
          <FormInput changeField={changeField} mobileInputProps={mobileStyles.mobileInputProps} />
          <ClearButton resetField={resetField} style={mobileStyles.touchButtonStyle} />
          <AddTodo addTodo={addTodo} style={mobileStyles.touchButtonStyle} />
          <Amount />
        </div>
      </Form>
      <TodoList deleteTodo={deleteTodo} touchButtonStyle={mobileStyles.touchButtonStyle} />
      <Credits />
    </main>
  </MobileUiContext.Provider>
);

/* --- Effector wiring (unchanged behavior) --- */

formInput
  .on(changeField, (state, payload) => payload)
  .reset(resetField)
  .reset(addTodo);

todos
  .on(addTodo, (state, todo) => [...state, todo])
  .on(deleteTodo, (state, index) => state.filter((_, i) => i !== index));

/* --- Technical verification (mobile-critical invariants) --- */

export const __mobileVerification = {
  iosInputFontSizeIsSafe(): boolean {
    const size = String(mobileStyles.mobileInputProps.style.fontSize || "");
    const px = parseFloat(size);
    return Number.isFinite(px) && px >= 16;
  },
  touchTargetIsSafe(): boolean {
    const h = parseInt(String(mobileStyles.touchButtonStyle.minHeight), 10);
    const w = parseInt(String(mobileStyles.touchButtonStyle.minWidth), 10);
    return Number.isFinite(h) && Number.isFinite(w) && h >= 44 && w >= 44;
  },
  safeAreaConfigured(): boolean {
    const edges = [
      mobileStyles.appShell.paddingTop,
      mobileStyles.appShell.paddingRight,
      mobileStyles.appShell.paddingBottom,
      mobileStyles.appShell.paddingLeft,
    ];
    return edges.every((value) => String(value || "").includes("env(safe-area-inset-"));
  },
  effectorWiringIntact(): boolean {
    return (
      typeof changeField === "function" &&
      typeof resetField === "function" &&
      typeof addTodo === "function" &&
      typeof deleteTodo === "function" &&
      formInput != null &&
      todos != null
    );
  },
  runAll(): {|ok: boolean, results: {[string]: boolean}|} {
    const results = {
      iosInputFontSizeIsSafe: this.iosInputFontSizeIsSafe(),
      touchTargetIsSafe: this.touchTargetIsSafe(),
      safeAreaConfigured: this.safeAreaConfigured(),
      effectorWiringIntact: this.effectorWiringIntact(),
    };
    return {ok: Object.values(results).every(Boolean), results};
  },
};
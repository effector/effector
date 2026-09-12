import { Sandpack } from "@codesandbox/sandpack-react";

const customSetup = {
  dependencies: {
    effector: "latest",
  },
};

export default function LiveDemo({ demoFile, demoHtml, layout = "console", editorHeight = 300 }) {
  const files = {
    "/index.js": demoFile,
  };

  if (demoHtml) {
    files["/index.html"] = demoHtml;
  }

  return (
    <Sandpack
      template="vanilla"
      theme="auto"
      files={files}
      customSetup={customSetup}
      options={{ layout, editorHeight, editorWidthPercentage: 55 }}
    />
  );
}

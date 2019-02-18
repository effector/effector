import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("version");

export const VersionLink = ({ version }) => {
  const match = version.match(/^pr-(\d+)$/);
  let href;
  if (match) {
    href = `pull/${match[1]}`;
  } else {
    href = `releases/tag/${version}`;
  }
  return ReactDOM.createPortal(
    <a
      href={`https://github.com/zerobias/effector/${href}`}
      target="_blank"
      rel="noopener"
    >
      {match ? `PR #${match[1]}` : `v${version}`}
    </a>,
    root
  );
}
function replaceTargetsWithCodeBlockComponent(selector: string) {
  const targets = document.querySelectorAll(selector);

  targets.forEach((target) => {
    const component = document.createElement("code-block");

    component.appendChild(target.cloneNode(true));

    target.replaceWith(component);
  });
}

export function initializeCodeBlock(selector: string) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      replaceTargetsWithCodeBlockComponent(selector);
    });
  } else {
    replaceTargetsWithCodeBlockComponent(selector);
  }
}

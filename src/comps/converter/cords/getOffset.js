function getOffset(element) {
  const bound = element.getBoundingClientRect();
  const html = document.documentElement;

  return {
    top: bound.top + window.pageYOffset - html.clientTop,
    left: bound.left + window.pageXOffset - html.clientLeft,
  };
}

export default getOffset;

import React from 'react';

const PLACEHOLDER_REGEX = new RegExp('[{}]', 'g');

export function formatString(string, placeholders = {}) {
  Object.keys(placeholders).forEach(placeholderKey => {
    const placeholderValue = placeholders[placeholderKey];

    if (placeholderValue || placeholderValue === 0) {
      if (!React.isValidElement(placeholderValue)) {
        string = string.replace(new RegExp(`\{${placeholderKey}\}`, 'g'),
          () => placeholders[placeholderKey]);
      }
    }
  });

  return string;
}

export function formatReactString(string, placeholders = {}) {
  return (
    <span className="localized-string">
      {string
        .split(new RegExp('(\{.+?\})', 'g'))
        .filter(node => !!node)
        .map((node, index) => {
          const placeholderKey = node.replace(PLACEHOLDER_REGEX, '');

          let placeholderValue = placeholders[placeholderKey];
          if (typeof placeholderValue === 'function') {
            placeholderValue = placeholderValue(index);
          }

          if (placeholderValue && React.isValidElement(placeholderValue)) {
            return placeholderValue;
          }

          return node;
        })}
    </span>
  );
}

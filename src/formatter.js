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
    <span>
      {string
        .split(new RegExp('(\{.+?\})', 'g'))
        .filter(node => !!node)
        .map((node, index) => {
          const placeholderKey = node.replace(PLACEHOLDER_REGEX, '');
          const placeholderValue = placeholders[placeholderKey];

          if (placeholderValue && React.isValidElement(placeholderValue)) {
            return placeholderValue;
          }

          return node;
        })}
    </span>
  );
}

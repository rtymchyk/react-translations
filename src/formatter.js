import React from 'react'

const PLACEHOLDER_REGEX = new RegExp('[{}]', 'g')

export function formatString (string, placeholders = {}) {
  let builtString = string

  Object.keys(placeholders).forEach((placeholderKey) => {
    const placeholderValue = placeholders[placeholderKey]

    if (placeholderValue || placeholderValue === 0) {
      if (!React.isValidElement(placeholderValue)) {
        builtString = builtString.replace(new RegExp(`{${placeholderKey}}`, 'g'),
          () => placeholders[placeholderKey])
      }
    }
  })

  return builtString
}

export function formatReactString (string, className, placeholders = {}) {
  return (
    <span className={`localized-string ${className || ''}`}>
      {string
        .split(new RegExp('({.+?})', 'g'))
        .filter(node => !!node)
        .map((node, index) => {
          const placeholderKey = node.replace(PLACEHOLDER_REGEX, '')

          let placeholderValue = placeholders[placeholderKey]
          if (typeof placeholderValue === 'function') {
            placeholderValue = placeholderValue(index)
          }

          if (placeholderValue && React.isValidElement(placeholderValue)) {
            return React.cloneElement(placeholderValue, { key: index })
          }

          return node
        })}
    </span>
  )
}

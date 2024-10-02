/**
 * Detect and update global theme.
 * @namespace
 */
export const Theme = {}

/** @private **/
const storageKey = 'blazeui-theme'
/** @private **/
const inWindow = name => name in window

const validTheme = value => ['dark', 'light'].includes(value) ? value : null

/**
 * Returns the current system theme (light|dark) or null
 * if none detected.
 * Uses `window.matchMedia`
 * @return {'dark'|'light'|null}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
Theme.system = () => {
  if (!inWindow('matchMedia')) {
    return null
  }

  const darkMode = window.matchMedia("(prefers-color-scheme: dark)")
  if (darkMode?.matches) {
    return 'dark'
  }

  const liteMode = window.matchMedia("(prefers-color-scheme: light)")
  return liteMode?.matches
    ? 'light'
    : null
}

/**
 * Returns the current theme value
 * from the `localStorage` or null if not retrievable
 * @return {string|null}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
Theme.storage = () => {
  if (!inWindow('localStorage')) {
    return null
  }
  const theme = window.localStorage.getItem(storageKey)
  return validTheme(theme)
}

/**
 * Updates the global theme to the current document
 * and saves the decision in `localStorage`, if supported by the browser
 *
 * @param value {'light'|'dark'} the new theme to use
 * @throws {Error} if value is not supported
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
Theme.update = value => {
  if (!validTheme(value)) {
    throw new Error(`Unsupported theme: "${value}"`)
  }
  const old = value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.remove(old)
  document.documentElement.classList.add(value)
  document.documentElement.style.colorScheme = value
  if (inWindow('localStorage')) {
    window.localStorage.setItem(storageKey, value)
  }
}

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
/** @type { import('@storybook/react').Preview } */
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const moveTabToLeftmostAndFocusNext = async () => {
  const tabs = await chrome.tabs.query({ lastFocusedWindow: true });

  if (tabs.length <= 1) {
    return;
  }

  const activeIndex = tabs.findIndex((t) => t.active);
  const activeTab = tabs[activeIndex];
  const nextTab = tabs[activeIndex + 1] || tabs[activeIndex - 1];

  await chrome.tabs.highlight({ tabs: nextTab.index });

  if (activeIndex > 0) {
    await chrome.tabs.move(activeTab.id, { index: 0 });
  }
};

chrome.commands.onCommand.addListener((command) => {
  if (command == "move-current-tab-to-leftmost") {
    moveTabToLeftmostAndFocusNext();
  }
});

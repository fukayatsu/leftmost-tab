const moveTabToLeftmostAndFocusNext = async () => {
  const tabs = await chrome.tabs.query({ lastFocusedWindow: true });
  const activeIndex = tabs.findIndex((t) => t.active);

  if (tabs.length <= 1 || activeIndex <= 0) {
    console.log("No need to move tab.");
    return;
  }

  const activeTab = tabs[activeIndex];
  const nextTab = tabs[activeIndex + 1] || tabs[activeIndex - 1];

  await chrome.tabs.highlight({ tabs: nextTab.index });
  await chrome.tabs.move(activeTab.id, { index: 0 });
};

chrome.commands.onCommand.addListener((command) => {
  if (command == "move-current-tab-to-leftmost") {
    moveTabToLeftmostAndFocusNext();
  }
});

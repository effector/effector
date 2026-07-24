type SwitchTabParams = {
  activeTabIndex: number;
  shoudTabFocused?: boolean;
};

export class Tabs extends HTMLElement {
  static syncedTabs = new Map<string, Tabs[]>();

  tabs: Array<HTMLButtonElement> = [];
  tabContents: Array<HTMLDivElement> = [];
  syncId: string | undefined;

  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.tabs = [...this.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    this.tabContents = [...this.querySelectorAll<HTMLDivElement>('[role="tabpanel"]')];
    this.syncId = this.dataset.syncId;

    if (this.syncId) {
      const syncedTabs = Tabs.syncedTabs.get(this.syncId) ?? [];
      syncedTabs.push(this);
      Tabs.syncedTabs.set(this.syncId, syncedTabs);
    }

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleClick);
      tab.addEventListener("keydown", this.handleKeyDown);
    });
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const pressedButton = e.key;
    const currentActiveTab = e.currentTarget;

    const keyboardDirections = {
      ArrowLeft: -1,
      ArrowRight: 1,
    };

    if (!(pressedButton in keyboardDirections)) {
      return;
    }

    const direction = keyboardDirections[pressedButton as keyof typeof keyboardDirections];

    const index = this.tabs.indexOf(currentActiveTab as HTMLButtonElement);
    let newActiveTabIndex = index + direction;

    if (newActiveTabIndex < 0) {
      newActiveTabIndex = this.tabs.length - 1;
    } else if (newActiveTabIndex > this.tabs.length - 1) {
      newActiveTabIndex = 0;
    }

    const nwActiveTabLabel = this.getTabLabel(this.tabs[newActiveTabIndex])!;

    this.switchTab({ activeTabIndex: newActiveTabIndex });

    if (!this.syncId) {
      return;
    }

    this.syncTabs(nwActiveTabLabel, this.syncId);
  };

  handleClick = (e: MouseEvent) => {
    const currentElement = e.currentTarget!;
    const currentActiveTab = this.querySelector('[aria-selected="true"]')!;

    if (currentElement === currentActiveTab) {
      return;
    }

    const label = this.getTabLabel(e.currentTarget as HTMLButtonElement)!;

    const index = this.tabs.findIndex((tab) => {
      const tabLabel = this.getTabLabel(tab);

      return label === tabLabel;
    });

    this.switchTab({
      activeTabIndex: index,
    });

    if (!this.syncId) {
      return;
    }

    this.syncTabs(label, this.syncId);
  };

  switchTab = ({ activeTabIndex, shoudTabFocused = true }: SwitchTabParams) => {
    this.tabs.forEach((tab) => {
      tab.setAttribute("aria-selected", "false");
      tab.tabIndex = -1;
    });

    this.tabContents.forEach((content) => {
      content.setAttribute("hidden", "true");
    });

    const newActiveTab = this.tabs[activeTabIndex];
    newActiveTab.setAttribute("aria-selected", "true");
    newActiveTab.tabIndex = 0;

    if (shoudTabFocused) {
      newActiveTab.focus();
    }

    const newTabContent = this.tabContents[activeTabIndex];
    newTabContent.hidden = false;
  };

  syncTabs = (label: string, syncId: string) => {
    const syncedTabs = Tabs.syncedTabs.get(syncId);

    syncedTabs?.forEach((tabContainer) => {
      const index = tabContainer.tabs.findIndex((tab) => {
        const tabLabel = this.getTabLabel(tab);

        return label === tabLabel;
      });

      if (tabContainer.tabs[index]) {
        tabContainer.switchTab({ activeTabIndex: index, shoudTabFocused: false });
      }
    });
  };

  getTabLabel = (tab: Element) => {
    return tab.textContent?.trim();
  };
}

import BaseComponent from "./BaseComponent";

const rootSelector = '[data-js-tabs]';

class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.state = {
            activeTabIndex: [...this.buttonElements]
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        };
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }

    updateUI() {
        const { activeTabIndex } = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1');
        });


        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;
            contentElement.classList.toggle(this.stateClasses.isActive, isActive);
        });
    }

    previousTab = () => {
        
    }

    nextTab = () => {

    }

    firstTab = () => {

    }
    
    endTab = () => {

    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
    }

    onKeyDown = (event) => {
        const { code, metaKey } = event

        const acion = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.endTab,
        }[code]

        const isMacHomeKey = metaKey && code === 'ArrowLeft'
        if (isMacHomeKey) {
            this.firstTab()
            return
        }

        const isMacEndKey = metaKey && code === 'ArrowRight'
        if (isMacHomeKey) {
            this.lastTab()
            return
        }

        acion?.()
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index));
        });
        this.rootElement.addEventListener('keydown', this.onKeyDown)
    }
};

class TabsCollection {
    constructor() {
        this.init();
    };

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        });
    };
};

export default TabsCollection;
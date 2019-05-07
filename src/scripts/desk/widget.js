import {
    TweenLite,
} from 'gsap/TweenLite';
import {
    Sine,
} from 'gsap';

const WIDGET_HEIGHT_RATIO = 0.52;
const EXPANDED_SCALE = 1.4;
const MINIMIZED_SCALE = 0.8;
export const COLLAPSED_STATE = 'collapsed';
export const MINIMIZED_STATE = 'minimized';
export const EXPANDED_STATE = 'expanded';


export const POSITION_TOP_RIGHT = 'top-right';
export const POSITION_TOP_LEFT = 'top-left';
export const POSITION_BOTTOM_RIGHT = 'bottom-right';
export const POSITION_BOTTOM_LEFT = 'bottom-left';

const getWidgetWidth = (widthFactor) => window.innerWidth * widthFactor;
const getWidgetHeight = (widthFactor) => getWidgetWidth(widthFactor) * WIDGET_HEIGHT_RATIO;

export class Widget {
    constructor(node, config) {
        const {position, widthFactor} = config;
        this.state = COLLAPSED_STATE;
        this.position = position;
        this.widthFactor = widthFactor;
        this.node = node;
        this.node.attr('class', `widget widget-${position}`);
    }

    getExpandedTranslateX() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_TOP_LEFT:
                return `${window.innerWidth*0.66 - getWidgetWidth(this.widthFactor)*0.5}px`;
            case POSITION_BOTTOM_RIGHT:
            case POSITION_TOP_RIGHT:
                return `-${window.innerWidth*0.33 - getWidgetWidth(this.widthFactor)*0.5}px`;
        }
    }

    getExpandedTranslateY() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_BOTTOM_RIGHT:
                return `-${window.innerHeight*0.7 - getWidgetHeight(this.widthFactor)*0.5}px`;
            case POSITION_TOP_LEFT:
            case POSITION_TOP_RIGHT:
                return `${window.innerHeight*0.3 - getWidgetHeight(this.widthFactor)*0.5}px`;
        }
    }

    getMinimizedTranslateX() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_TOP_LEFT:
                return `${window.innerWidth*0.66 - getWidgetWidth(this.widthFactor)*0.5}px`;
            case POSITION_BOTTOM_RIGHT:
            case POSITION_TOP_RIGHT:
                return `-${window.innerWidth*0.33 - getWidgetWidth(this.widthFactor)*0.5}px`;
        }
    }

    getMinimizedTranslateY() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_BOTTOM_RIGHT:
                return `0px`; // `${window.innerHeight*0.7 - getWidgetHeight(this.widthFactor)*0.5}px`;
            case POSITION_TOP_LEFT:
            case POSITION_TOP_RIGHT:
                return `0px`; // `${window.innerHeight*0.3 - getWidgetHeight(this.widthFactor)*0.5}px`;
        }
    }

    isCollapsed() {
        return this.state === COLLAPSED_STATE;
    }

    collapse() {
        this.changeState(COLLAPSED_STATE);
    }

    expand() {
        this.changeState(EXPANDED_STATE);
    }

    isCollapsed() {
        return this.state === COLLAPSED_STATE;
    }

    isMinimized() {
        return this.state === MINIMIZED_STATE;
    }

    minimize() {
        this.changeState(MINIMIZED_STATE);
    }

    changeState(state) {
        if (state === this.state) return Promise.resolve();
        return new Promise((resolve, reject) => {
            this.state = state;
            switch (state) {
                case EXPANDED_STATE:
                    return TweenLite.to(this.node.node(), 1.3, 
                    {
                        transform: `translate(${this.getExpandedTranslateX()},${this.getExpandedTranslateY()}) scale(${EXPANDED_SCALE})`,
                        onComplete: resolve,
                        ease: Sine.easeOut,
                    });
                case MINIMIZED_STATE:
                    return TweenLite.to(this.node.node(), 1.3, 
                    {
                        transform: `translate(${this.getMinimizedTranslateX()},${this.getMinimizedTranslateY()}) scale(${MINIMIZED_SCALE})`,
                        onComplete: resolve,
                        ease: Sine.easeOut,
                    });
                case COLLAPSED_STATE:
                    return TweenLite.to(this.node.node(), 1.3, {transform: `translate(0px,0px)`, onComplete: resolve, ease: Sine.easeOut});
            }
        })
    }

    getWidgetWidth() {
        return getWidgetWidth(this.widthFactor);
    }

    getWidgetHeight() {
        return getWidgetHeight(this.widthFactor);
    }
}
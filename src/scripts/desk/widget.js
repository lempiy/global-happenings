import {
    TweenLite,
} from 'gsap/TweenLite';
import {
    Sine,
} from 'gsap';

const WIDGET_SCREEN_FACTOR = 0.375;
const WIDGET_HEIGHT_RATIO = 0.52;
const EXPANDED_SCALE = 1.3;
export const COLLAPSED_STATE = 'collapsed';
const TRANSITION_STATE = 'transition';
export const EXPANDED_STATE = 'expanded';


export const POSITION_TOP_RIGHT = 'top-right';
export const POSITION_TOP_LEFT = 'top-left';
export const POSITION_BOTTOM_RIGHT = 'bottom-right';
export const POSITION_BOTTOM_LEFT = 'bottom-left';

const getWidgetWidth = () => window.innerWidth * WIDGET_SCREEN_FACTOR;
const getWidgetHeight = () => getWidgetWidth() * WIDGET_HEIGHT_RATIO;

export class Widget {
    constructor(node, position) {
        this.state = COLLAPSED_STATE;
        this.position = position;
        this.node = node;
        this.node.attr('class', `widget widget-${position}`);
    }

    getTranslateX() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_TOP_LEFT:
                return this.state === COLLAPSED_STATE ? '0px' : `${window.innerWidth*0.5 - getWidgetWidth()*0.5}px`;
            case POSITION_BOTTOM_RIGHT:
            case POSITION_TOP_RIGHT:
                return this.state === COLLAPSED_STATE ? '0px' : `-${window.innerWidth*0.5 - getWidgetWidth()*0.5}px`;
        }
    }

    getTranslateY() {
        switch (this.position) {
            case POSITION_BOTTOM_LEFT:
            case POSITION_BOTTOM_RIGHT:
                return this.state === COLLAPSED_STATE ? '0px' : `-${window.innerHeight*0.5 - getWidgetHeight()*0.5}px`;
            case POSITION_TOP_LEFT:
            case POSITION_TOP_RIGHT:
                return this.state === COLLAPSED_STATE ? '0px' : `${window.innerHeight*0.5 - getWidgetHeight()*0.5}px`;
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

    changeState(state) {
        if (state === this.state) return Promise.resolve();
        return new Promise((resolve, reject) => {
            this.state = state;
            switch (state) {
                case EXPANDED_STATE:
                    return TweenLite.to(this.node.node(), 1, 
                    {
                        transform: `translate(${this.getTranslateX()},${this.getTranslateY()}) scale(${EXPANDED_SCALE})`,
                        onComplete: resolve,
                        ease: Sine.easeOut,
                    });
                case COLLAPSED_STATE:
                    return TweenLite.to(this.node.node(), 1, {transform: `translate(0px,0px)`, onComplete: resolve, ease: Sine.easeOut});
            }
        })
    }

    getWidgetWidth() {
        return getWidgetWidth();
    }

    getWidgetHeight() {
        return getWidgetHeight();
    }
}
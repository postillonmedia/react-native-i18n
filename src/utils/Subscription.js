/**
 * Created by DanielL on 15.06.2017.
 */

const CLEARED = null;

export class Subscription {

    constructor() {
        this.current = [];
        this.next = [];
    }

    notify() {
        const listeners = this.current = this.next;
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].apply(this, arguments);
        }
    }

    subscribe(listener) {
        let isSubscribed = true;
        if (this.next === this.current) this.next = this.current.slice();
        this.next.push(listener);

        return function unsubscribe() {
            if (!isSubscribed || this.current === CLEARED) return;
            isSubscribed = false;

            if (this.next === this.current) this.next = this.current.slice();
            this.next.splice(this.next.indexOf(listener), 1);
        };
    }

    clear() {
        this.next = CLEARED;
        this.current = CLEARED;
    }

}

export default Subscription;
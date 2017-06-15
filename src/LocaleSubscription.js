/**
 * Created by DanielL on 15.06.2017.
 */

import Subscription from './utils/Subscription';

export class LocaleSubscription extends Subscription {

    constructor(locale, getStringFromDictionary) {
        super();

        this.locale = locale;
        this.getStringFromDictionary = getStringFromDictionary;
    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale) {
        this.locale = locale;

        this.notify({
            locale,
        });
    }

    getStringFromDictionary() {
        return this.getStringFromDictionary;
    }

    setStringFromDictionary(getStringFromDictionary) {
        this.getStringFromDictionary = getStringFromDictionary;

        this.notify({
            getStringFromDictionary,
        });
    }

}

export default LocaleSubscription;
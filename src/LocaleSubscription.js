/**
 * Created by DanielL on 15.06.2017.
 */

import Subscription from './utils/Subscription';

export class LocaleSubscription extends Subscription {

    constructor(locale, dictionary) {
        super();

        this.locale = locale;
        this.dictionary = dictionary;
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

    getDictionary() {
        return this.dictionary;
    }

    setDictionary(dictionary) {
        this.dictionary = dictionary;

        this.notify({
            dictionary,
        });
    }

}

export default LocaleSubscription;
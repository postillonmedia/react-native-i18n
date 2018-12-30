/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';

import LocaleContext from './Context';

export default class LocaleProvider extends PureComponent {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]),
        locale: PropTypes.string.isRequired,
        dictionary: PropTypes.object.isRequired,
    };

    static defaultProps = {
        locale: undefined,
        dictionary: {},
    };

    constructor(props, context) {
        super(props, context);

        const { locale, dictionary } = props;

        this.subscription = new LocaleSubscription(locale, dictionary);
    }

    render() {
        const { children, context: Context = LocaleContext, locale, dictionary } = this.props;

        return (
            <Context.Provider value={{locale, dictionary}}>
                {children}
            </Context.Provider>
        );
    }

}
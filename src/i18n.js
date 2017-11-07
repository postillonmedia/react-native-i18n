/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getString } from './helpers';

const defaultOptions = {
    localePropsName: 'locale',
    translatePropsName: 't',
    callback: undefined,
};

export const i18n = (screenKey, customOptions = {}) => component => {

    const options = Object.assign({}, defaultOptions, customOptions);

    const getComponentDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || componentName;
    };

    const LocalizeComponent = WrappedComponent => class extends Component {
        constructor(props, context) {
            super(props, context);

            const { locale } = context;
            const { callback } = options;

            this.state = {
                locale: locale.getLocale(),
                dictionary: locale.getDictionary(),
            };

            this.unsubscribe = locale.subscribe((state) => {
                this.setState(state);

                if (typeof callback === 'function') {
                    const locale = state.locale || this.state.locale;
                    const dictionary = state.dictionary || this.state.dictionary;
                    const t = getString(dictionary)(locale)(screenKey);

                    callback(locale, t);
                }
            });
        }

        static displayName = `Localized(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Localized(${getComponentDisplayName(WrappedComponent)})`;

        static contextTypes = {
            locale: PropTypes.object,
        };

        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }

        render() {
            const { locale, dictionary } = this.state;

            const props = {
                ...this.props,
                [options.localePropsName]: locale,
                [options.translatePropsName]: getString(dictionary)(locale)(screenKey),
            };

            return <WrappedComponent {...props} />;
        }
    };

    return LocalizeComponent(component);
};

export default i18n;
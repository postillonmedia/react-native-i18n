/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Component, PropTypes } from 'react';

export const i18n = screenKey => component => {
    const getComponentDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || componentName;
    };

    const LocalizeComponent = WrappedComponent => class extends Component {
        constructor() {
            super();

            if (!WrappedComponent.contextTypes) {
                WrappedComponent.contextTypes = {};
            }
            WrappedComponent.contextTypes.locale = PropTypes.string;
            WrappedComponent.contextTypes.dictionary = PropTypes.object;
        }

        static displayName = `Localized(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Localized(${getComponentDisplayName(WrappedComponent)})`;

        static contextTypes = {
            locale: PropTypes.string,
            getStringFromDictionary: PropTypes.func,
        };

        render() {
            const { locale, getStringFromDictionary } = this.context;

            const props = {
                ...this.props,
                locale: locale,
                t: getStringFromDictionary(locale)(screenKey),
            };

            return <WrappedComponent {...props} />;
        }
    };

    return LocalizeComponent(component);
};

export default i18n;
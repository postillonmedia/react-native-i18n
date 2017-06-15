/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Component, PropTypes } from 'react';

export const i18n = screenKey => component => {
    const getComponentDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || componentName;
    };

    const LocalizeComponent = WrappedComponent => class extends Component {
        constructor(props, context) {
            super(props, context);

            const { locale } = context;

            this.state = {
                locale: locale.getLocale(),
                getStringFromDictionary: locale.getStringFromDictionary(),
            };

            this.unsubscribe = locale.subscribe((state) => {
                this.setState(state);
            });
        }

        static displayName = `Localized(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Localized(${getComponentDisplayName(WrappedComponent)})`;

        static contextTypes = {
            locale: PropTypes.object,
        };

        render() {
            const { locale, getStringFromDictionary } = this.state;

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
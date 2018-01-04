/**
 * Created by DanielL on 12.06.2017.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

import { getString } from './helpers';


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
                dictionary: locale.getDictionary(),
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

        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }

        render() {
            const { locale, dictionary } = this.state;

            const props = {
                ...this.props,
                locale,
                t: getString(dictionary)(locale)(screenKey),
            };

            return <WrappedComponent {...props} />;
        }
    };

    return hoistStatics(LocalizeComponent(component), component);
};

export default i18n;
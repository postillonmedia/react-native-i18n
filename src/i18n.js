/**
 * Created by DanielL on 12.06.2017.
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

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

    const LocalizeComponent = WrappedComponent => class extends PureComponent {
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

                if (callback && typeof callback === 'function' && this.state.locale) {
                    const locale = state.locale || this.state.locale;
                    const dictionary = state.dictionary || this.state.dictionary;
                    const t = getString(dictionary)(locale)(screenKey);

                    callback(locale, t, this.props);
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

    return hoistStatics(LocalizeComponent(component), component);
};

export default i18n;
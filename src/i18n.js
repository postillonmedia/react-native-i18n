/**
 * Created by DanielL on 12.06.2017.
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

import LocaleContext from './Context';

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

        static displayName = `Localized(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Localized(${getComponentDisplayName(WrappedComponent)})`;

        static contextType = LocaleContext;

        mounted = null;

        constructor(props, context) {
            super(props, context);

            // const { locale } = context;
            // const { callback } = options;
            //
            // this.state = {
            //     locale: locale.getLocale(),
            //     dictionary: locale.getDictionary(),
            // };
            //
            // this.unsubscribe = locale.subscribe((state) => {
            //     const prevLocale = this.state.locale;
            //     const nextLocale = state.locale;
            //
            //     if (this.mounted) {
            //         this.setState(state);
            //
            //         try {
            //             if (callback && typeof callback === 'function' && prevLocale !== nextLocale) {
            //                 const locale = state.locale || this.state.locale;
            //                 const dictionary = state.dictionary || this.state.dictionary;
            //                 const t = getString(dictionary)(locale)(screenKey);
            //
            //                 callback(locale, t, this.props);
            //             }
            //         } catch (e) {
            //             console.error(e)
            //         }
            //     }
            // });
        }

        render() {
            const { callback } = options;
            const { locale, dictionary } = this.context;

            const translate = getString(dictionary)(locale)(screenKey);

            const props = {
                ...this.props,
                [options.localePropsName]: locale,
                [options.translatePropsName]: translate,
            };

            if (callback && typeof callback === 'function') {
                callback(locale, translate, this.props);
            }

            return <WrappedComponent {...props} />;
        }
    };

    return hoistStatics(LocalizeComponent(component), component);
};

export default i18n;
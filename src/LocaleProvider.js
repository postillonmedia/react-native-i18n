/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

import LocaleSubscription from './LocaleSubscription';

export default class LocaleProvider extends Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        locale: PropTypes.string.isRequired,
        dictionary: PropTypes.object.isRequired,
    };

    static defaultProps = {
        locale: undefined,
        dictionary: {},
    };

    static childContextTypes = {
        locale: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        const { locale, dictionary } = props;

        this.subscription = new LocaleSubscription(locale, dictionary);
    }

    getChildContext() {
        return {
            locale: this.subscription,
        };
    }

    componentWillReceiveProps(nextProps) {
        // check if locale has been changed
        if (nextProps.locale !== this.props.locale) {
            this.subscription.setLocale(nextProps.locale);
        }

        // check if dictionary has been changed
        if (nextProps.dictionary !== this.props.dictionary) {
            this.subscription.setDictionary(nextProps.dictionary);
        }
    }

    render() {
        const { children } = this.props;

        return Children.only(children);
    }

}
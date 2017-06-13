/**
 * Created by DanielL on 12.06.2017.
 */

import React, { Children, PropTypes } from 'react';

import { getString } from './helpers';

export default class LocaleProvider extends React.Component {

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
        locale: PropTypes.string,
        getString: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            locale: props.locale,
            getString: getString(props.dictionary),
        };
    }

    getChildContext() {
        return {
            locale: this.state.locale,
            getString: this.state.getString,
        };
    }

    componentWillReceiveProps(nextProps) {
        // check if locale has been changed
        if (nextProps.locale !== this.props.locale) {
            this.setState({
                locale: nextProps.locale,
            });
        }

        // check if dictionary has been changed
        if (nextProps.dictionary !== this.props.dictionary) {
            this.setState({
                getString: getString(nextProps.dictionary),
            });
        }
    }

    render() {
        const { children } = this.props;

        return Children.only(children);
    }

}
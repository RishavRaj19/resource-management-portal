import React from 'react';
import ProgressView from './ProgressView';
import ErrorView from './ErrorView';

export class Fetcher extends React.Component {

    state = {
        loading: true,
    };

    fetchData = () => {
        const {fetchData, onFetch, onFetchError} = this.props;
        if (fetchData) {
            this.setState({loading: true, error: undefined});
            fetchData().then(r => {
                this.setState({loading: false});
                if (onFetch) {
                    onFetch(r);
                }
            }).catch(e => {
                this.setState({loading: false, error: e});
                if (onFetchError) {
                    onFetchError(e);
                }
            })
        } else {
            this.setState({loading: false, error: undefined});
        }
    };

    reload () {
        this.fetchData();
    }

    componentDidMount () {
        if(this.props.interval && this.props.interval > 0) {
            this.fetchData();
            let intervalId = setInterval(this.fetchData, this.props.interval * 1000)
            this.setState({intervalId: intervalId});
        } else {
            this.fetchData();
        }
    }

    componentWillUnmount () {
        clearInterval(this.state.intervalId)
    }

    render () {
        const {loading, error} = this.state;
        if (loading) {
            return <ProgressView />;
        } else if (error) {
            return <ErrorView error={error} onRetry={this.fetchData} />;
        } else {
            return this.props.children;
        }
    };

}
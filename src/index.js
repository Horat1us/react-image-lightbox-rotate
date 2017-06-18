/**
 * Created by horat1us on 6/17/17.
 */
import React, {Component} from 'react';
import ReactImageLightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

import styles from './styles.scss';

/**
 * Class ReactImageLightboxRotate
 */
class ReactImageLightboxRotate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rotate: 0,
        };
    }


    changeRotation(angle) {
        let nextAngle = this.state.rotate + angle;
        if (nextAngle < 0) {
            nextAngle = 270;
        }
        this.setState({rotate: nextAngle});
        this.props.onImageRotate(nextAngle);
    }

    get rotateClassName() {
        switch (this.state.rotate) {
            case 270:
                return styles.rotate270;
            case 180:
                return styles.rotate180;
            case 90:
                return styles.rotate90;
            default:
                return '';
        }
    }

    get svg() {
        return <svg className="icon icon-rotate" xmlns="http://www.w3.org/2000/svg" width="512"
                    height="512"
                    viewBox="0 0 16 16">
            <path fill="#ddd"
                  d="M16 7V3l-1.1 1.1C13.6 1.6 11 0 8 0 3.6 0 0 3.6 0 8s3.6 8 8 8c2.4 0 4.6-1.1 6-2.8l-1.5-1.3C11.4 13.2 9.8 14 8 14c-3.3 0-6-2.7-6-6s2.7-6 6-6c2.4 0 4.5 1.5 5.5 3.5L12 7h4z"/>
        </svg>;
    }

    render() {
        const noop = () => {
        };

        const rotateRightButtonClasses = [
            ReactImageLightbox.toolbarItemChild,
            ReactImageLightbox.builtinButton,
            styles.rotateRightButton,
        ];
        const rotateLeftButtonClasses = [
            ReactImageLightbox.toolbarItemChild,
            ReactImageLightbox.builtinButton,
            styles.rotateLeftButton,
        ];

        let rotateLeftButtonHandler = () => this.changeRotation(-90);
        let rotateRightButtonHandler = () => this.changeRotation(90);

        if (this.lightBox && this.lightBox.isAnimating()) {
            rotateLeftButtonHandler = noop;
            rotateRightButtonHandler = noop;
        }

        const props = Object.assign({}, this.props, {
            toolbarButtons: [
                <button
                    type="button"
                    key="rotate-left"
                    className={`ril-rotate-left ${rotateLeftButtonClasses.join(' ')}`}
                    onClick={rotateLeftButtonHandler}
                >
                    {this.svg}
                </button>,
                <button
                    type="button"
                    key="rotate-right"
                    className={`ril-rotate-right ${rotateRightButtonClasses.join(' ')}`}
                    onClick={rotateRightButtonHandler}
                >
                    {this.svg}
                </button>,
            ],
            ref: (lightBox) => this.lightBox = lightBox,
            wrapperClassName: this.rotateClassName,
        });

        return <ReactImageLightbox {...props} />
    }
}

ReactImageLightboxRotate.defaultProps = Object.assign({}, ReactImageLightbox.defaultProps, {
    onImageRotate: () => {
    },
});

ReactImageLightboxRotate.propTypes = Object.assign({}, ReactImageLightbox.propTypes, {
    onImageRotate: PropTypes.func,
});

export default ReactImageLightboxRotate;
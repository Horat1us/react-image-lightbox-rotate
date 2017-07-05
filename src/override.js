import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactImageLightbox from 'react-image-lightbox';

let angle;

export const changeAngle = (newAngle) => {
    angle = newAngle;
};

const parentTransform = ReactImageLightbox.getTransform;
ReactImageLightbox.getTransform = (args) => {
    const
        parent = parentTransform(args);

    if (angle && angle !== 0) {
        parent[Object.keys(parent)[0]] += `rotate(${angle}deg)`;
    }

    return parent;
};


Object.assign(ReactImageLightbox.propTypes, {
    angle: PropTypes.number,
});

export default ReactImageLightbox;
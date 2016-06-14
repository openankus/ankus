/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * FTP Put Shape
 *
 * @class
 * @extends OG.shape.ImageShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Flamingo.view.designer.shape.INOUT_FTP_PUT = function (image, label) {
    Flamingo.INOUT_FTP_PUT.superclass.call(this, image, label);
    this.SHAPE_ID = 'Flamingo.view.designer.shape.INOUT_FTP_PUT';
};
Flamingo.view.designer.shape.INOUT_FTP_PUT.prototype = new OG.shape.ImageShape();
Flamingo.view.designer.shape.INOUT_FTP_PUT.superclass = OG.shape.ImageShape;
Flamingo.view.designer.shape.INOUT_FTP_PUT.prototype.constructor = Flamingo.view.designer.shape.INOUT_FTP_PUT;
Flamingo.INOUT_FTP_PUT = Flamingo.view.designer.shape.INOUT_FTP_PUT;

/**
 * Shape 간의 연결을 위한 Terminal 을 반환한다.
 *
 * @return {OG.Terminal[]} Terminal
 * @override
 */
Flamingo.view.designer.shape.INOUT_FTP_PUT.prototype.createTerminal = function () {
    if (!this.geom) {
        return [];
    }

    var envelope = this.geom.getBoundary();

    return [
        new OG.Terminal(envelope.getCentroid(), OG.Constants.TERMINAL_TYPE.C, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getRightCenter(), OG.Constants.TERMINAL_TYPE.E, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getLeftCenter(), OG.Constants.TERMINAL_TYPE.W, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getLowerCenter(), OG.Constants.TERMINAL_TYPE.S, OG.Constants.TERMINAL_TYPE.IN),
        new OG.Terminal(envelope.getUpperCenter(), OG.Constants.TERMINAL_TYPE.N, OG.Constants.TERMINAL_TYPE.IN)
    ];
};
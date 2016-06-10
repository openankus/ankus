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
 * Clean ETL Shape
 *
 * @class
 * @extends OG.shape.ImageShape
 * @requires OG.common.*, OG.geometry.*
 *
 * @param {String} image 이미지 URL
 * @param {String} label 라벨
 * @author <a href="mailto:hrkenshin@gmail.com">Seungbaek Lee</a>
 */
Flamingo.view.designer.shape.etl.ETL_CLEAN = function (image, label) {
    Flamingo.ETL_CLEAN.superclass.call(this, image, label);
    this.SHAPE_ID = 'Flamingo.view.designer.shape.etl.ETL_CLEAN';
};
Flamingo.view.designer.shape.etl.ETL_CLEAN.prototype = new OG.shape.ImageShape();
Flamingo.view.designer.shape.etl.ETL_CLEAN.superclass = OG.shape.ImageShape;
Flamingo.view.designer.shape.etl.ETL_CLEAN.prototype.constructor = Flamingo.view.designer.shape.etl.ETL_CLEAN;
Flamingo.ETL_CLEAN = Flamingo.view.designer.shape.etl.ETL_CLEAN;
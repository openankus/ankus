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

Ext.ns('Flamingo.view.designer.shape.giraph');
Flamingo.view.designer.shape.giraph.ALG_GIRAPH = function (image, label) {
    Flamingo.ALG_GIRAPH.superclass.call(this, image, label);
    this.SHAPE_ID = 'Flamingo.view.designer.shape.giraph.ALG_GIRAPH';
};
Flamingo.view.designer.shape.giraph.ALG_GIRAPH.prototype = new OG.shape.ImageShape();
Flamingo.view.designer.shape.giraph.ALG_GIRAPH.superclass = OG.shape.ImageShape;
Flamingo.view.designer.shape.giraph.ALG_GIRAPH.prototype.constructor = Flamingo.view.designer.shape.giraph.ALG_GIRAPH;
Flamingo.ALG_GIRAPH = Flamingo.view.designer.shape.giraph.ALG_GIRAPH;